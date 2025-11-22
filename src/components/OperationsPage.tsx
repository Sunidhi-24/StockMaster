import { NavigationBar } from './NavigationBar';
import { Package, Clock, CheckCircle, Plus, Barcode, Truck, PackageCheck, ClipboardList, ScanLine } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface OperationsPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function OperationsPage({ onNavigate }: OperationsPageProps) {
  const [, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const operations = [
    {
      id: 'OP-001',
      type: 'Receipt',
      product: 'Desk',
      quantity: '25 Units',
      location: 'A-01',
      status: 'Pending',
      priority: 'High',
      date: '12/15/2025',
    },
    {
      id: 'OP-002',
      type: 'Delivery',
      product: 'Table',
      quantity: '15 Units',
      location: 'B-01',
      status: 'In Progress',
      priority: 'Medium',
      date: '12/16/2025',
    },
    {
      id: 'OP-003',
      type: 'Receipt',
      product: 'Table',
      quantity: '30 Units',
      location: 'B-01',
      status: 'Completed',
      priority: 'Low',
      date: '12/14/2025',
    },
    {
      id: 'OP-004',
      type: 'Delivery',
      product: 'Desk',
      quantity: '20 Units',
      location: 'A-01',
      status: 'Pending',
      priority: 'High',
      date: '12/17/2025',
    },
    {
      id: 'OP-005',
      type: 'Receipt',
      product: 'Chair',
      quantity: '50 Units',
      location: 'A-02',
      status: 'In Progress',
      priority: 'Medium',
      date: '12/13/2025',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="operations"
        onNavigate={onNavigate}
        pageTitle="Workflow Management"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Pending Operations */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-100 rounded-lg p-3">
                <ClipboardList className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Pending</h3>
                <p className="text-slate-500 text-sm">Awaiting action</p>
              </div>
            </div>
            <p className="text-slate-900">2 Operations</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <Clock size={12} />
              <span>Needs attention</span>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <ScanLine className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">In Progress</h3>
                <p className="text-slate-500 text-sm">Currently active</p>
              </div>
            </div>
            <p className="text-slate-900">2 Operations</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <Barcode size={12} />
              <span>Being processed</span>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <PackageCheck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Completed</h3>
                <p className="text-slate-500 text-sm">Finished today</p>
              </div>
            </div>
            <p className="text-slate-900">1 Operation</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <CheckCircle size={12} />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Barcode Scanner Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-lg p-4">
                <ScanLine className="text-blue-600" size={32} />
              </div>
              <div>
                <h3 className="text-slate-900 mb-1">Quick Scan Mode</h3>
                <p className="text-slate-600 text-sm">Scan barcodes to quickly process operations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white border border-slate-200 rounded-lg px-6 py-3 flex items-center gap-3">
                <Barcode className="text-slate-400" size={20} />
                <div className="border-l border-slate-200 pl-3">
                  <div className="flex gap-1">
                    <div className="w-1 h-8 bg-slate-300"></div>
                    <div className="w-0.5 h-8 bg-slate-400"></div>
                    <div className="w-1 h-8 bg-slate-300"></div>
                    <div className="w-1.5 h-8 bg-slate-400"></div>
                    <div className="w-0.5 h-8 bg-slate-300"></div>
                    <div className="w-1 h-8 bg-slate-400"></div>
                    <div className="w-1 h-8 bg-slate-300"></div>
                    <div className="w-0.5 h-8 bg-slate-400"></div>
                    <div className="w-1.5 h-8 bg-slate-300"></div>
                  </div>
                </div>
                <span className="text-slate-500 text-sm">Ready to scan...</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition-colors flex items-center gap-2">
                <ScanLine size={18} />
                <span>Start Scanning</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operations Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-900">All Operations</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ScanLine size={16} />
                <span>Real-time tracking</span>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors">
              <Plus size={18} />
              <span>New Operation</span>
            </button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Barcode size={14} />
                      <span>Operation ID</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Type</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Product</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Quantity</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Location</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Priority</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {operations.map((operation) => (
                  <tr key={operation.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Barcode className="text-slate-400" size={14} />
                        <span className="text-slate-900">{operation.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {operation.type === 'Receipt' ? (
                          <PackageCheck size={14} className="text-green-600" />
                        ) : (
                          <Truck size={14} className="text-orange-600" />
                        )}
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm ${
                            operation.type === 'Receipt'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {operation.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{operation.product}</td>
                    <td className="px-6 py-4 text-slate-900">{operation.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{operation.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusColor(operation.status)}`}>
                        {operation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm border ${getPriorityColor(operation.priority)}`}>
                        {operation.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{operation.date}</td>
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
