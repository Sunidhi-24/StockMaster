import { NavigationBar } from './NavigationBar';
import { ArrowLeft, CheckCircle, Printer, X, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details';

interface DeliveryDetailsViewProps {
  deliveryId: string;
  onNavigate: (page: DashboardPage) => void;
  onBack: () => void;
}

interface Product {
  id: string;
  code: string;
  name: string;
  quantity: number;
  inStock: boolean;
}

export function DeliveryDetailsView({ deliveryId, onNavigate, onBack }: DeliveryDetailsViewProps) {
  const [, setIsLoggedIn] = useState(true);
  const [status, setStatus] = useState<'Draft' | 'Waiting' | 'Ready' | 'Done'>('Waiting');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', code: 'DESK001', name: 'Desk', quantity: 6, inStock: true },
    { id: '2', code: 'CHAIR001', name: 'Office Chair', quantity: 12, inStock: false },
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleValidate = () => {
    const allInStock = products.every((p) => p.inStock);

    if (status === 'Draft') {
      if (!allInStock) {
        setStatus('Waiting');
      } else {
        setStatus('Ready');
      }
    } else if (status === 'Waiting') {
      if (allInStock) {
        setStatus('Ready');
      }
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
      inStock: true,
    };
    setProducts([...products, newProduct]);
  };

  const reference = `WH/OUT/${deliveryId.padStart(4, '0')}`;
  const hasOutOfStock = products.some((p) => !p.inStock);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="delivery-details"
        onNavigate={onNavigate}
        pageTitle="Delivery Details"
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
              <span>Back to Deliveries</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {status !== 'Done' && (
              <button
                onClick={handleValidate}
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

        {/* Out of Stock Alert */}
        {hasOutOfStock && status !== 'Done' && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-600" size={20} />
              <div>
                <p className="text-red-900">Stock Unavailable</p>
                <p className="text-red-700 text-sm">
                  Some products in this delivery are not currently in stock. Status set to "Waiting".
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Flow */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status !== 'Draft'
                    ? 'bg-slate-600 border-slate-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status !== 'Draft' ? <CheckCircle size={20} /> : <span>1</span>}
              </div>
              <span className={`${status !== 'Draft' ? 'text-slate-900' : 'text-slate-400'} text-sm`}>Draft</span>
            </div>

            <ChevronRight className="text-slate-400" size={20} />

            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'Waiting'
                    ? 'bg-yellow-600 border-yellow-500 text-white'
                    : status === 'Ready' || status === 'Done'
                    ? 'bg-slate-600 border-slate-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status === 'Ready' || status === 'Done' ? <CheckCircle size={20} /> : <span>2</span>}
              </div>
              <span
                className={`${
                  status === 'Waiting' || status === 'Ready' || status === 'Done' ? 'text-slate-900' : 'text-slate-400'
                } text-sm`}
              >
                Waiting
              </span>
            </div>

            <ChevronRight className="text-slate-400" size={20} />

            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  status === 'Ready'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : status === 'Done'
                    ? 'bg-slate-600 border-slate-500 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {status === 'Done' ? <CheckCircle size={20} /> : <span>3</span>}
              </div>
              <span className={`${status === 'Ready' || status === 'Done' ? 'text-slate-900' : 'text-slate-400'} text-sm`}>
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
                {status === 'Done' ? <CheckCircle size={20} /> : <span>4</span>}
              </div>
              <span className={`${status === 'Done' ? 'text-slate-900' : 'text-slate-400'} text-sm`}>Done</span>
            </div>
          </div>
        </div>

        {/* Delivery Details Form */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-slate-900 mb-6">Delivery</h2>

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

            {/* Delivery Address */}
            <div>
              <label className="block text-blue-600 mb-2">Delivery Address</label>
              <input
                type="text"
                defaultValue="Azure Interior - 123 Business Ave"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter delivery address"
              />
            </div>

            {/* Schedule Date */}
            <div>
              <label className="block text-blue-600 mb-2">Schedule Date</label>
              <input
                type="date"
                defaultValue="2025-12-21"
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

            {/* Operation Type */}
            <div className="col-span-2">
              <label className="block text-blue-600 mb-2">Operation Type</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="delivery">Delivery Order</option>
                <option value="transfer">Warehouse Transfer</option>
                <option value="return">Return Order</option>
              </select>
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
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Stock Status</th>
                  <th className="text-right px-6 py-4 text-blue-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`transition-colors ${
                      !product.inStock ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!product.inStock && <AlertCircle className="text-red-600" size={16} />}
                        <span className={!product.inStock ? 'text-red-700' : 'text-slate-900'}>
                          <span className="font-mono text-slate-600">[{product.code}]</span> {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={!product.inStock ? 'text-red-700' : 'text-slate-900'}>{product.quantity}</span>
                    </td>
                    <td className="px-6 py-4">
                      {product.inStock ? (
                        <span className="inline-block px-3 py-1 rounded text-sm bg-green-100 text-green-700 border border-green-200">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded text-sm bg-red-100 text-red-700 border border-red-200">
                          Out of Stock
                        </span>
                      )}
                    </td>
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
