"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { name: 'Jan', income: 4000, tax: 400 },
    { name: 'Feb', income: 3000, tax: 300 },
    { name: 'Mar', income: 2000, tax: 200 },
    { name: 'Apr', income: 2780, tax: 280 },
    { name: 'May', income: 1890, tax: 190 },
    { name: 'Jun', income: 2390, tax: 240 },
];

export default function AnalyticsView() {
    return (
        <div className="space-y-8 h-full">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">Financial Analytics</h2>
                <p className="text-slate-400">Monthly breakdown of your performance and tax liabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 flex flex-col"
                >
                    <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">Income vs Tax (Monthly)</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="tax" fill="#1e293b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 flex flex-col"
                >
                    <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">Liability Progression</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="tax" stroke="#10b981" fillOpacity={1} fill="url(#colorTax)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">$16,060</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Average Monthly Tax</p>
                    <p className="text-2xl font-bold text-white">$268</p>
                </div>
                <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                    <p className="text-emerald-500 text-xs uppercase font-bold tracking-widest mb-1">Growth Forecast</p>
                    <p className="text-2xl font-bold text-white">+12.5%</p>
                </div>
            </div>
        </div>
    );
}
