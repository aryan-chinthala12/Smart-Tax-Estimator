"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const transactions = [
    { id: 1, name: 'AWS Cloud Services', category: 'Software', amount: -120.50, type: 'expense', date: 'Mar 02, 2026' },
    { id: 2, name: 'Stripe Payout', category: 'Income', amount: 4500.00, type: 'income', date: 'Mar 01, 2026' },
    { id: 3, name: 'Adobe Creative Cloud', category: 'Software', amount: -54.99, type: 'expense', date: 'Feb 28, 2026' },
    { id: 4, name: 'HubSpot Subscription', category: 'Marketing', amount: -650.00, type: 'expense', date: 'Feb 25, 2026' },
    { id: 5, name: 'Office Rent - WeWork', category: 'Office', amount: -450.00, type: 'expense', date: 'Feb 20, 2026' },
];

export default function TransactionsView() {
    const [search, setSearch] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Transactions</h2>
                    <p className="text-slate-400">Manage and categorize your business finances.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>
                    <button className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-slate-400 hover:text-white">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-800/50 bg-slate-800/10">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Description</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-widest text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {transactions.map((tx, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={tx.id}
                                    className="hover:bg-slate-800/20 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                                {tx.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                            <span className="text-white font-medium">{tx.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-full">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">{tx.date}</td>
                                    <td className={`px-6 py-4 text-right font-bold tabular-nums ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                                        {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-600 hover:text-slate-400">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
