"use client";

import { Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    return (
        <header className="h-16 sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-pink rounded-full border-2 border-dark-bg"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-brand-purple">Administrator</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-purple to-brand-pink p-[1px]">
                        <div className="h-full w-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
                            <User size={18} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
