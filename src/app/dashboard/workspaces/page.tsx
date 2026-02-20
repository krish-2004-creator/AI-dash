"use client";

import { useState, useEffect } from "react";
import { Folder, Plus, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface Workspace {
    id: number;
    title: string;
    createdAt: string;
}

export default function WorkspacesPage() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTitle, setNewTitle] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    const fetchWorkspaces = async () => {
        try {
            const res = await fetch("/api/workspaces");
            if (res.ok) {
                const data = await res.json();
                setWorkspaces(data);
            }
        } catch (error) {
            console.error("Failed to fetch workspaces", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        setIsCreating(true);
        try {
            const res = await fetch("/api/workspaces", {
                method: "POST",
                body: JSON.stringify({ title: newTitle }),
            });
            if (res.ok) {
                setNewTitle("");
                fetchWorkspaces();
            }
        } catch (error) {
            console.error("Failed to create workspace", error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        My Workspaces
                    </h1>
                    <p className="text-gray-400 mt-1">Manage, organize, and chat with your document collections.</p>
                </div>

                <form onSubmit={handleCreate} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New Workspace Name..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500"
                    />
                    <button
                        disabled={isCreating || !newTitle.trim()}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Create
                    </button>
                </form>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
            ) : workspaces.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center text-gray-400">
                    <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No workspaces yet. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workspaces.map((ws) => (
                        <Link
                            key={ws.id}
                            href={`/dashboard/workspaces/${ws.id}`}
                            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <Folder className="w-6 h-6 text-blue-400" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{ws.title}</h3>
                            <p className="text-sm text-gray-500">Created {new Date(ws.createdAt).toLocaleDateString()}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
