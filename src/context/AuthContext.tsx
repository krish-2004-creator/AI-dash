"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "pending" | "rejected";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, role?: UserRole) => Promise<void>;
    signup: (name: string, email: string) => Promise<void>;
    logout: () => void;
    approveUser: (userId: string) => void;
    rejectUser: (userId: string) => void;
    pendingUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial users
const MOCK_USERS: User[] = [
    { id: "1", name: "Alice Freeman", email: "alice@example.com", role: "user", status: "pending", avatar: "" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", status: "pending", avatar: "" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingUsers, setPendingUsers] = useState<User[]>(MOCK_USERS);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted user (mock session)
        const storedUser = localStorage.getItem("ai-dash-user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, role: UserRole = "user") => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo: generic admin login or user login
        const newUser: User = {
            id: Math.random().toString(),
            name: email.split("@")[0],
            email,
            role: role,
            status: role === "admin" ? "active" : "active", // Auto-activate for demo unless signup flow
        };

        setUser(newUser);
        localStorage.setItem("ai-dash-user", JSON.stringify(newUser));
        setIsLoading(false);
        router.push("/dashboard");
    };

    const signup = async (name: string, email: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newUser: User = {
            id: Math.random().toString(),
            name,
            email,
            role: "user",
            status: "pending", // New signups are pending
        };

        setUser(newUser);
        localStorage.setItem("ai-dash-user", JSON.stringify(newUser));
        setIsLoading(false);
        router.push("/pending-approval");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("ai-dash-user");
        router.push("/login");
    };

    const approveUser = (userId: string) => {
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
        // In a real app, you'd update the DB. Here we just update local state.
    };

    const rejectUser = (userId: string) => {
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, approveUser, rejectUser, pendingUsers }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
