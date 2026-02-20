"use client";

import { useAuth } from "@/context/AuthContext";
import { Activity, Cpu, Server, Wifi } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SystemHealthPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== "admin") {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="text-green-400" />
                System Health
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HealthCard
                    title="CPU Usage"
                    value="45%"
                    status="Healthy"
                    icon={<Cpu size={24} className="text-brand-purple" />}
                    color="purple"
                />
                <HealthCard
                    title="Memory Usage"
                    value="1.2 GB"
                    status="Warning"
                    icon={<Server size={24} className="text-brand-cyan" />}
                    color="cyan"
                />
                <HealthCard
                    title="Network Latency"
                    value="24ms"
                    status="Excellent"
                    icon={<Wifi size={24} className="text-brand-pink" />}
                    color="pink"
                />
            </div>

            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Server Status</h3>
                <div className="space-y-4">
                    {['API Server', 'Database Cluster', 'Redis Cache', 'CDN Edge'].map((server) => (
                        <div key={server} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-gray-300 font-medium">{server}</span>
                            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Operational
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function HealthCard({ title, value, status, icon, color }: any) {
    return (
        <div className="glass-card p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity bg-${color}-500/20 rounded-bl-3xl`}>
                {icon}
            </div>
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-gray-400 font-medium">{title}</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <span className={`text-sm ${status === 'Warning' ? 'text-yellow-400' : 'text-green-400'}`}>
                {status}
            </span>
        </div>
    );
}
