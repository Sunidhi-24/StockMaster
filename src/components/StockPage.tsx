import { NavigationBar } from './NavigationBar';
import { Package, AlertCircle, TrendingUp, Download, Barcode, QrCode, Box, Warehouse } from 'lucide-react';
import { useState } from 'react';
import { LowStockAlerts } from './LowStockAlerts';
import { SKUSearchFilters, FilterOptions } from './SKUSearchFilters';

type DashboardPage = 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details' | 'stock-ledger';

interface StockPageProps {
  onNavigate: (page: DashboardPage) => void;
}

export function StockPage({ onNavigate }: StockPageProps) {
  const [, setIsLoggedIn] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    warehouse: 'all',
    stockStatus: 'all',
    priceRange: 'all',
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
  };

  const stockItems = [
    {
      id: 'DESK001',
      product: 'Desk',
      category: 'Furniture',
      quantity: 25,
      location: 'A-01',
      warehouse: 'Main Warehouse',
      reorderPoint: 10,
      status: 'In Stock',
      lastUpdated: '12/15/2025',
    },
    {
      id: 'CHAIR002',
      product: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      location: 'A-02',
      warehouse: 'Main Warehouse',
      reorderPoint: 15,
      status: 'Low Stock',
      lastUpdated: '12/14/2025',
    },
    {
      id: 'TABLE003',
      product: 'Conference Table',
      category: 'Furniture',
      quantity: 45,
      location: 'B-01',
      warehouse: 'North Warehouse',
      reorderPoint: 20,
      status: 'In Stock',
      lastUpdated: '12/13/2025',
    },
    {
      id: 'LAMP004',
      product: 'Desk Lamp',
      category: 'Accessories',
      quantity: 5,
      location: 'C-01',
      warehouse: 'North Warehouse',
      reorderPoint: 8,
      status: 'Low Stock',
      lastUpdated: '12/12/2025',
    },
    {
      id: 'SHELF005',
      product: 'Bookshelf',
      category: 'Furniture',
      quantity: 30,
      location: 'B-02',
      warehouse: 'South Warehouse',
      reorderPoint: 12,
      status: 'In Stock',
      lastUpdated: '12/11/2025',
    },
    {
      id: 'STEEL001',
      product: 'Steel',
      category: 'Raw Material',
      quantity: 77,
      location: 'Production Rack',
      warehouse: 'Main Warehouse',
      reorderPoint: 100,
      status: 'Low Stock',
      lastUpdated: '11/22/2025',
    },
  ];

  // Filter logic
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filters.category === 'all' || item.category.toLowerCase().includes(filters.category);
    const matchesWarehouse =
      filters.warehouse === 'all' ||
      (filters.warehouse === 'main' && item.warehouse === 'Main Warehouse') ||
      (filters.warehouse === 'north' && item.warehouse === 'North Warehouse') ||
      (filters.warehouse === 'south' && item.warehouse === 'South Warehouse');
    const matchesStatus =
      filters.stockStatus === 'all' ||
      (filters.stockStatus === 'in-stock' && item.status === 'In Stock') ||
      (filters.stockStatus === 'low-stock' && item.status === 'Low Stock') ||
      (filters.stockStatus === 'critical' && item.quantity <= item.reorderPoint * 0.5);

    return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus;
  });

  const totalValue = stockItems.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = stockItems.filter((item) => item.status === 'Low Stock').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Low Stock':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Out of Stock':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <NavigationBar
        currentPage="stock"
        onNavigate={onNavigate}
        pageTitle="Product Inventory"
        showSearch={true}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Low Stock Alerts */}
        {showAlerts && (
          <div className="mb-8">
            <LowStockAlerts
              onClose={() => setShowAlerts(false)}
              onNavigateToStock={() => onNavigate('stock')}
            />
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Items */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Box className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-500 text-sm">Total Items</h3>
                <p className="text-slate-900">{stockItems.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Barcode size={14} />
              <span>SKU Tracked</span>
            </div>
          </div>

          {/* Total Quantity */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 rounded-lg p-3">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-500 text-sm">Total Quantity</h3>
                <p className="text-slate-900">{totalValue} Units</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Warehouse size={14} />
              <span>In Warehouses</span>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 rounded-lg p-3">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-500 text-sm">Low Stock</h3>
                <p className="text-slate-900">{lowStockItems} Items</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-red-500">
              <AlertCircle size={14} />
              <span>Reorder Required</span>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <Package className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-500 text-sm">Categories</h3>
                <p className="text-slate-900">3 Types</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <QrCode size={14} />
              <span>QR Enabled</span>
            </div>
          </div>
        </div>

        {/* SKU Search and Filters */}
        <div className="mb-8">
          <SKUSearchFilters onSearch={setSearchQuery} onFilterChange={setFilters} />
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-900">Product Inventory</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Barcode size={16} />
                <span>Barcode System Active</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-2 transition-colors">
                <QrCode size={18} />
                <span>Scan QR</span>
              </button>
              <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-2 transition-colors">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors">
                <Package size={18} />
                <span>Add Product</span>
              </button>
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
                      <span>Product ID</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Product Name</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Category</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Box size={14} />
                      <span>Quantity</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Warehouse size={14} />
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Reorder Point</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-blue-600 text-sm">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded border border-slate-200">
                          <Barcode className="text-slate-500" size={16} />
                        </div>
                        <span className="text-slate-900">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{item.product}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded text-sm bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`${item.status === 'Low Stock' ? 'text-red-600' : 'text-slate-900'}`}>
                          {item.quantity}
                        </span>
                        <span className="text-slate-500 text-xs">units</span>
                        {/* Stock Level Indicator */}
                        <div className="ml-2">
                          {item.quantity > item.reorderPoint * 2 ? (
                            <div className="flex gap-1">
                              <div className="w-1 h-3 bg-green-500 rounded"></div>
                              <div className="w-1 h-3 bg-green-500 rounded"></div>
                              <div className="w-1 h-3 bg-green-500 rounded"></div>
                            </div>
                          ) : item.quantity > item.reorderPoint ? (
                            <div className="flex gap-1">
                              <div className="w-1 h-3 bg-yellow-500 rounded"></div>
                              <div className="w-1 h-3 bg-yellow-500 rounded"></div>
                              <div className="w-1 h-3 bg-slate-300 rounded"></div>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <div className="w-1 h-3 bg-red-500 rounded"></div>
                              <div className="w-1 h-3 bg-slate-300 rounded"></div>
                              <div className="w-1 h-3 bg-slate-300 rounded"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Warehouse size={14} className="text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">{item.reorderPoint}</span>
                        {item.quantity <= item.reorderPoint && (
                          <AlertCircle size={14} className="text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-3 py-1 rounded text-sm border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.status === 'Low Stock' && (
                          <span className="text-xs text-red-600">
                            ({Math.round((item.quantity / item.reorderPoint) * 100)}% of min)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.lastUpdated}</td>
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