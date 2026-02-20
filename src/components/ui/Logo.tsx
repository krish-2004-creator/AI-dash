"use client";

import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function Logo({ className = "", iconSize = 28 }: { className?: string, iconSize?: number }) {
    return (
        <Link href="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="relative">
                <div className="absolute inset-0 bg-brand-purple blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <BrainCircuit size={iconSize} className="relative z-10 text-brand-cyan group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">
                AI-Dash
            </span>
        </Link>
    );
}
