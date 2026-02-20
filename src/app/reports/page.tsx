"use client";

import { FileText, Download, Trash2, Calendar } from "lucide-react";

export default function ReportsPage() {
    const reports = [
        { id: 1, title: "Introduction to React Hooks", date: "Oct 24, 2024", type: "Summary" },
        { id: 2, title: "Advanced Next.js Patterns", date: "Oct 22, 2024", type: "Full Notes" },
        { id: 3, title: "Tailwind CSS v4 Features", date: "Oct 20, 2024", type: "Summary" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">My Reports</h1>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-500 uppercase border-b border-white/10">
                            <tr>
                                <th className="px-4 py-3 font-medium">Document</th>
                                <th className="px-4 py-3 font-medium">Type</th>
                                <th className="px-4 py-3 font-medium">Date Created</th>
                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                                                <FileText size={16} />
                                            </div>
                                            <span className="text-sm font-medium text-white">{report.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-400">
                                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs border border-white/10">
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
                                        <Calendar size={14} />
                                        {report.date}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Download">
                                                <Download size={18} />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
