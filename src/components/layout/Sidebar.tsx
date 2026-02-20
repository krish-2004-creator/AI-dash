"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Video,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Users,
    UserCircle,
    FileText,
    HelpCircle,
    Activity,
    ClipboardList,
    FolderKanban,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, role: "all" },
    { name: "My Workspaces", href: "/dashboard/workspaces", icon: FolderKanban, role: "all" },
    { name: "Documents", href: "/documents", icon: FileText, role: "all" },
    { name: "AI Tool", href: "/ai-tool", icon: Video, role: "all" },
    { name: "My Reports", href: "/reports", icon: FileText, role: "all" },
    { name: "Admin Users", href: "/admin/users", icon: Users, role: "admin" },
    { name: "System Health", href: "/admin/health", icon: Activity, role: "admin" },
    { name: "Audit Logs", href: "/admin/audit", icon: ClipboardList, role: "admin" },
    { name: "Profile", href: "/profile", icon: UserCircle, role: "all" },
    { name: "Settings", href: "/settings", icon: Settings, role: "all" },
    { name: "Help", href: "/help", icon: HelpCircle, role: "all" },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 left-0 backdrop-blur-xl border-r transition-all duration-300 z-50 flex flex-col",
                "bg-dark-card/60 border-neon-cyan/15",
                collapsed ? "w-20" : "w-64"
            )}
            style={{
                boxShadow: "inset -1px 0 0 rgba(0,245,255,0.08)",
            }}
        >
            {/* Logo / Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-neon-cyan/10">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <Cpu size={18} className="text-neon-cyan" style={{ filter: "drop-shadow(0 0 6px #00f5ff)" }} />
                        <span
                            className="text-lg font-bold tracking-widest uppercase"
                            style={{
                                fontFamily: "var(--font-orbitron), sans-serif",
                                background: "linear-gradient(135deg, #00f5ff, #0ea5e9)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: "drop-shadow(0 0 6px rgba(0,245,255,0.4))",
                            }}
                        >
                            Krish AI Dash
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg transition-all duration-200 text-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/10"
                    style={{ borderColor: "transparent" }}
                >
                    {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    if (item.role === "admin" && user?.role !== "admin") return null;

                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                isActive
                                    ? "text-neon-cyan bg-neon-cyan/10"
                                    : "text-gray-500 hover:text-neon-cyan/80 hover:bg-neon-cyan/5"
                            )}
                            style={isActive ? {
                                border: "1px solid rgba(0,245,255,0.2)",
                                boxShadow: "0 0 12px rgba(0,245,255,0.1), inset 0 0 12px rgba(0,245,255,0.03)",
                            } : { border: "1px solid transparent" }}
                        >
                            {/* Active left bar */}
                            {isActive && (
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                                    style={{ background: "linear-gradient(180deg, #00f5ff, #0ea5e9)", boxShadow: "0 0 8px #00f5ff" }}
                                />
                            )}
                            <item.icon
                                size={20}
                                className={cn(isActive ? "text-neon-cyan" : "text-gray-600 group-hover:text-neon-cyan/70")}
                                style={isActive ? { filter: "drop-shadow(0 0 4px rgba(0,245,255,0.7))" } : {}}
                            />
                            {!collapsed && (
                                <span
                                    className="text-sm font-medium tracking-wide"
                                    style={isActive ? { fontFamily: "var(--font-share-tech-mono), monospace" } : {}}
                                >
                                    {item.name}
                                </span>
                            )}

                            {/* Tooltip when collapsed */}
                            {collapsed && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-dark-card border border-neon-cyan/20 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-neon-cyan"
                                    style={{ boxShadow: "0 0 10px rgba(0,245,255,0.2)" }}>
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign out */}
            <div className="p-4 border-t border-neon-cyan/10">
                <button
                    onClick={logout}
                    className={cn(
                        "group flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200",
                        "text-gray-500 hover:text-red-400 hover:bg-red-400/10",
                        collapsed && "justify-center"
                    )}
                    style={{ border: "1px solid transparent" }}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}
