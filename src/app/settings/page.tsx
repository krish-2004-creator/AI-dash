"use client";

import { Moon, Bell, Shield, Lock } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Bell size={20} className="text-brand-pink" />
                        Preferences
                    </h3>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-400">Receive alerts about new features</p>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-brand-purple' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                            <p className="text-white font-medium">Dark Mode</p>
                            <p className="text-sm text-gray-400">Toggle application theme</p>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-brand-purple' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Shield size={20} className="text-brand-cyan" />
                        Security
                    </h3>

                    <div className="p-4 bg-white/5 rounded-xl space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Lock size={18} />
                            <span>Password last changed: 30 days ago</span>
                        </div>
                        <button className="text-brand-purple text-sm font-medium hover:text-brand-pink transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
