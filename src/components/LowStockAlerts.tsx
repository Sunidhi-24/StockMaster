import { AlertCircle, X, Package, TrendingDown, Warehouse } from 'lucide-react';
import { useState } from 'react';

interface LowStockItem {
  id: string;
  sku: string;
  product: string;
  currentStock: number;
  reorderPoint: number;
  warehouse: string;
  location: string;
  category: string;
  percentageOfMin: number;
}

interface LowStockAlertsProps {
  onClose?: () => void;
  onNavigateToStock?: () => void;
}

export function LowStockAlerts({ onClose, onNavigateToStock }: LowStockAlertsProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const lowStockItems: LowStockItem[] = [
    {
      id: '1',
      sku: 'CHAIR002',
      product: 'Office Chair',
      currentStock: 8,
      reorderPoint: 15,
      warehouse: 'Main Warehouse',
      location: 'A-02',
      category: 'Furniture',
      percentageOfMin: 53,
    },
    {
      id: '2',
      sku: 'LAMP004',
      product: 'Desk Lamp',
      currentStock: 5,
      reorderPoint: 8,
      warehouse: 'North Warehouse',
      location: 'C-01',
      category: 'Accessories',
      percentageOfMin: 63,
    },
    {
      id: '3',
      sku: 'STEEL001',
      product: 'Steel',
      currentStock: 77,
      reorderPoint: 100,
      warehouse: 'Main Warehouse',
      location: 'Production Rack',
      category: 'Raw Material',
      percentageOfMin: 77,
    },
  ];

  const visibleAlerts = lowStockItems.filter((item) => !dismissed.includes(item.id));

  const handleDismiss = (id: string) => {
    setDismissed([...dismissed, id]);
  };

  const getSeverityColor = (percentage: number) => {
    if (percentage < 50) return 'bg-red-100 border-red-300 text-red-800';
    if (percentage < 75) return 'bg-orange-100 border-orange-300 text-orange-800';
    return 'bg-yellow-100 border-yellow-300 text-yellow-800';
  };

  const getSeverityIcon = (percentage: number) => {
    if (percentage < 50) return 'text-red-600';
    if (percentage < 75) return 'text-orange-600';
    return 'text-yellow-600';
  };

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-50 border-b border-red-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 rounded-lg p-2">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div>
              <h3 className="text-red-900">Low Stock Alerts</h3>
              <p className="text-red-700 text-sm">{visibleAlerts.length} items need attention</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-700 transition-colors"
              aria-label="Close alerts"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Alert List */}
      <div className="divide-y divide-slate-200">
        {visibleAlerts.map((item) => (
          <div key={item.id} className={`p-6 ${getSeverityColor(item.percentageOfMin)} border-l-4`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className={getSeverityIcon(item.percentageOfMin)} size={20} />
                  <div>
                    <h4 className="text-slate-900">{item.product}</h4>
                    <p className="text-sm text-slate-600 font-mono">SKU: {item.sku}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-600">Current Stock</p>
                      <p className="text-slate-900">
                        {item.currentStock} units
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={14} className="text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-600">Reorder Point</p>
                      <p className="text-slate-900">{item.reorderPoint} units</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Warehouse size={14} className="text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-600">Location</p>
                      <p className="text-slate-900">
                        {item.warehouse} - {item.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            item.percentageOfMin < 50
                              ? 'bg-red-500'
                              : item.percentageOfMin < 75
                              ? 'bg-orange-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${item.percentageOfMin}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-700">{item.percentageOfMin}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      item.percentageOfMin < 50
                        ? 'bg-red-200 text-red-900'
                        : item.percentageOfMin < 75
                        ? 'bg-orange-200 text-orange-900'
                        : 'bg-yellow-200 text-yellow-900'
                    }`}
                  >
                    {item.percentageOfMin < 50
                      ? 'Critical'
                      : item.percentageOfMin < 75
                      ? 'Warning'
                      : 'Low'}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-600">Reorder recommended</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={onNavigateToStock}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  Reorder
                </button>
                <button
                  onClick={() => handleDismiss(item.id)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      {onNavigateToStock && (
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onNavigateToStock}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg py-2 transition-colors"
          >
            View All Stock Items
          </button>
        </div>
      )}
    </div>
  );
}
