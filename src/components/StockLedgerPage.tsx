import { NavigationBar } from './NavigationBar';
import { Download, Filter, PackageCheck, ArrowRightLeft, Truck, AlertCircle, Calendar, Box } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details' | 'stock-ledger';

interface StockLedgerPageProps {
  onNavigate: (page: DashboardPage) => void;
}

interface LedgerEntry {
  id: string;
  date: string;
  time: string;
  type: 'Receive' | 'Transfer' | 'Deliver' | 'Adjust';
  sku: string;
  product: string;
  quantity: number;
  warehouse: string;
  fromLocation?: string;
  toLocation?: string;
  reference: string;
  operator: string;
  notes?: string;
  runningStock: number;
}

export function StockLedgerPage({ onNavigate }: StockLedgerPageProps) {
  const [, setIsLoggedIn] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterWarehouse, setFilterWarehouse] = useState<string>('all');

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  // Sample ledger entries showing the complete workflow
  const ledgerEntries: LedgerEntry[] = [
    {
      id: 'LED-001',
      date: '11/22/2025',
      time: '09:00 AM',
      type: 'Receive',
      sku: 'STEEL001',
      product: 'Steel',
      quantity: 100,
      warehouse: 'Main Warehouse',
      toLocation: 'Main Store',
      reference: 'WH/IN/0001',
      operator: 'John Doe',
      notes: 'Received from vendor Azure Metals',
      runningStock: 100,
    },
    {
      id: 'LED-002',
      date: '11/22/2025',
      time: '10:30 AM',
      type: 'Transfer',
      sku: 'STEEL001',
      product: 'Steel',
      quantity: 80,
      warehouse: 'Main Warehouse',
      fromLocation: 'Main Store',
      toLocation: 'Production Rack',
      reference: 'WH/TRN/0001',
      operator: 'John Doe',
      notes: 'Internal transfer for production',
      runningStock: 100, // Total stock unchanged
    },
    {
      id: 'LED-003',
      date: '11/22/2025',
      time: '02:15 PM',
      type: 'Deliver',
      sku: 'STEEL001',
      product: 'Steel',
      quantity: -20,
      warehouse: 'Main Warehouse',
      fromLocation: 'Production Rack',
      reference: 'WH/OUT/0001',
      operator: 'Jane Smith',
      notes: 'Delivered finished goods',
      runningStock: 80,
    },
    {
      id: 'LED-004',
      date: '11/22/2025',
      time: '04:45 PM',
      type: 'Adjust',
      sku: 'STEEL001',
      product: 'Steel',
      quantity: -3,
      warehouse: 'Main Warehouse',
      fromLocation: 'Production Rack',
      reference: 'WH/ADJ/0001',
      operator: 'Mike Wilson',
      notes: 'Damaged items - quality control',
      runningStock: 77,
    },
    {
      id: 'LED-005',
      date: '11/21/2025',
      time: '11:00 AM',
      type: 'Receive',
      sku: 'DESK001',
      product: 'Office Desk',
      quantity: 25,
      warehouse: 'North Warehouse',
      toLocation: 'Storage A-01',
      reference: 'WH/IN/0002',
      operator: 'Sarah Johnson',
      notes: 'Received from Azure Interior',
      runningStock: 25,
    },
    {
      id: 'LED-006',
      date: '11/21/2025',
      time: '03:30 PM',
      type: 'Deliver',
      sku: 'DESK001',
      product: 'Office Desk',
      quantity: -10,
      warehouse: 'North Warehouse',
      fromLocation: 'Storage A-01',
      reference: 'WH/OUT/0002',
      operator: 'Robert Brown',
      notes: 'Customer order fulfillment',
      runningStock: 15,
    },
  ];

  const filteredEntries = ledgerEntries.filter((entry) => {
    const typeMatch = filterType === 'all' || entry.type === filterType;
    const warehouseMatch = filterWarehouse === 'all' || entry.warehouse === filterWarehouse;
    return typeMatch && warehouseMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Receive':
        return <PackageCheck className="text-green-600" size={16} />;
      case 'Transfer':
        return <ArrowRightLeft className="text-blue-600" size={16} />;
      case 'Deliver':
        return <Truck className="text-orange-600" size={16} />;
      case 'Adjust':
        return <AlertCircle className="text-red-600" size={16} />;
      default:
        return <Box className="text-slate-600" size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Receive':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Transfer':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Deliver':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Adjust':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="stock-ledger"
        onNavigate={onNavigate}
        pageTitle="Stock Ledger"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <PackageCheck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Received</h3>
                <p className="text-slate-500 text-sm">Inbound</p>
              </div>
            </div>
            <p className="text-slate-900">
              {ledgerEntries.filter((e) => e.type === 'Receive').reduce((sum, e) => sum + e.quantity, 0)} kg
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <ArrowRightLeft className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Transfers</h3>
                <p className="text-slate-500 text-sm">Internal</p>
              </div>
            </div>
            <p className="text-slate-900">{ledgerEntries.filter((e) => e.type === 'Transfer').length} moves</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 rounded-lg p-3">
                <Truck className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Delivered</h3>
                <p className="text-slate-500 text-sm">Outbound</p>
              </div>
            </div>
            <p className="text-slate-900">
              {Math.abs(ledgerEntries.filter((e) => e.type === 'Deliver').reduce((sum, e) => sum + e.quantity, 0))} kg
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Adjustments</h3>
                <p className="text-slate-500 text-sm">Damaged/Loss</p>
              </div>
            </div>
            <p className="text-slate-900">
              {Math.abs(ledgerEntries.filter((e) => e.type === 'Adjust').reduce((sum, e) => sum + e.quantity, 0))} kg
            </p>
          </div>
        </div>

        {/* Stock Ledger Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header with Filters */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-slate-900">Stock Ledger</h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={16} />
                  <span>{filteredEntries.length} transactions</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-2 transition-colors">
                <Download size={18} />
                <span>Export Ledger</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-slate-500" />
                <span className="text-sm text-slate-600">Filters:</span>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Receive">Receive</option>
                <option value="Transfer">Transfer</option>
                <option value="Deliver">Deliver</option>
                <option value="Adjust">Adjust</option>
              </select>

              <select
                value={filterWarehouse}
                onChange={(e) => setFilterWarehouse(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warehouses</option>
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="North Warehouse">North Warehouse</option>
                <option value="South Warehouse">South Warehouse</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Date & Time</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Type</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">SKU</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Product</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Quantity</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Warehouse</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Location</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Running Stock</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Reference</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">
                      <div>{entry.date}</div>
                      <div className="text-sm text-slate-500">{entry.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(entry.type)}
                        <span className={`inline-block px-3 py-1 rounded text-sm border ${getTypeColor(entry.type)}`}>
                          {entry.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-slate-900 text-sm">{entry.sku}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{entry.product}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          entry.quantity > 0
                            ? 'text-green-600'
                            : entry.quantity < 0
                            ? 'text-red-600'
                            : 'text-slate-900'
                        }`}
                      >
                        {entry.quantity > 0 ? '+' : ''}
                        {entry.quantity} kg
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{entry.warehouse}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {entry.type === 'Transfer' ? (
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500">From:</span>
                            <span className="text-slate-900">{entry.fromLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ArrowRightLeft size={12} className="text-blue-500" />
                            <span className="text-slate-500">To:</span>
                            <span className="text-slate-900">{entry.toLocation}</span>
                          </div>
                        </div>
                      ) : entry.toLocation ? (
                        entry.toLocation
                      ) : (
                        entry.fromLocation
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">{entry.runningStock} kg</span>
                        {entry.runningStock < 20 && (
                          <AlertCircle size={14} className="text-red-500" title="Low stock alert" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-slate-600">{entry.reference}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm max-w-xs truncate">{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
