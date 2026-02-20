"use client";

import { useState } from "react";
import { Upload, Send, FileText, Loader2, Bot, User } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function DocumentsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError("");
            // Reset chat when new file is uploaded? Optional.
            // setMessages([]); 
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !question.trim()) return;

        const currentQuestion = question;
        setQuestion("");
        setMessages((prev) => [...prev, { role: "user", content: currentQuestion }]);
        setIsLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("question", currentQuestion);

            const res = await fetch("/api/chat", {
                method: "POST",
                body: formData,
            });

            // Read text first to handle empty/malformed responses
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse JSON response:", text);
                throw new Error(`Server Error: ${res.status} ${res.statusText}`);
            }

            if (!res.ok) {
                throw new Error(data.error || "Failed to get answer");
            }

            setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong.");
            // Optionally remove the user message or show error bubble
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="text-brand-cyan" />
                    Document Q&A
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                {/* Sidebar / File Upload */}
                <div className="lg:col-span-1 glass-card p-6 flex flex-col gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Upload Document</h3>
                        <p className="text-sm text-gray-400 mb-4">Select a PDF or text file to analyze.</p>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-purple mb-2" />
                                <p className="text-sm text-gray-400 max-w-[80%] text-center truncate">
                                    {file ? file.name : "Click to upload"}
                                </p>
                            </div>
                            <input type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div className="flex-1 bg-white/5 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Current Document:</h4>
                        {file ? (
                            <div className="flex items-center gap-2 text-brand-cyan">
                                <FileText size={16} />
                                <span className="text-sm truncate font-medium">{file.name}</span>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-500 italic">No file selected</span>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-3 glass-card flex flex-col min-h-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                                <Bot size={48} className="opacity-20" />
                                <p>Upload a document and ask a question to get started.</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0 mt-1">
                                            <Bot size={18} />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-brand-purple/20 text-white rounded-tr-sm'
                                        : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/10'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 mt-1">
                                            <User size={18} />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0 mt-1">
                                    <Bot size={18} />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-2 text-gray-400">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="text-sm">Thinking...</span>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10">
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <input
                                translate="no"
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                disabled={!file || isLoading}
                                placeholder={file ? "Ask a question about this document..." : "Upload a file first..."}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple/50 placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={!file || !question.trim() || isLoading}
                                className="px-4 py-3 bg-brand-purple text-white rounded-xl hover:bg-brand-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
