"use client";

import { useAuth } from "@/context/AuthContext";
import { Clock, LogOut } from "lucide-react";

export default function PendingApprovalPage() {
    const { logout, user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4 relative overflow-hidden">
            <div className="glass-panel w-full max-w-md p-8 rounded-2xl text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto text-yellow-500 mb-4">
                    <Clock size={40} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Account Pending Approval</h1>
                    <p className="text-gray-400">
                        Thanks for searching up, <span className="text-white font-medium">{user?.name}</span>.
                        Your account is currently under review by an administrator.
                    </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-300">
                    You will gain access to the dashboard once an admin approves your request. Please check back later.
                </div>

                <button
                    onClick={logout}
                    className="text-gray-400 hover:text-white flex items-center justify-center gap-2 mx-auto text-sm transition-colors"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
