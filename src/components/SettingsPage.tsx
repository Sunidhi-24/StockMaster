import { NavigationBar } from './NavigationBar';
import { User, Bell, Lock, Database, Globe, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location';

interface SettingsPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <NavigationBar
        currentPage="settings"
        onNavigate={onNavigate}
        pageTitle="Configuration"
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-white">Settings</h1>
          <p className="text-zinc-400">Manage your account and system preferences</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* User Profile Settings */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600/20 rounded-lg p-3">
                <User className="text-red-500" size={24} />
              </div>
              <h2 className="text-white">User Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-red-500 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  defaultValue="admin"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-red-500 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="admin@warehouse.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-red-500 mb-2">
                  Role
                </label>
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-400">
                  Administrator
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition-colors">
                Update Profile
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600/20 rounded-lg p-3">
                <Bell className="text-green-500" size={24} />
              </div>
              <h2 className="text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Mail className="text-zinc-500" size={18} />
                  <span className="text-zinc-300">Email Notifications</span>
                </div>
                <button className="bg-green-600 rounded-full px-4 py-1 text-white text-sm hover:bg-green-700 transition-colors">
                  ON
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Clock className="text-zinc-500" size={18} />
                  <span className="text-zinc-300">Late Delivery Alerts</span>
                </div>
                <button className="bg-green-600 rounded-full px-4 py-1 text-white text-sm hover:bg-green-700 transition-colors">
                  ON
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Bell className="text-zinc-500" size={18} />
                  <span className="text-zinc-300">Stock Alerts</span>
                </div>
                <button className="bg-green-600 rounded-full px-4 py-1 text-white text-sm hover:bg-green-700 transition-colors">
                  ON
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="text-zinc-500" size={18} />
                  <span className="text-zinc-300">Operation Updates</span>
                </div>
                <button className="bg-zinc-700 rounded-full px-4 py-1 text-zinc-400 text-sm hover:bg-zinc-600 transition-colors">
                  OFF
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600/20 rounded-lg p-3">
                <Lock className="text-red-500" size={24} />
              </div>
              <h2 className="text-white">Security</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg py-3 transition-colors">
                Change Password
              </button>

              <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg py-3 transition-colors">
                Two-Factor Authentication
              </button>

              <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg py-3 transition-colors">
                Active Sessions
              </button>

              <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg py-3 transition-colors">
                Login History
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-600/20 rounded-lg p-3">
                <Database className="text-purple-500" size={24} />
              </div>
              <h2 className="text-white">System</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-300">Database Status</span>
                <span className="inline-block bg-green-600/20 text-green-500 border border-green-600/30 px-3 py-1 rounded text-sm">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-300">API Version</span>
                <span className="text-zinc-400">v1.2.0</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-300">Last Backup</span>
                <span className="text-zinc-400">12/20/2025</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-zinc-300">System Uptime</span>
                <span className="text-zinc-400">99.8%</span>
              </div>

              <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg py-2 transition-colors">
                Export Data
              </button>
            </div>
          </div>

          {/* Warehouse Configuration */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-600/20 rounded-lg p-3">
                <Globe className="text-orange-500" size={24} />
              </div>
              <h2 className="text-white">Warehouse Configuration</h2>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="location" className="block text-red-500 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Default Location</span>
                  </div>
                </label>
                <select
                  id="location"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>WH/Stock1</option>
                  <option>WH/Stock2</option>
                  <option>WH/Stock3</option>
                </select>
              </div>

              <div>
                <label htmlFor="currency" className="block text-red-500 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Currency</span>
                  </div>
                </label>
                <select
                  id="currency"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>Rs (Rupees)</option>
                  <option>USD (US Dollar)</option>
                  <option>EUR (Euro)</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-red-500 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Timezone</span>
                  </div>
                </label>
                <select
                  id="timezone"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>UTC +5:30</option>
                  <option>UTC +0:00</option>
                  <option>UTC -5:00</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
