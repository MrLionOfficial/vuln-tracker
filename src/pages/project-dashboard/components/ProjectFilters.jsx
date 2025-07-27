import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const ProjectFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    status: '',
    assessmentType: '',
    client: '',
    dateRange: '',
    search: ''
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'planning', label: 'Planning' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const assessmentTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Web Application', label: 'Web Application' },
    { value: 'Network', label: 'Network' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'API', label: 'API' },
    { value: 'Infrastructure', label: 'Infrastructure' }
  ];

  const clientOptions = [
    { value: '', label: 'All Clients' },
    { value: 'TechCorp Inc.', label: 'TechCorp Inc.' },
    { value: 'SecureBank Ltd.', label: 'SecureBank Ltd.' },
    { value: 'FinTech Solutions', label: 'FinTech Solutions' },
    { value: 'DataSafe Corp', label: 'DataSafe Corp' },
    { value: 'CloudSecure Inc.', label: 'CloudSecure Inc.' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Dates' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      assessmentType: '',
      client: '',
      dateRange: '',
      search: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Projects</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <Input
            type="search"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Assessment Type Filter */}
        <Select
          placeholder="Filter by type"
          options={assessmentTypeOptions}
          value={filters.assessmentType}
          onChange={(value) => handleFilterChange('assessmentType', value)}
        />

        {/* Client Filter */}
        <Select
          placeholder="Filter by client"
          options={clientOptions}
          value={filters.client}
          onChange={(value) => handleFilterChange('client', value)}
          searchable
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Date Range Filter */}
        <Select
          placeholder="Filter by date range"
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 md:col-span-2 lg:col-span-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;