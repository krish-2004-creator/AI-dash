"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, UserPlus, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className="h-16 sticky top-0 z-40 backdrop-blur-md border-b px-6 flex items-center justify-between"
            style={{
                background: "rgba(2, 8, 23, 0.85)",
                borderBottomColor: "rgba(0, 245, 255, 0.1)",
                boxShadow: "0 1px 0 rgba(0, 245, 255, 0.05)",
            }}
        >
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: "rgba(0,245,255,0.4)" }}
                        size={16}
                    />
                    <input
                        type="text"
                        placeholder="Search systems..."
                        className="w-full py-2 pl-9 pr-4 text-sm text-gray-300 outline-none transition-all placeholder:text-gray-600 rounded-lg"
                        style={{
                            background: "rgba(0,245,255,0.04)",
                            border: "1px solid rgba(0,245,255,0.15)",
                            fontFamily: "var(--font-share-tech-mono), monospace",
                        }}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Online indicator */}
                <div className="hidden sm:flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: "#39ff14",
                            boxShadow: "0 0 6px #39ff14, 0 0 12px #39ff14",
                            animation: "pulse-glow 2s ease-in-out infinite",
                        }}
                    />
                    <span className="text-xs text-gray-500" style={{ fontFamily: "var(--font-share-tech-mono), monospace" }}>
                        SYS ONLINE
                    </span>
                </div>

                {/* Notification bell */}
                <button
                    className="relative p-2 rounded-lg transition-all duration-200"
                    style={{ border: "1px solid rgba(0, 245, 255, 0.1)" }}
                >
                    <Bell size={18} style={{ color: "rgba(0,245,255,0.6)" }} />
                    <span
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: "#39ff14", boxShadow: "0 0 4px #39ff14" }}
                    />
                </button>

                {/* User profile dropdown container */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "flex items-center gap-3 pl-4 transition-all duration-200 hover:opacity-80",
                            isMenuOpen && "scale-[0.98]"
                        )}
                        style={{ borderLeft: "1px solid rgba(0,245,255,0.1)" }}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-200" style={{ fontFamily: "var(--font-orbitron), sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                                {user?.name || "Admin User"}
                            </p>
                            <p className="text-xs" style={{ color: "#00f5ff", fontFamily: "var(--font-share-tech-mono), monospace" }}>
                                {user?.role?.toUpperCase() || "OPERATOR"}
                            </p>
                        </div>
                        <div
                            className="h-9 w-9 rounded-full flex items-center justify-center relative"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(14,165,233,0.2))",
                                border: "1px solid rgba(0,245,255,0.4)",
                                boxShadow: "0 0 12px rgba(0,245,255,0.2)",
                            }}
                        >
                            <User size={16} style={{ color: "#00f5ff" }} />
                            <div className="absolute -bottom-0.5 -right-0.5 bg-dark-bg rounded-full p-0.5 border border-neon-cyan/20">
                                <ChevronDown size={8} className={cn("text-neon-cyan transition-transform", isMenuOpen && "rotate-180")} />
                            </div>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div
                            className="absolute right-0 mt-3 w-56 glass-panel rounded-xl py-2 z-50 animate-fade-in corner-decoration"
                            style={{
                                animationDuration: '0.2s',
                                border: '1px solid rgba(0, 245, 255, 0.2)',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0, 245, 255, 0.1)'
                            }}
                        >
                            {/* Header in dropdown */}
                            <div className="px-4 py-2 border-b border-neon-cyan/10 mb-1">
                                <p className="text-[10px] font-mono text-neon-cyan/50 uppercase tracking-widest mb-0.5">Active Session</p>
                                <p className="text-xs font-medium text-gray-200 truncate">{user?.email || "admin@krish-ai.dash"}</p>
                            </div>

                            {/* Menu Items */}
                            <button
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all group"
                                onClick={() => {
                                    console.log("Add account clicked");
                                    setIsMenuOpen(false);
                                }}
                            >
                                <UserPlus size={16} className="group-hover:animate-pulse" />
                                <span className="font-mono-robot">Add Account</span>
                            </button>

                            <div className="h-px bg-neon-cyan/10 my-1 mx-2" />

                            <button
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all group"
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                            >
                                <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span className="font-mono-robot">Sign Out System</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
