"use client";

import { useAuth } from "@/context/AuthContext";
import { ClipboardList, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuditLogsPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    const logs = [
        { id: 1, action: "User Login", user: "alice@example.com", time: "2 mins ago", type: "info" },
        { id: 2, action: "Settings Update", user: "bob@example.com", time: "15 mins ago", type: "success" },
        { id: 3, action: "Failed Login Attempt", user: "unknown", time: "1 hour ago", type: "warning" },
        { id: 4, action: "User Approved", user: "admin@example.com", time: "2 hours ago", type: "success" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ClipboardList className="text-gray-400" />
                Audit Logs
            </h1>

            <div className="glass-card p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs text-gray-400 uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Action</th>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Time</th>
                            <th className="px-6 py-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{log.action}</td>
                                <td className="px-6 py-4 text-gray-400">{log.user}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{log.time}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${log.type === 'success' ? 'bg-green-500/10 text-green-400' :
                                            log.type === 'warning' ? 'bg-red-500/10 text-red-400' :
                                                'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {log.type === 'success' && <CheckCircle size={12} />}
                                        {log.type === 'warning' && <AlertTriangle size={12} />}
                                        {log.type === 'info' && <Info size={12} />}
                                        <span className="capitalize">{log.type}</span>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
