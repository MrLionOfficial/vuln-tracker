import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TemplateFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedType, 
  onTypeChange, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters 
}) => {
  const templateTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'standard', label: 'Standard Templates' },
    { value: 'custom', label: 'Custom Templates' },
    { value: 'premium', label: 'Premium Templates' }
  ];

  const templateCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'network', label: 'Network Security' },
    { value: 'mobile', label: 'Mobile Application' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'compliance', label: 'Compliance' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'modified', label: 'Last Modified' },
    { value: 'usage', label: 'Most Used' },
    { value: 'created', label: 'Recently Created' }
  ];

  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || sortBy !== 'name';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={templateTypes}
            value={selectedType}
            onChange={onTypeChange}
            placeholder="Filter by type"
            className="w-full sm:w-40"
          />
          
          <Select
            options={templateCategories}
            value={selectedCategory}
            onChange={onCategoryChange}
            placeholder="Filter by category"
            className="w-full sm:w-48"
          />
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-full sm:w-40"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center space-x-2"
          >
            <Icon name="X" size={14} />
            <span>Clear Filters</span>
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                Search: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary-foreground"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-sm rounded-md">
                Type: {templateTypes.find(t => t.value === selectedType)?.label}
                <button
                  onClick={() => onTypeChange('all')}
                  className="ml-1 hover:text-accent-foreground"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-sm rounded-md">
                Category: {templateCategories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-1 hover:text-success-foreground"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateFilters;