import { NavigationBar } from './NavigationBar';
import { Warehouse, MapPin } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location';

interface WarehousePageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function WarehousePage({ onNavigate }: WarehousePageProps) {
  const [, setIsLoggedIn] = useState(true);
  const [name, setName] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [address, setAddress] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Saving warehouse:', { name, shortCode, address });
    setSaveMessage('Saved Successfully');
  };

  const handleCancel = () => {
    setName('');
    setShortCode('');
    setAddress('');
    setSaveMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="warehouse"
        onNavigate={onNavigate}
        pageTitle="Warehouse Configuration"
        onLogout={handleLogout}
      />

      <div className="max-w-4xl mx-auto px-6 pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 rounded-lg p-2">
              <Warehouse className="text-blue-600" size={20} />
            </div>
            <h1 className="text-slate-900">Warehouse</h1>
          </div>
          <p className="text-slate-600">Manage warehouse information and configuration</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-blue-600 mb-2">
                <div className="flex items-center gap-2">
                  <Warehouse size={16} />
                  <span>Name</span>
                </div>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter warehouse name"
              />
            </div>

            {/* Short Code Field */}
            <div>
              <label htmlFor="shortCode" className="block text-blue-600 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">#</span>
                  <span>Short Code</span>
                </div>
              </label>
              <input
                id="shortCode"
                type="text"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter short code (e.g., WH01)"
              />
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-blue-600 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Address</span>
                </div>
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter warehouse address"
              />
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Warehouse className="text-blue-600 mt-1" size={18} />
                <div>
                  <p className="text-slate-900 text-sm mb-1">Warehouse Setup Guide</p>
                  <p className="text-slate-600 text-sm">
                    Make sure to provide accurate warehouse details. 
                    The short code should be unique and will be used for quick identification across the system.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg py-3 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{saveMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
