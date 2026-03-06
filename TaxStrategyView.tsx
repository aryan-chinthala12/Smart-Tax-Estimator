"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, TrendingDown, Check } from 'lucide-react';

const strategies = [
    {
        title: 'Home Office Deduction',
        savings: '$1,200',
        risk: 'Low',
        desc: 'Based on your recurring work-from-home expenses, you may be eligible for a simplified square-foot deduction.',
        ready: true
    },
    {
        title: 'Qualified Business Income (QBI)',
        savings: '$2,450',
        risk: 'Low',
        desc: 'As a freelancer, you might qualify for up to 20% deduction on your qualified business income.',
        ready: true
    },
    {
        title: 'Section 179 Equipment Expensing',
        savings: '$800',
        risk: 'Medium',
        desc: 'Consider fully expensing your new tech hardware purchases this year instead of depreciating them.',
        ready: false
    },
];

export default function TaxStrategyView() {
    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="text-emerald-400 w-8 h-8" /> Tax Optimizer
                </h2>
                <p className="text-slate-400">AI-powered strategies to minimize your tax liability legally.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {strategies.map((s, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={s.title}
                        className="glass-card p-6 flex items-start gap-6 hover:border-emerald-500/30 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Lightbulb className="text-emerald-400 w-6 h-6" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.ready ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                                    {s.ready ? 'Ready to Apply' : 'Data Required'}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-2">
                                    <TrendingDown className="text-emerald-500 w-4 h-4" />
                                    <span className="text-xs font-semibold text-emerald-400">Est. Savings: {s.savings}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Audit Risk:</span>
                                    <span className={`text-xs font-semibold ${s.risk === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`}>{s.risk}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all text-transparent group-hover:text-white">
                            <Check className="w-4 h-4" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-8 bg-indigo-600/10 rounded-3xl border border-indigo-500/20 text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Need a Professional Review?</h3>
                <p className="text-slate-400 max-w-lg mx-auto">Connect with a certified CPA who specializes in freelance tax code to verify these optimizations.</p>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition-all">
                    Schedule Expert Call
                </button>
            </div>
        </div>
    );
}
