"use client";

import { HelpCircle, MessageSquare } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Help & Support</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <HelpCircle size={20} className="text-brand-cyan" />
                            Frequently Asked Questions
                        </h3>
                        <div className="space-y-4">
                            <FAQItem
                                question="How do I generate a summary?"
                                answer="Navigate to the AI Tool page, paste a YouTube link, and click 'Analyze Video'."
                            />
                            <FAQItem
                                question="Can I export my notes?"
                                answer="Yes, you can download your summaries as PDF or Markdown from the Reports page."
                            />
                            <FAQItem
                                question="Is my data private?"
                                answer="Absolutely. We use enterprise-grade encryption to secure your personal summaries."
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="glass-card p-6 sticky top-24">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MessageSquare size={20} className="text-brand-pink" />
                            Contact Support
                        </h3>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-pink/50 text-sm"
                            />
                            <textarea
                                rows={4}
                                placeholder="Describe your issue..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-pink/50 text-sm resize-none"
                            />
                            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-bold shadow-lg shadow-brand-pink/20 hover:opacity-90 transition-opacity">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h4 className="font-medium text-white mb-2">{question}</h4>
            <p className="text-sm text-gray-400">{answer}</p>
        </div>
    )
}
