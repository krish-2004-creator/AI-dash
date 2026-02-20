
"use client";

import { useState } from "react";
import { Sparkles, Youtube, Loader2, FileText, ClipboardPaste } from "lucide-react";
import { cn } from "@/lib/utils";

type InputMode = "url" | "text";

export default function AIStudyNotes() {
    const [mode, setMode] = useState<InputMode>("url");
    const [url, setUrl] = useState("");
    const [transcriptText, setTranscriptText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "url" && !url) return;
        if (mode === "text" && !transcriptText.trim()) return;

        setIsLoading(true);
        setSummary(null);

        try {
            const res = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    mode === "url"
                        ? { url }
                        : { transcript: transcriptText.trim() }
                ),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate summary");
            }

            setSummary(data.summary);
        } catch (error: any) {
            console.error("Generation error:", error);
            setSummary(`## Error\n\n${error.message || "Something went wrong. Please try again."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                    <Sparkles className="text-brand-purple" size={32} />
                    AI Video Summarizer
                </h1>
                <p className="text-gray-400">Transform YouTube videos into concise study notes instantly.</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10 bg-dark-bg/50 p-1 gap-1">
                <button
                    type="button"
                    onClick={() => setMode("url")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                        mode === "url"
                            ? "bg-brand-purple text-white shadow"
                            : "text-gray-400 hover:text-white"
                    )}
                >
                    <Youtube size={16} /> YouTube URL
                </button>
                <button
                    type="button"
                    onClick={() => setMode("text")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                        mode === "text"
                            ? "bg-brand-purple text-white shadow"
                            : "text-gray-400 hover:text-white"
                    )}
                >
                    <ClipboardPaste size={16} /> Paste Transcript
                </button>
            </div>

            <div className="glass-card p-8">
                <form onSubmit={handleGenerate} className="space-y-6">
                    {mode === "url" ? (
                        <div className="space-y-2">
                            <label htmlFor="url" className="text-sm font-medium text-gray-300 ml-1">YouTube Video URL</label>
                            <div className="relative group">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                                <input
                                    id="url"
                                    type="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label htmlFor="transcript" className="text-sm font-medium text-gray-300 ml-1">
                                Paste Transcript Text
                                <span className="ml-2 text-xs text-gray-500">
                                    (On YouTube: click ... → Show transcript → copy all text)
                                </span>
                            </label>
                            <textarea
                                id="transcript"
                                placeholder="Paste the video transcript here..."
                                value={transcriptText}
                                onChange={(e) => setTranscriptText(e.target.value)}
                                rows={8}
                                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-600 resize-none"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || (mode === "url" ? !url : !transcriptText.trim())}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2",
                            isLoading || (mode === "url" ? !url : !transcriptText.trim())
                                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg shadow-brand-purple/25 transform hover:-translate-y-0.5"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Generating Notes...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate Study Notes
                            </>
                        )}
                    </button>
                </form>
            </div>

            {summary && (
                <div className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <div className="h-10 w-10 rounded-lg bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                            <FileText size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Generated Notes</h2>
                    </div>
                    <div className="prose prose-invert max-w-none prose-headings:text-brand-cyan prose-a:text-brand-purple">
                        {summary.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) {
                                return <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-white">{line.replace('## ', '')}</h2>;
                            } else if (line.startsWith('### ')) {
                                return <h3 key={i} className="text-lg font-semibold mt-3 mb-1 text-white">{line.replace('### ', '')}</h3>;
                            } else {
                                return <p key={i} className="mb-2 text-gray-300">{line}</p>;
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
