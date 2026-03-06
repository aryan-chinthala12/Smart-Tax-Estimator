"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AuditRiskProps {
    income: number;
    deductions: number;
}

export default function AuditRisk({ income, deductions }: AuditRiskProps) {
    const ratio = income > 0 ? (deductions / income) * 100 : 0;

    let risk: 'low' | 'medium' | 'high' = 'low';
    let color = 'text-emerald-400';
    let bgColor = 'bg-emerald-500';
    let label = 'Healthy Threshold';
    let description = 'Your deduction to income ratio is well within IRS average ranges.';
    let Icon = CheckCircle2;

    if (ratio > 30) {
        risk = 'high';
        color = 'text-rose-400';
        bgColor = 'bg-rose-500';
        label = 'Elevated Audit Risk';
        description = 'High deduction ratios can sometimes trigger IRS red flags. Ensure all receipts are saved.';
        Icon = ShieldAlert;
    } else if (ratio > 15) {
        risk = 'medium';
        color = 'text-amber-400';
        bgColor = 'bg-amber-500';
        label = 'Standard Monitoring';
        description = 'Typical for freelancers. Keep maintaining detailed documentation.';
        Icon = AlertTriangle;
    }

    return (
        <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Audit Probability</h3>
                <Icon className={color + " w-5 h-5"} />
            </div>

            <div className="relative pt-2">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${bgColor}/10 ${color}`}>
                            {label}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-slate-300">
                            {ratio.toFixed(1)}% Ratio
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-800">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (ratio / 40) * 100)}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${bgColor}`}
                    />
                </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed italic">
                {description}
            </p>
        </div>
    );
}
