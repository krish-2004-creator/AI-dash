"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = ["/login", "/signup", "/pending-approval", "/"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        if (!isLoading) {
            if (!user && !PUBLIC_ROUTES.includes(pathname)) {
                router.push("/login");
            } else if (user && user.status === "pending" && pathname !== "/pending-approval") {
                router.push("/pending-approval");
            } else if (user && user.status === "active" && PUBLIC_ROUTES.includes(pathname) && pathname !== "/") {
                // Redirect to dashboard if logged in and trying to access login/signup
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, pathname, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-dark-bg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
            </div>
        );
    }

    // If on a public route and not logged in, show content
    if (!user && PUBLIC_ROUTES.includes(pathname)) {
        return <>{children}</>;
    }

    // If logged in but pending, show only pending page
    if (user && user.status === "pending" && pathname === "/pending-approval") {
        return <>{children}</>;
    }

    // If logged in and active, show content (unless on public route which is handled above)
    if (user && user.status === "active") {
        return <>{children}</>;
    }

    return null;
}
