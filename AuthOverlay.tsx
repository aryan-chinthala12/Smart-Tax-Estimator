"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthOverlayProps {
    onAuthenticated: () => void;
}

export default function AuthOverlay({ onAuthenticated }: AuthOverlayProps) {
    const [step, setStep] = useState<'login' | 'mfa'>('login');
    const [mfaCode, setMfaCode] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('mfa');
    };

    const handleMfaSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mfaCode.length === 6) {
            onAuthenticated();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500 animate-gradient" />

                <AnimatePresence mode="wait">
                    {step === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6 text-center"
                        >
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="text-emerald-400 w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Secure Sign-In</h2>
                                <p className="text-slate-400 mt-2">Access your encrypted tax vault.</p>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-4 text-left">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="alex.chen@finmail.com"
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2">
                                    Continue <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="mfa"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6 text-center"
                        >
                            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Lock className="text-amber-400 w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Verification Code</h2>
                                <p className="text-slate-400 mt-2">We sent a 6-digit code to your device.</p>
                            </div>
                            <form onSubmit={handleMfaSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="0 0 0 0 0 0"
                                    value={mfaCode}
                                    onChange={(e) => setMfaCode(e.target.value)}
                                    className="w-full bg-slate-800 border-2 border-slate-700 text-white text-center text-4xl font-bold tracking-[1em] rounded-xl py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
                                    autoFocus
                                />
                                <button type="submit" disabled={mfaCode.length !== 6} className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                                    Verify & Unlock
                                </button>
                                <p className="text-xs text-slate-500">
                                    Didn't receive it? <button type="button" className="text-emerald-400 hover:underline">Resend code</button>
                                </p>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
