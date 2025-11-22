import { NavigationBar } from './NavigationBar';
import { MapPin, Warehouse, Building2 } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location';

interface LocationPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function LocationPage({ onNavigate }: LocationPageProps) {
  const [, setIsLoggedIn] = useState(true);
  const [name, setName] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Mock warehouse data - in a real app, this would come from an API
  const warehouses = [
    { id: '1', name: 'Main Warehouse', code: 'WH01' },
    { id: '2', name: 'North Warehouse', code: 'WH02' },
    { id: '3', name: 'South Warehouse', code: 'WH03' },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Saving location:', { name, shortCode, warehouse });
    setSaveMessage('Saved Successfully');
  };

  const handleCancel = () => {
    setName('');
    setShortCode('');
    setWarehouse('');
    setSaveMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="location"
        onNavigate={onNavigate}
        pageTitle="Location Configuration"
        onLogout={handleLogout}
      />

      <div className="max-w-4xl mx-auto px-6 pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 rounded-lg p-2">
              <MapPin className="text-blue-600" size={20} />
            </div>
            <h1 className="text-slate-900">Location</h1>
          </div>
          <p className="text-slate-600">Configure warehouse locations and storage areas</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-blue-600 mb-2">
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  <span>Name</span>
                </div>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter location name (e.g., Storage Room A)"
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
                placeholder="Enter short code (e.g., LOC-A1)"
              />
            </div>

            {/* Warehouse Dropdown */}
            <div>
              <label htmlFor="warehouse" className="block text-blue-600 mb-2">
                <div className="flex items-center gap-2">
                  <Warehouse size={16} />
                  <span>Warehouse</span>
                </div>
              </label>
              <select
                id="warehouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5em',
                }}
              >
                <option value="" className="bg-white text-slate-400">
                  Select a warehouse
                </option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.id} className="bg-white text-slate-900">
                    {wh.name} ({wh.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 mt-1" size={18} />
                <div>
                  <p className="text-slate-900 text-sm mb-1">Location Management</p>
                  <p className="text-slate-600 text-sm">
                    This holds the multiple locations of warehouses, rooms, etc.
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
