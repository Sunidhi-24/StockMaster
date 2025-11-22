import { NavigationBar } from './NavigationBar';
import { TrendingUp, TrendingDown, Package, AlertCircle, Box, Warehouse, Truck, PackageCheck } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface DashboardPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="dashboard"
        onNavigate={onNavigate}
        pageTitle="Overview"
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Stock */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Box className="text-blue-600" size={24} />
              </div>
              <span className="text-green-600 text-sm">+12.5%</span>
            </div>
            <h3 className="text-slate-500 text-sm mb-1">Total Stock</h3>
            <p className="text-slate-900">1,245 Units</p>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
              <Package size={12} />
              <span>In Warehouse</span>
            </div>
          </div>

          {/* Receipts Today */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <PackageCheck className="text-green-600" size={24} />
              </div>
              <span className="text-green-600 text-sm">+8.2%</span>
            </div>
            <h3 className="text-slate-500 text-sm mb-1">Receipts Today</h3>
            <p className="text-slate-900">45 Units</p>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
              <TrendingUp size={12} />
              <span>Inbound</span>
            </div>
          </div>

          {/* Deliveries Today */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 rounded-lg p-3">
                <Truck className="text-orange-600" size={24} />
              </div>
              <span className="text-orange-600 text-sm">-3.1%</span>
            </div>
            <h3 className="text-slate-500 text-sm mb-1">Deliveries Today</h3>
            <p className="text-slate-900">32 Units</p>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
              <TrendingDown size={12} />
              <span>Outbound</span>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <span className="text-red-600 text-sm">Alert</span>
            </div>
            <h3 className="text-slate-500 text-sm mb-1">Low Stock Items</h3>
            <p className="text-slate-900">3 Items</p>
            <div className="flex items-center gap-1 text-xs text-red-500 mt-2">
              <Warehouse size={12} />
              <span>Action Required</span>
            </div>
          </div>
        </div>

        {/* Operations Summary */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Receipt Operations */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <PackageCheck className="text-green-600" size={20} />
                </div>
                <h2 className="text-slate-900">Receipt Operations</h2>
              </div>
              <button
                onClick={() => onNavigate('receipts')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <p className="text-slate-500 text-sm">Total Receipts</p>
                  <p className="text-slate-900">125 Operations</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm">This Month</p>
                  <p className="text-green-600">+18.3%</p>
                </div>
              </div>

              {/* Recent Receipts */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Box className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Desk</p>
                      <p className="text-slate-500 text-sm">OP-001 • 12/15/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">+25 Units</p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded mt-1 border border-yellow-200">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Box className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Table</p>
                      <p className="text-slate-500 text-sm">OP-003 • 12/14/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">+30 Units</p>
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-1 border border-green-200">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Box className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Chair</p>
                      <p className="text-slate-500 text-sm">OP-005 • 12/13/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">+50 Units</p>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mt-1 border border-blue-200">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Operations */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 rounded-lg p-2">
                  <Truck className="text-orange-600" size={20} />
                </div>
                <h2 className="text-slate-900">Delivery Operations</h2>
              </div>
              <button
                onClick={() => onNavigate('delivery')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <p className="text-slate-500 text-sm">Total Deliveries</p>
                  <p className="text-slate-900">98 Operations</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm">This Month</p>
                  <p className="text-orange-600">+12.7%</p>
                </div>
              </div>

              {/* Recent Deliveries */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Truck className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Table</p>
                      <p className="text-slate-500 text-sm">OP-002 • 12/16/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600">-15 Units</p>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mt-1 border border-blue-200">
                      In Progress
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Truck className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Desk</p>
                      <p className="text-slate-500 text-sm">OP-004 • 12/17/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600">-20 Units</p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded mt-1 border border-yellow-200">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 hover:bg-slate-50 rounded px-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded">
                      <Truck className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <p className="text-slate-900">Chair</p>
                      <p className="text-slate-500 text-sm">OP-006 • 12/12/2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600">-35 Units</p>
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-1 border border-green-200">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-slate-900 mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('operations')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
            >
              New Operation
            </button>
            <button
              onClick={() => onNavigate('stock')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg py-3 transition-colors"
            >
              View Products
            </button>
            <button
              onClick={() => onNavigate('move-history')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg py-3 transition-colors"
            >
              Move History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
