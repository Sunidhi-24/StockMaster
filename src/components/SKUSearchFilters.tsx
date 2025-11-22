import { Search, Filter, X, Barcode, Package, Warehouse, Tag } from 'lucide-react';
import { useState } from 'react';

interface SKUSearchFiltersProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  category: string;
  warehouse: string;
  stockStatus: string;
  priceRange: string;
}

export function SKUSearchFilters({ onSearch, onFilterChange }: SKUSearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    warehouse: 'all',
    stockStatus: 'all',
    priceRange: 'all',
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      category: 'all',
      warehouse: 'all',
      stockStatus: 'all',
      priceRange: 'all',
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    if (onSearch) onSearch('');
    if (onFilterChange) onFilterChange(clearedFilters);
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'all').length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by SKU, product name, or barcode..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 border rounded-lg px-4 py-3 transition-colors ${
            showFilters || activeFilterCount > 0
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Filter size={18} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>

        {(searchQuery || activeFilterCount > 0) && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg px-4 py-3 transition-colors"
          >
            <X size={18} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Quick SKU Scan */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-lg p-2">
            <Barcode className="text-blue-600" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-slate-900 text-sm">Quick SKU Search</p>
            <p className="text-slate-600 text-xs">Scan barcode or enter SKU directly</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm transition-colors">
            Scan Barcode
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900">Advanced Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2 text-sm">
                <Tag size={14} />
                <span>Category</span>
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="furniture">Furniture</option>
                <option value="accessories">Accessories</option>
                <option value="raw-material">Raw Material</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            {/* Warehouse Filter */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2 text-sm">
                <Warehouse size={14} />
                <span>Warehouse</span>
              </label>
              <select
                value={filters.warehouse}
                onChange={(e) => handleFilterChange('warehouse', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warehouses</option>
                <option value="main">Main Warehouse</option>
                <option value="north">North Warehouse</option>
                <option value="south">South Warehouse</option>
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2 text-sm">
                <Package size={14} />
                <span>Stock Status</span>
              </label>
              <select
                value={filters.stockStatus}
                onChange={(e) => handleFilterChange('stockStatus', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="critical">Critical Level</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2 text-sm">
                <span>$</span>
                <span>Price Range</span>
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000+">$1000+</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-600">Active filters:</span>
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-2 py-1 text-sm">
                    <Tag size={12} />
                    Category: {filters.category}
                    <button onClick={() => handleFilterChange('category', 'all')} className="hover:text-blue-900">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.warehouse !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-2 py-1 text-sm">
                    <Warehouse size={12} />
                    Warehouse: {filters.warehouse}
                    <button onClick={() => handleFilterChange('warehouse', 'all')} className="hover:text-blue-900">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.stockStatus !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-2 py-1 text-sm">
                    <Package size={12} />
                    Status: {filters.stockStatus}
                    <button onClick={() => handleFilterChange('stockStatus', 'all')} className="hover:text-blue-900">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
