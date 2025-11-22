import { LayoutDashboard, Package, TrendingUp, History, Settings, LogOut, Search, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details' | 'stock-ledger';

interface NavigationBarProps {
  currentPage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
  pageTitle?: string;
  showSearch?: boolean;
  onLogout?: () => void;
}

export function NavigationBar({ currentPage, onNavigate, pageTitle, showSearch = false, onLogout }: NavigationBarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stock' as const, label: 'Products', icon: TrendingUp },
    { id: 'stock-ledger' as const, label: 'Stock Ledger', icon: History },
  ];

  const isSettingsActive = currentPage === 'settings' || currentPage === 'warehouse' || currentPage === 'location';
  const isOperationsActive = currentPage === 'operations' || currentPage === 'receipts' || currentPage === 'receipts-details' || currentPage === 'delivery' || currentPage === 'delivery-details';

  return (
    <div className="w-full bg-white border-b border-slate-200 mb-8 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-slate-800">Warehouse Manager</h1>
            {pageTitle && <p className="text-sm text-slate-500">{pageTitle}</p>}
          </div>
        </div>

        {/* Search Bar (optional) */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">administrator</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-4 py-2 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        {/* Operations Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              isOperationsActive
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Package size={18} />
            <span>Operations</span>
            <ChevronDown size={16} className={`transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {settingsOpen && (
            <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 rounded-b-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  onNavigate('receipts');
                  setSettingsOpen(false);
                }}
                className={`w-full text-left px-6 py-3 transition-colors ${
                  currentPage === 'receipts' || currentPage === 'receipts-details'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                Receipts
              </button>
              <button
                onClick={() => {
                  onNavigate('delivery');
                  setSettingsOpen(false);
                }}
                className={`w-full text-left px-6 py-3 transition-colors ${
                  currentPage === 'delivery' || currentPage === 'delivery-details'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                Delivery
              </button>
            </div>
          )}
        </div>
        
        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              const settingsDropdown = document.getElementById('settings-dropdown');
              if (settingsDropdown) {
                settingsDropdown.classList.toggle('hidden');
              }
            }}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              isSettingsActive
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
            <ChevronDown size={16} />
          </button>

          {/* Dropdown Menu */}
          <div id="settings-dropdown" className="hidden absolute top-full left-0 mt-0 w-56 bg-white border border-slate-200 rounded-b-lg shadow-lg overflow-hidden z-50">
            <button
              onClick={() => {
                onNavigate('warehouse');
                document.getElementById('settings-dropdown')?.classList.add('hidden');
              }}
              className={`w-full text-left px-6 py-3 transition-colors ${
                currentPage === 'warehouse'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Warehouse
            </button>
            <button
              onClick={() => {
                onNavigate('location');
                document.getElementById('settings-dropdown')?.classList.add('hidden');
              }}
              className={`w-full text-left px-6 py-3 transition-colors ${
                currentPage === 'location'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}