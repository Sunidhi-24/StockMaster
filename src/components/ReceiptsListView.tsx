import { NavigationBar } from './NavigationBar';
import { Plus, PackageCheck, Barcode } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface ReceiptsListViewProps {
  onNavigate: (page: DashboardPage) => void;
  onSelectReceipt: (receiptId: string) => void;
}

export function ReceiptsListView({ onNavigate, onSelectReceipt }: ReceiptsListViewProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const receipts = [
    {
      id: '0001',
      reference: 'WH/IN/0001',
      from: 'Azure Interior',
      to: 'WH/Stock1',
      contact: 'John Smith',
      scheduleDate: '12/20/2025',
      status: 'Draft',
    },
    {
      id: '0002',
      reference: 'WH/IN/0002',
      from: 'Modern Supplies Co',
      to: 'WH/Stock2',
      contact: 'Sarah Johnson',
      scheduleDate: '12/22/2025',
      status: 'Ready',
    },
    {
      id: '0003',
      reference: 'WH/IN/0003',
      from: 'Office Depot',
      to: 'WH/Stock1',
      contact: 'Mike Wilson',
      scheduleDate: '12/18/2025',
      status: 'Done',
    },
    {
      id: '0004',
      reference: 'WH/IN/0004',
      from: 'Azure Interior',
      to: 'WH/Stock3',
      contact: 'Emily Davis',
      scheduleDate: '12/25/2025',
      status: 'Draft',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-600/20 text-green-500 border-green-600/30';
      case 'Ready':
        return 'bg-blue-600/20 text-blue-500 border-blue-600/30';
      case 'Draft':
        return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
      default:
        return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="receipts"
        onNavigate={onNavigate}
        pageTitle="Incoming Operations"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-lg p-2">
              <PackageCheck className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-slate-900">Receipts</h1>
              <p className="text-sm text-slate-500">Manage incoming inventory operations</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition-colors">
            <Plus size={20} />
            <span>NEW</span>
          </button>
        </div>

        {/* Receipts Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-900">All Receipts</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Barcode size={16} />
                <span>{receipts.length} total receipts</span>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Barcode size={14} />
                      <span>Reference</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">From</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">To</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Contact</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Schedule Date</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {receipts.map((receipt) => (
                  <tr
                    key={receipt.id}
                    onClick={() => onSelectReceipt(receipt.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Barcode className="text-slate-400" size={14} />
                        <span className="text-slate-900 font-mono">{receipt.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{receipt.from}</td>
                    <td className="px-6 py-4 text-slate-600">{receipt.to}</td>
                    <td className="px-6 py-4 text-slate-600">{receipt.contact}</td>
                    <td className="px-6 py-4 text-slate-600">{receipt.scheduleDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusColor(receipt.status)}`}>
                        {receipt.status}
                      </span>
                    </td>
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