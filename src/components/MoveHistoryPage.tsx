import { NavigationBar } from './NavigationBar';
import { TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface MoveHistoryPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function MoveHistoryPage({ onNavigate }: MoveHistoryPageProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const movements = [
    {
      id: 'MV-001',
      date: '12/15/2025',
      time: '10:30 AM',
      type: 'IN',
      product: 'Desk',
      quantity: 25,
      from: 'Supplier A',
      to: 'WH/Stock1',
      operator: 'John Doe',
      reference: 'PO-2024-001',
    },
    {
      id: 'MV-002',
      date: '12/16/2025',
      time: '02:15 PM',
      type: 'OUT',
      product: 'Table',
      quantity: 15,
      from: 'WH/Stock2',
      to: 'Customer B',
      operator: 'Jane Smith',
      reference: 'SO-2024-045',
    },
    {
      id: 'MV-003',
      date: '12/14/2025',
      time: '09:00 AM',
      type: 'IN',
      product: 'Chair',
      quantity: 50,
      from: 'Supplier C',
      to: 'WH/Stock1',
      operator: 'Mike Wilson',
      reference: 'PO-2024-002',
    },
    {
      id: 'MV-004',
      date: '12/17/2025',
      time: '11:45 AM',
      type: 'OUT',
      product: 'Desk',
      quantity: 20,
      from: 'WH/Stock3',
      to: 'Customer D',
      operator: 'Emily Davis',
      reference: 'SO-2024-046',
    },
    {
      id: 'MV-005',
      date: '12/13/2025',
      time: '03:30 PM',
      type: 'IN',
      product: 'Table',
      quantity: 30,
      from: 'Supplier E',
      to: 'WH/Stock2',
      operator: 'John Doe',
      reference: 'PO-2024-003',
    },
  ];

  const totalInbound = movements.filter((m) => m.type === 'IN').reduce((sum, m) => sum + m.quantity, 0);
  const totalOutbound = movements.filter((m) => m.type === 'OUT').reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="move-history"
        onNavigate={onNavigate}
        pageTitle="Inventory Movements"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Movements */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Total Movements</h3>
                <p className="text-slate-500 text-sm">All transactions</p>
              </div>
            </div>
            <p className="text-slate-900">{movements.length}</p>
          </div>

          {/* Inbound */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Inbound</h3>
                <p className="text-slate-500 text-sm">Received items</p>
              </div>
            </div>
            <p className="text-slate-900">{totalInbound} Units</p>
          </div>

          {/* Outbound */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-orange-100 rounded-lg p-3">
                <TrendingDown className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Outbound</h3>
                <p className="text-slate-500 text-sm">Shipped items</p>
              </div>
            </div>
            <p className="text-slate-900">{totalOutbound} Units</p>
          </div>

          {/* Net Change */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Net Change</h3>
                <p className="text-slate-500 text-sm">Period balance</p>
              </div>
            </div>
            <p className={`${totalInbound - totalOutbound >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {totalInbound - totalOutbound >= 0 ? '+' : ''}
              {totalInbound - totalOutbound} Units
            </p>
          </div>
        </div>

        {/* Movement History Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-slate-900">Movement History</h2>
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-2 transition-colors">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Movement ID</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Date & Time</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Type</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Product</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Quantity</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">From</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">To</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Operator</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {movements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-900">{movement.id}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{movement.date}</div>
                      <div className="text-sm text-slate-500">{movement.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      {movement.type === 'IN' ? (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-green-600" size={16} />
                          <span className="inline-block px-3 py-1 rounded text-sm bg-green-100 text-green-700 border border-green-200">
                            IN
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <TrendingDown className="text-orange-600" size={16} />
                          <span className="inline-block px-3 py-1 rounded text-sm bg-orange-100 text-orange-700 border border-orange-200">
                            OUT
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-900">{movement.product}</td>
                    <td className="px-6 py-4 text-slate-900">{movement.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{movement.from}</td>
                    <td className="px-6 py-4 text-slate-600">{movement.to}</td>
                    <td className="px-6 py-4 text-slate-600">{movement.operator}</td>
                    <td className="px-6 py-4 text-slate-600">{movement.reference}</td>
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
