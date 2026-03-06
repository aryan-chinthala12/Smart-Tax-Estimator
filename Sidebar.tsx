"use client";

import React from 'react';
import {
    Home,
    BarChart3,
    Receipt,
    ShieldCheck,
    Settings,
    LogOut,
    User
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type ViewType = 'Dashboard' | 'Analytics' | 'Transactions' | 'Tax Strategy' | 'Settings';

interface SidebarProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
    onSignOut: () => void;
}

const navItems: { icon: any, label: ViewType }[] = [
    { icon: Home, label: 'Dashboard' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Receipt, label: 'Transactions' },
    { icon: ShieldCheck, label: 'Tax Strategy' },
    { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activeView, onViewChange, onSignOut }: SidebarProps) {
    return (
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-20">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">SmartTax</span>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => onViewChange(item.label)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                activeView === item.label
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                                activeView === item.label ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
                            )} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-800">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-4 cursor-default">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 border border-slate-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">Alex Chen</p>
                        <p className="text-xs text-slate-500 truncate">Pro Account</p>
                    </div>
                </div>
                <button
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
