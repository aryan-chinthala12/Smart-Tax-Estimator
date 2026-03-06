"use client";

import React from 'react';
import { User, Bell, Shield, CreditCard, Link2 } from 'lucide-react';

export default function SettingsView() {
    return (
        <div className="max-w-2xl space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">Settings</h2>
                <p className="text-slate-400">Manage your profile and account preferences.</p>
            </div>

            <div className="space-y-4">
                {[
                    { icon: User, label: 'Profile Information', desc: 'Alex Chen • Pro Plan' },
                    { icon: Shield, label: 'Security & Auth', desc: 'MFA Enabled • Password last changed 2d ago' },
                    { icon: Link2, label: 'Connected Accounts', desc: 'Plaid Linked • Veryfi API Connected' },
                    { icon: Bell, label: 'Notifications', desc: 'Tax deadlines and unusual spending alerts' },
                    { icon: CreditCard, label: 'Billing', desc: 'Next payment Apr 15, 2026' },
                ].map((item) => (
                    <button key={item.label} className="w-full glass-card p-6 flex items-center gap-4 hover:bg-slate-800/30 transition-all text-left group">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-semibold">{item.label}</p>
                            <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="pt-6 border-t border-slate-800">
                <button className="text-rose-500 hover:text-rose-400 text-sm font-semibold transition-colors">
                    Delete Account & Purge Data
                </button>
            </div>
        </div>
    );
}
