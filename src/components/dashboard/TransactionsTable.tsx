// Removed unused import

const transactions = [
    { id: 1, user: "Alice Freeman", email: "alice@example.com", amount: "$120.00", status: "Completed", date: "2 mins ago", avatar: "" },
    { id: 2, user: "Bob Smith", email: "bob@example.com", amount: "$54.00", status: "Processing", date: "15 mins ago", avatar: "" },
    { id: 3, user: "Charlie Brown", email: "charlie@example.com", amount: "$850.00", status: "Completed", date: "1 hour ago", avatar: "" },
    { id: 4, user: "Diana Prince", email: "diana@example.com", amount: "$230.00", status: "Failed", date: "3 hours ago", avatar: "" },
];

export function TransactionsTable() {
    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 uppercase border-b border-white/10">
                        <tr>
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-medium text-xs">
                                            {tx.user.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{tx.user}</p>
                                            <p className="text-xs text-gray-500">{tx.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300 font-medium">
                                    {tx.amount}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        tx.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                                    {tx.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
