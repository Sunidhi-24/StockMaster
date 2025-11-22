import { NavigationBar } from './NavigationBar';
import { ArrowLeft, CheckCircle, Printer, X, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface ReceiptDetailsViewProps {
  receiptId: string;
  onNavigate: (page: DashboardPage) => void;
  onBack: () => void;
}

interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
}

export function ReceiptDetailsView({ receiptId, onNavigate, onBack }: ReceiptDetailsViewProps) {
  const [, setIsLoggedIn] = useState(true);
  const [status, setStatus] = useState<'Draft' | 'Ready' | 'Done'>('Draft');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', code: 'DESK001', name: 'Desk', quantity: 6 },
    { id: '2', code: 'CHAIR001', name: 'Office Chair', quantity: 12 },
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleStatusChange = () => {
    if (status === 'Draft') {
      setStatus('Ready');
    } else if (status === 'Ready') {
      setStatus('Done');
    }
  };

  const handleCancel = () => {
    onBack();
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: String(products.length + 1),
      code: `PROD00${products.length + 1}`,
      name: 'New Product',
      quantity: 1,
    };
    setProducts([...products, newProduct]);
  };

  const reference = `WH/IN/${receiptId.padStart(4, '0')}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="receipts-details"
        onNavigate={onNavigate}
        pageTitle="Receipt Details"
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Receipts</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {status === 'Draft' && (
              <button
                onClick={handleStatusChange}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition-colors"
              >
                <CheckCircle size={18} />
                <span>TODO</span>
              </button>
            )}
            {status === 'Ready' && (
              <button
                onClick={handleStatusChange}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 transition-colors"
              >
                <CheckCircle size={18} />
                <span>Validate</span>
              </button>
            )}
            {status === 'Done' && (
              <button className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg px-6 py-3 transition-colors">
                <Printer size={18} />
                <span>Print</span>
              </button>
            )}
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-6 py-3 transition-colors"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        {/* Status Flow */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'Draft' || status === 'Ready' || status === 'Done'
                    ? 'bg-slate-600 border-slate-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status !== 'Draft' ? <CheckCircle size={20} /> : <span>1</span>}
              </div>
              <span
                className={`${
                  status === 'Draft' || status === 'Ready' || status === 'Done' ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                Draft
              </span>
            </div>

            <ChevronRight className="text-slate-400" size={20} />

            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'Ready' || status === 'Done'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status === 'Done' ? <CheckCircle size={20} /> : <span>2</span>}
              </div>
              <span className={`${status === 'Ready' || status === 'Done' ? 'text-slate-900' : 'text-slate-400'}`}>
                Ready
              </span>
            </div>

            <ChevronRight className="text-slate-400" size={20} />

            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'Done'
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status === 'Done' ? <CheckCircle size={20} /> : <span>3</span>}
              </div>
              <span className={`${status === 'Done' ? 'text-slate-900' : 'text-slate-400'}`}>Done</span>
            </div>
          </div>
        </div>

        {/* Receipt Details Form */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-slate-900 mb-6">Receipt</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Reference */}
            <div>
              <label className="block text-blue-600 mb-2">Reference</label>
              <input
                type="text"
                value={reference}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 font-mono cursor-not-allowed"
              />
            </div>

            {/* Receive From */}
            <div>
              <label className="block text-blue-600 mb-2">Receive From</label>
              <input
                type="text"
                defaultValue="Azure Interior"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter vendor name"
              />
            </div>

            {/* Schedule Date */}
            <div>
              <label className="block text-blue-600 mb-2">Schedule Date</label>
              <input
                type="date"
                defaultValue="2025-12-20"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Responsible */}
            <div>
              <label className="block text-blue-600 mb-2">Responsible</label>
              <input
                type="text"
                value="Admin User"
                readOnly
                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-slate-900">Products</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Product</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Quantity</th>
                  <th className="text-right px-6 py-4 text-blue-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-900">
                      <span className="font-mono text-slate-600">[{product.code}]</span> {product.name}
                    </td>
                    <td className="px-6 py-4 text-slate-900">{product.quantity}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-600 hover:text-red-700 transition-colors">
                        <X size={18} />
                      </button>
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
