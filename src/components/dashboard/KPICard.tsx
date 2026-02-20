import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    trend: "up" | "down" | "neutral";
    color: "purple" | "cyan" | "pink";
}

export function KPICard({ title, value, change, icon: Icon, trend, color }: KPICardProps) {
    const colorStyles = {
        purple: "from-brand-purple/20 to-brand-purple/5 text-brand-purple border-brand-purple/20",
        cyan: "from-brand-cyan/20 to-brand-cyan/5 text-brand-cyan border-brand-cyan/20",
        pink: "from-brand-pink/20 to-brand-pink/5 text-brand-pink border-brand-pink/20",
    };

    const iconStyles = {
        purple: "bg-brand-purple/20 text-brand-purple",
        cyan: "bg-brand-cyan/20 text-brand-cyan",
        pink: "bg-brand-pink/20 text-brand-pink",
    };

    return (
        <div className={cn("glass-card p-6 border", colorStyles[color].split(" ")[3])}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            trend === "up" ? "bg-green-500/20 text-green-400" :
                                trend === "down" ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400"
                        )}>
                            {change}
                        </span>
                        <span className="text-gray-500 text-xs">vs last month</span>
                    </div>
                </div>
                <div className={cn("p-3 rounded-xl", iconStyles[color])}>
                    <Icon size={24} />
                </div>
            </div>

            {/* Decorative gradient blob */}
            <div className={cn(
                "absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none",
                color === "purple" ? "bg-brand-purple" : color === "cyan" ? "bg-brand-cyan" : "bg-brand-pink"
            )} />
        </div>
    );
}
