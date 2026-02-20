"use client";

import { useAuth } from "@/context/AuthContext";
import { Check, X, User as UserIcon, ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const { user, pendingUsers, approveUser, rejectUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/");
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="text-brand-purple" />
                    User Management
                </h1>
            </div>

            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Pending Approvals</h2>

                {pendingUsers.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p>No pending user requests.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-white/10">
                                <tr>
                                    <th className="px-4 py-3 font-medium">User</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {pendingUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-medium text-xs">
                                                    <UserIcon size={16} />
                                                </div>
                                                <span className="text-sm font-medium text-white">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-400">
                                            {u.email}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => approveUser(u.id)}
                                                    className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => rejectUser(u.id)}
                                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
