"use client";

import React, { useState, useMemo } from 'react';
import { calculateTax } from '../lib/taxEngine';
import { projectYearEnd, DataPoint } from '../lib/projectionML';
import {
    TrendingUp,
    DollarSign,
    Percent,
    ArrowUpRight,
    Plus,
    Upload,
    Calculator,
    Zap,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { ViewType } from './Sidebar';
import AuthOverlay from './AuthOverlay';
import AuditRisk from './AuditRisk';
import AnalyticsView from './AnalyticsView';
import TransactionsView from './TransactionsView';
import TaxStrategyView from './TaxStrategyView';
import SettingsView from './SettingsView';

export default function Dashboard() {
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [whatIfAddition, setWhatIfAddition] = useState<number>(0);
    const [isScanning, setIsScanning] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>('Dashboard');
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [newIncomeAmount, setNewIncomeAmount] = useState('');

    const [yearToDateData, setYearToDateData] = useState<DataPoint[]>([
        { month: 1, amount: 5000 },
        { month: 2, amount: 5500 },
    ]);

    const handleScanReceipt = () => {
        setIsScanning(true);
        // Simulate a delay for OCR processing
        setTimeout(() => {
            setExpenses(prev => prev + 450); // Mock added expense
            setIsScanning(false);
            alert("Receipt scanned! Added $450 to deductions.");
        }, 2000);
    };

    const handleAddIncomeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newIncomeAmount && !isNaN(Number(newIncomeAmount))) {
            setIncome(prev => prev + Number(newIncomeAmount));
            setNewIncomeAmount('');
            setShowIncomeModal(false);
        }
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setActiveView('Dashboard');
    };

    const taxResult = useMemo(() => calculateTax(income, expenses + whatIfAddition), [income, expenses, whatIfAddition]);
    const projectedIncome = useMemo(() => projectYearEnd(yearToDateData), [yearToDateData]);
    const projectedTax = useMemo(() => calculateTax(projectedIncome, expenses), [projectedIncome, expenses]);

    const renderContent = () => {
        switch (activeView) {
            case 'Dashboard':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 md:col-span-2 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
                                    <TrendingUp className="text-emerald-400 w-5 h-5" /> Tax Overview
                                </h2>
                                <span className="text-xs font-medium bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                                    Live Projection
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Estimated Tax Owed</p>
                                    <h3 className="text-5xl font-bold mt-2 text-white tabular-nums">
                                        ${taxResult.totalTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-4 text-emerald-400 text-sm">
                                        <ArrowUpRight className="w-4 h-4" />
                                        <span>2.4% from last month</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                                        <span className="text-slate-400">Effective Rate</span>
                                        <span className="text-white font-bold text-xl">{(taxResult.effectiveRate * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                                        <span className="text-slate-400">Marginal Rate</span>
                                        <span className="text-white font-bold text-xl">{(taxResult.marginalRate * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Audit Risk / Smart Insight Column */}
                        <div className="space-y-6">
                            {/* Projection Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-card p-6 bg-gradient-to-br from-slate-800/80 to-emerald-950/20"
                            >
                                <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                                    <Zap className="text-amber-400 w-5 h-5" /> Smart Insight
                                </h2>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Based on current trends, your year-end tax liability is projected to be:
                                </p>
                                <div className="mt-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                    <p className="text-3xl font-bold text-white mt-1">${projectedTax.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <AuditRisk income={income} deductions={expenses + whatIfAddition} />
                            </motion.div>
                        </div>

                        {/* What-If Simulator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 md:col-span-1"
                        >
                            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-6">
                                <Calculator className="text-indigo-400 w-5 h-5" /> "What-If" Simulator
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm text-slate-400">New Business Expense</label>
                                        <span className="text-emerald-400 font-medium">${whatIfAddition}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="500"
                                        value={whatIfAddition}
                                        onChange={(e) => setWhatIfAddition(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                                <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                                    <p className="text-xs text-indigo-300 mb-1">Tax Savings Potential</p>
                                    <p className="text-2xl font-bold text-white">
                                        ${(taxResult.marginalRate * whatIfAddition).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Inputs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6 md:col-span-2"
                        >
                            <h2 className="text-lg font-semibold text-slate-200 mb-6">Quick Adjustments</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">Annual Gross Income</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="number"
                                            value={income || ''}
                                            onChange={(e) => setIncome(Number(e.target.value))}
                                            placeholder="e.g. 120000"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">Total Deductions</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="number"
                                            value={expenses || ''}
                                            onChange={(e) => setExpenses(Number(e.target.value))}
                                            placeholder="e.g. 15000"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
            case 'Analytics':
                return <AnalyticsView />;
            case 'Transactions':
                return <TransactionsView />;
            case 'Tax Strategy':
                return <TaxStrategyView />;
            case 'Settings':
                return <SettingsView />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">
            <AnimatePresence>
                {!isAuthenticated && (
                    <AuthOverlay onAuthenticated={() => setIsAuthenticated(true)} />
                )}
                {showIncomeModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowIncomeModal(false)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-2">Record Income</h2>
                            <p className="text-slate-400 mb-6 font-medium">Add a new income source to your records.</p>
                            <form onSubmit={handleAddIncomeSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Amount ($)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="number"
                                            autoFocus
                                            value={newIncomeAmount}
                                            onChange={(e) => setNewIncomeAmount(e.target.value)}
                                            placeholder="5,000.00"
                                            className="w-full bg-slate-950 border border-slate-700 text-white text-xl font-bold rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 text-lg font-bold">
                                    Confirm Addition
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Sidebar activeView={activeView} onViewChange={setActiveView} onSignOut={handleSignOut} />

            <main className="flex-1 ml-64 p-6 md:p-10 transition-all duration-300">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white tracking-tight">
                                {activeView} <span className="text-emerald-400">Advisor</span>
                            </h1>
                            <p className="text-slate-400 mt-2 text-lg">Real-time projections for your 2026 fiscal year.</p>
                        </div>
                        {activeView === 'Dashboard' && (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleScanReceipt}
                                    disabled={isScanning}
                                    className={`btn-primary flex items-center gap-2 ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <Upload className={`w-4 h-4 ${isScanning ? 'animate-bounce' : ''}`} />
                                    {isScanning ? 'Scanning...' : 'Scan Receipt'}
                                </button>
                                <button
                                    onClick={() => setShowIncomeModal(true)}
                                    className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Income
                                </button>
                            </div>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
