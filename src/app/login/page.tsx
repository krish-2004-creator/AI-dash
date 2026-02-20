"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Mail, Lock, Loader2, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("user");
    const { login, isLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await login(email, role);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

            <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-cyan mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Sign in to access your dashboard</p>
                </div>

                {/* Role Selector */}
                <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/10">
                    <button
                        onClick={() => setRole("user")}
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${role === "user"
                                ? "bg-brand-purple text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <User size={18} />
                        User
                    </button>
                    <button
                        onClick={() => setRole("admin")}
                        type="button"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${role === "admin"
                                ? "bg-brand-cyan text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <ShieldCheck size={18} />
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-600"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-600"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 ${role === "admin"
                                ? "bg-gradient-to-r from-brand-cyan to-blue-500 hover:opacity-90 shadow-brand-cyan/25"
                                : "bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-brand-purple/25"
                            }`}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : `Sign In as ${role === 'admin' ? 'Admin' : 'User'}`}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-brand-purple hover:text-brand-pink transition-colors font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
