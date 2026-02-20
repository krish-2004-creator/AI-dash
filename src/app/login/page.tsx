"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Mail, Lock, Loader2, User, ShieldCheck, Cpu, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("user");
    const { login, isLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [splashProgress, setSplashProgress] = useState(0);

    // Splash screen timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3200);

        const progressInterval = setInterval(() => {
            setSplashProgress(prev => Math.min(prev + 1, 100));
        }, 25);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await login(email, role);
        setIsSubmitting(false);
    };

    if (showSplash) {
        return (
            <div className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center overflow-hidden font-robot">
                {/* Circuit Grid Background */}
                <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-data-stream" />

                <div className="relative flex flex-col items-center animate-fade-in">
                    <div className="mb-8 p-4 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 relative">
                        <Cpu size={64} className="text-neon-cyan animate-pulse" />
                        <div className="absolute inset-0 rounded-full blur-2xl bg-neon-cyan/20 animate-pulse" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-[0.15em] mb-4 text-center">
                        <span className="text-gradient">WELCOME TO</span>
                        <br />
                        <span className="text-white drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">KRISH AI DASH</span>
                    </h1>

                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mt-8 border border-white/5 relative">
                        <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue transition-all duration-100 ease-out shadow-[0_0_10px_#00f5ff]"
                            style={{ width: `${splashProgress}%` }}
                        />
                    </div>

                    <p className="mt-4 font-mono text-[10px] text-neon-cyan/50 tracking-[0.3em] uppercase animate-pulse">
                        {splashProgress === 100 ? "System Initialized" : `Loading Subsystems... ${splashProgress}%`}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 relative overflow-hidden font-sans">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />

            {/* Dark/Neon Glow Blobs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10 corner-decoration animate-fade-in shadow-card-glow">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 mb-4 shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                        <Zap size={24} className="text-neon-cyan" />
                    </div>
                    <h1 className="text-3xl font-robot font-bold text-white mb-2 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">System Auth Gateway</p>
                </div>

                {/* Role Selector */}
                <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/10">
                    <button
                        onClick={() => setRole("user")}
                        type="button"
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all",
                            role === "user"
                                ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                        )}
                    >
                        <User size={16} />
                        Operator
                    </button>
                    <button
                        onClick={() => setRole("admin")}
                        type="button"
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-all",
                            role === "admin"
                                ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                        )}
                    >
                        <ShieldCheck size={16} />
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-gray-500 ml-1">Access Identity</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-neon-cyan" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-cyan/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-700 text-sm font-mono"
                                placeholder="Enter system email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-gray-500 ml-1">Secret Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-neon-cyan" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-cyan/40 focus:bg-white/[0.05] transition-all placeholder:text-gray-700 text-sm font-mono"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="btn-robot w-full flex items-center justify-center gap-3 py-4 text-sm font-bold mt-2"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                Initialize Session
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-white/5">
                    <p className="text-gray-600 text-[10px] font-mono tracking-[0.2em] uppercase">
                        New Operator?{" "}
                        <Link href="/signup" className="text-neon-cyan hover:text-white transition-colors underline decoration-neon-cyan/30 underline-offset-4">
                            Register Identity
                        </Link>
                    </p>
                </div>
            </div>

            {/* Bottom System Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase pointer-events-none">
                Krish AI Dash // Secure Auth Module // V2.0.4
            </div>
        </div>
    );
}
