import Link from "next/link";
import { Cpu, Zap, Shield, Rocket, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-dark-bg selection:bg-neon-cyan/30 text-foreground overflow-hidden font-sans">
            {/* Background Grid & Scanlines */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-circuit bg-[length:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-data-stream" />
            </div>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm animate-fade-in">
                    <Zap size={14} className="text-neon-cyan animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.2em] text-neon-cyan/80 uppercase">System Status: Online</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-robot font-black tracking-tighter mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <span className="text-gradient">KRISH AI</span>
                    <br />
                    <span className="text-white">DASH</span>
                </h1>

                <p className="max-w-2xl text-lg text-gray-400 font-light leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    The next-generation command center for your digital documents.
                    Powered by advanced neural architectures, designed for ultimate efficiency.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <Link
                        href="/login"
                        className="btn-robot group flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
                    >
                        Initialize System
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/signup"
                        className="px-8 py-4 rounded-xl border border-white/10 hover:border-neon-cyan/30 hover:bg-white/5 transition-all text-gray-300 font-medium"
                    >
                        Register Identity
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <FeatureCard
                        icon={<Cpu className="text-neon-cyan" />}
                        title="Neural Processing"
                        description="Advanced AI summarization engines process your documents in milliseconds."
                    />
                    <FeatureCard
                        icon={<Shield className="text-neon-green" />}
                        title="Secure Vault"
                        description="End-to-end encrypted storage for your most sensitive technical documentation."
                    />
                    <FeatureCard
                        icon={<Rocket className="text-neon-blue" />}
                        title="Hyper-Speed"
                        description="Optimized with Turbopack for instantaneous response and data retrieval."
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-10 text-center">
                <p className="text-xs font-mono text-gray-600 tracking-widest uppercase">
                    &copy; 2026 KRISH AI DASH // ALL RIGHTS RESERVED
                </p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-card p-8 text-left corner-decoration flex flex-col gap-4 group">
            <div className="p-3 w-fit rounded-lg bg-white/5 border border-white/5 group-hover:border-neon-cyan/20 transition-colors">
                {icon}
            </div>
            <h3 className="font-robot text-xl font-bold text-gray-100">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
                {description}
            </p>
        </div>
    );
}
