"use client";

import { Users, DollarSign, Activity } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <button className="bg-brand-purple hover:bg-brand-purple/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-purple/20">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Revenue"
          value="$54,230"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="purple"
        />
        <KPICard
          title="Active Users"
          value="2,450"
          change="+8.2%"
          trend="up"
          icon={Users}
          color="cyan"
        />
        <KPICard
          title="Bounce Rate"
          value="45%"
          change="-2.1%"
          trend="down" // down is good for bounce rate but color coding implies "bad" red for down usually. let's keep it simple.
          icon={Activity}
          color="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          {/* We can put the table here or something else. Table might be wide. */}
          {/* Let's put a smaller widget here or just make the table span full width below */}
          <div className="glass-card p-6 h-full flex flex-col justify-center items-center text-center">
            <div className="w-40 h-40 rounded-full border-8 border-brand-cyan/20 border-t-brand-cyan flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">78%</span>
            </div>
            <h3 className="text-xl font-bold text-white">Goal Completion</h3>
            <p className="text-gray-400 text-sm mt-2">You are tracking well against your monthly targets.</p>
          </div>
        </div>
      </div>

      <TransactionsTable />
    </div>
  );
}
