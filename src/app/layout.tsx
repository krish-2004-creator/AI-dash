import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Krish AI Dash",
  description: "AI-powered command center by Krish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${shareTechMono.variable} ${inter.variable} antialiased bg-dark-bg text-foreground selection:bg-neon-cyan/20 selection:text-neon-cyan`}
      >
        <AuthProvider>
          <AuthGuard>
            <AppLayout>{children}</AppLayout>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
