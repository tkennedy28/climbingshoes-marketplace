import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchFilters({ onFiltersChange, currentFilters = {} }) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  
  const [filters, setFilters] = useState({
    search: currentFilters.search || '',
    brand: currentFilters.brand || '',
    sizeUS: currentFilters.sizeUS || '',
    sizeEU: currentFilters.sizeEU || '',
    condition: currentFilters.condition || '',
    type: currentFilters.type || '',
    priceMin: currentFilters.priceMin || '',
    priceMax: currentFilters.priceMax || '',
    gender: currentFilters.gender || '',
    sortBy: currentFilters.sortBy || 'newest'
  });

  // Climbing shoe specific data
  const brands = [
    'La Sportiva', 'Scarpa', 'Five Ten', 'Evolv', 'Black Diamond',
    'Butora', 'Mad Rock', 'Tenaya', 'Ocun', 'Red Chili', 'So iLL', 'Unparallel'
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'likenew', label: 'Like New (worn 1-3x)' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
  ];

  const types = [
    { value: 'aggressive', label: 'Aggressive/Downturned' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'neutral', label: 'Neutral/Flat' },
    { value: 'approach', label: 'Approach' },
    { value: 'kids', label: 'Kids' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // US to EU size conversion for climbing shoes
  const sizesUS = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];
  const sizesEU = ['35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const updatedFilters = { ...filters, search: searchTerm };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Apply filters and notify parent
  const applyFilters = (filtersToApply) => {
    // Remove empty values
    const cleanFilters = Object.entries(filtersToApply).reduce((acc, [key, value]) => {
      if (value && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Update URL query params
    router.push({
      pathname: router.pathname,
      query: cleanFilters
    }, undefined, { shallow: true });

    // Notify parent component
    if (onFiltersChange) {
      onFiltersChange(cleanFilters);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      brand: '',
      sizeUS: '',
      sizeEU: '',
      condition: '',
      type: '',
      priceMin: '',
      priceMax: '',
      gender: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    applyFilters({ sortBy: 'newest' });
  };

  // Count active filters
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'sortBy' && key !== 'search'
  ).length;

  return (
    <div className="bg-white sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="flex gap-4 mb-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for climbing shoes, brands, or models..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Bar - Desktop */}
        <div className="hidden md:flex flex-wrap gap-3 items-center">
          {/* Brand Filter */}
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand.toLowerCase()}>{brand}</option>
            ))}
          </select>

          {/* Size US Filter */}
          <select
            value={filters.sizeUS}
            onChange={(e) => handleFilterChange('sizeUS', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Size (US)</option>
            {sizesUS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          {/* Size EU Filter */}
          <select
            value={filters.sizeEU}
            onChange={(e) => handleFilterChange('sizeEU', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Size (EU)</option>
            {sizesEU.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          {/* Condition Filter */}
          <select
            value={filters.condition}
            onChange={(e) => handleFilterChange('condition', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Conditions</option>
            {conditions.map(condition => (
              <option key={condition.value} value={condition.value}>{condition.label}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* Gender Filter */}
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="mens">Men's</option>
            <option value="womens">Women's</option>
            <option value="unisex">Unisex</option>
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max $"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 transition"
            >
              Clear ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Mobile Filter Panel */}
        {isFilterOpen && (
          <div className="md:hidden mt-4 p-4 border-t space-y-3">
            {/* Mobile filters - same as desktop but stacked */}
            <div className="space-y-3">
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand.toLowerCase()}>{brand}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filters.sizeUS}
                  onChange={(e) => handleFilterChange('sizeUS', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Size (US)</option>
                  {sizesUS.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>

                <select
                  value={filters.sizeEU}
                  onChange={(e) => handleFilterChange('sizeEU', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Size (EU)</option>
                  {sizesEU.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <select
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Conditions</option>
                {conditions.map(condition => (
                  <option key={condition.value} value={condition.value}>{condition.label}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-blue-600 hover:text-blue-800 transition"
                >
                  Clear All Filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || key === 'sortBy' || key === 'search') return null;
            
            let displayValue = value;
            if (key === 'condition') {
              displayValue = conditions.find(c => c.value === value)?.label || value;
            } else if (key === 'type') {
              displayValue = types.find(t => t.value === value)?.label || value;
            } else if (key === 'priceMin') {
              displayValue = `Min: $${value}`;
            } else if (key === 'priceMax') {
              displayValue = `Max: $${value}`;
            }

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {displayValue}
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}