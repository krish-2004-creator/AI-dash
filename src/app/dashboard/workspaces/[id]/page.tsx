"use client";

import { useState, useEffect, useRef, use } from "react";
import { useParams } from "next/navigation";
import { Upload, FileText, Send, Loader2, Bot, User, File as FileIcon, Globe } from "lucide-react";

interface Document {
    id: number;
    name: string;
    type: string;
    createdAt: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function WorkspaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoadingDocs, setIsLoadingDocs] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isChatting, setIsChatting] = useState(false);
    const [isDeepSearch, setIsDeepSearch] = useState(false);

    // File upload ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchDocuments();
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchDocuments = async () => {
        try {
            const res = await fetch(`/api/workspaces/${id}/documents`);
            if (res.ok) {
                const data = await res.json();
                setDocuments(data);
            }
        } catch (error) {
            console.error("Failed to fetch documents", error);
        } finally {
            setIsLoadingDocs(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`/api/workspaces/${id}/documents`, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                fetchDocuments(); // Refresh list
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isChatting) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsChatting(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workspaceId: parseInt(id),
                    question: userMsg,
                    useDeepSearch: isDeepSearch
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error answering that." }]);
        } finally {
            setIsChatting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] p-4 flex flex-col md:flex-row gap-6">
            {/* Sidebar: Documents List */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white/5 border border-white/10 rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        Documents
                    </h2>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".pdf,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:opacity-50"
                            title="Upload Document"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isLoadingDocs ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                        </div>
                    ) : documents.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No documents yet. Upload one to start!</p>
                    ) : (
                        documents.map(doc => (
                            <div key={doc.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors group">
                                <div className="p-2 bg-gray-800 rounded">
                                    <FileIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium truncate text-gray-200">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{new Date(doc.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Area: Chat Interface */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                        <Bot className="w-5 h-5 text-indigo-400" />
                        Workspace Chat
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Ask questions about your uploaded documents!</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 flex gap-3 ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800/80 text-gray-200 border border-white/5 shadow-sm'
                                    }`}>
                                    {msg.role === 'assistant' && (
                                        <div className="mt-1 min-w-[20px]">
                                            <Bot className="w-5 h-5 text-indigo-400" />
                                        </div>
                                    )}
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                                    {msg.role === 'user' && (
                                        <div className="mt-1 min-w-[20px]">
                                            <User className="w-5 h-5 text-blue-200" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {isChatting && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800/80 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                                <span className="text-sm text-gray-400">Analyzing documents...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-white/5 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsDeepSearch(!isDeepSearch)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isDeepSearch ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDeepSearch ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            Deep Search (Web)
                        </span>
                    </div>

                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={documents.length > 0 ? "Ask a question..." : "Upload a document first..."}
                            disabled={documents.length === 0 || isChatting}
                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isChatting || documents.length === 0}
                            className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
