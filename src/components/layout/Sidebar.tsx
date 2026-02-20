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
    ChevronRight,
    Menu,
    Users,
    UserCircle,
    FileText,
    HelpCircle,
    Activity,
    ClipboardList,
    FolderKanban
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
                "h-screen sticky top-0 left-0 bg-dark-card/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-50 flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                {!collapsed && (
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-cyan">
                        AI-Dash
                    </span>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                >
                    {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {navigation.map((item) => {
                    // Role-based filtering
                    if (item.role === "admin" && user?.role !== "admin") return null;

                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                isActive
                                    ? "bg-brand-purple/10 text-brand-purple"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-purple rounded-r-full" />
                            )}
                            <item.icon size={22} className={cn(isActive && "text-brand-purple")} />
                            {!collapsed && (
                                <span className="font-medium">{item.name}</span>
                            )}

                            {collapsed && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 bg-dark-card border border-white/10 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={logout}
                    className={cn(
                        "flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors",
                        collapsed && "justify-center"
                    )}
                >
                    <LogOut size={22} />
                    {!collapsed && <span className="font-medium">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}
