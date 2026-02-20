"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Save } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");

    if (!user) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>

            <div className="glass-card p-8 max-w-2xl">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple border-2 border-brand-purple/50">
                        <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                            <Shield size={14} className={user.role === 'admin' ? "text-brand-cyan" : "text-gray-500"} />
                            <span className="capitalize">{user.role}</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-400 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <button className="px-6 py-3 rounded-xl bg-brand-purple text-white font-medium hover:bg-brand-purple/90 transition-colors flex items-center gap-2 shadow-lg shadow-brand-purple/20">
                        <Save size={18} />
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
