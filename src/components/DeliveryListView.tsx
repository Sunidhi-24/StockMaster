import { NavigationBar } from './NavigationBar';
import { Plus, Truck, Barcode } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface DeliveryListViewProps {
  onNavigate: (page: DashboardPage) => void;
  onSelectDelivery: (deliveryId: string) => void;
}

export function DeliveryListView({ onNavigate, onSelectDelivery }: DeliveryListViewProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const deliveries = [
    {
      id: '0001',
      reference: 'WH/OUT/0001',
      from: 'WH/Stock1',
      to: 'Azure Interior',
      contact: 'John Smith',
      scheduleDate: '12/21/2025',
      status: 'Ready',
    },
    {
      id: '0002',
      reference: 'WH/OUT/0002',
      from: 'WH/Stock1',
      to: 'Modern Supplies Co',
      contact: 'Sarah Johnson',
      scheduleDate: '12/23/2025',
      status: 'Ready',
    },
    {
      id: '0003',
      reference: 'WH/OUT/0003',
      from: 'WH/Stock2',
      to: 'Office Depot',
      contact: 'Mike Wilson',
      scheduleDate: '12/19/2025',
      status: 'Done',
    },
    {
      id: '0004',
      reference: 'WH/OUT/0004',
      from: 'WH/Stock3',
      to: 'Azure Interior',
      contact: 'Emily Davis',
      scheduleDate: '12/26/2025',
      status: 'Waiting',
    },
    {
      id: '0005',
      reference: 'WH/OUT/0005',
      from: 'WH/Stock1',
      to: 'Tech Solutions Inc',
      contact: 'Robert Brown',
      scheduleDate: '12/24/2025',
      status: 'Draft',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-600/20 text-green-500 border-green-600/30';
      case 'Ready':
        return 'bg-blue-600/20 text-blue-500 border-blue-600/30';
      case 'Waiting':
        return 'bg-yellow-600/20 text-yellow-500 border-yellow-600/30';
      case 'Draft':
        return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
      default:
        return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="delivery"
        onNavigate={onNavigate}
        pageTitle="Outgoing Operations"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 rounded-lg p-2">
              <Truck className="text-orange-600" size={24} />
            </div>
            <div>
              <h1 className="text-slate-900">Delivery</h1>
              <p className="text-sm text-slate-500">Manage outgoing inventory operations</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition-colors">
            <Plus size={20} />
            <span>NEW</span>
          </button>
        </div>

        {/* Delivery Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-900">All Deliveries</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Barcode size={16} />
                <span>{deliveries.length} total deliveries</span>
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
                {deliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    onClick={() => onSelectDelivery(delivery.id)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Barcode className="text-slate-400" size={14} />
                        <span className="text-slate-900 font-mono">{delivery.reference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{delivery.from}</td>
                    <td className="px-6 py-4 text-slate-600">{delivery.to}</td>
                    <td className="px-6 py-4 text-slate-600">{delivery.contact}</td>
                    <td className="px-6 py-4 text-slate-600">{delivery.scheduleDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
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