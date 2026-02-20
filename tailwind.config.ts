import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // AI Robotic brand palette
                brand: {
                    cyan: "#00f5ff",
                    green: "#39ff14",
                    blue: "#0ea5e9",
                    purple: "#7c3aed",
                    pink: "#f0abfc",
                    DEFAULT: "#00f5ff",
                },
                neon: {
                    cyan: "#00f5ff",
                    green: "#39ff14",
                    blue: "#0ea5e9",
                },
                dark: {
                    bg: "#020817",  // Deep pitch black
                    card: "#0a1628",  // Dark navy card
                    surface: "#0d2137",  // Slightly lighter surface
                    border: "#1e3a5f",  // Electric dark border
                },
            },
            fontFamily: {
                robot: ["Orbitron", "sans-serif"],
                mono: ["Share Tech Mono", "monospace"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-cyber": "linear-gradient(135deg, #00f5ff 0%, #0ea5e9 50%, #39ff14 100%)",
                "gradient-neon": "linear-gradient(135deg, #39ff14 0%, #00f5ff 100%)",
                "glass": "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(14,165,233,0.04))",
                "circuit":
                    "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
            },
            backdropBlur: {
                xs: "2px",
            },
            boxShadow: {
                "neon-cyan": "0 0 8px rgba(0,245,255,0.6), 0 0 24px rgba(0,245,255,0.3)",
                "neon-green": "0 0 8px rgba(57,255,20,0.6), 0 0 24px rgba(57,255,20,0.3)",
                "neon-blue": "0 0 8px rgba(14,165,233,0.6), 0 0 24px rgba(14,165,233,0.3)",
                "card-glow": "0 0 30px rgba(0,245,255,0.05), inset 0 1px 0 rgba(0,245,255,0.1)",
            },
            animation: {
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "flicker": "flicker 6s linear infinite",
                "fade-in": "fade-in 0.4s ease-out",
                "data-stream": "data-stream 3s linear infinite",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 4px #39ff14, 0 0 8px #39ff14", opacity: "1" },
                    "50%": { boxShadow: "0 0 12px #39ff14, 0 0 24px #39ff14", opacity: "0.7" },
                },
                "flicker": {
                    "0%, 100%": { opacity: "1" },
                    "92%": { opacity: "1" },
                    "93%": { opacity: "0.4" },
                    "94%": { opacity: "1" },
                    "96%": { opacity: "0.6" },
                    "97%": { opacity: "1" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(8px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "data-stream": {
                    "0%": { backgroundPosition: "0 0" },
                    "100%": { backgroundPosition: "0 100%" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
