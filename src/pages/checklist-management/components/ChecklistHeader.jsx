import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ChecklistHeader = ({ 
  checklist, 
  onBulkUpdate, 
  onExport, 
  onAddTestCase,
  teamMembers 
}) => {
  const [bulkStatus, setBulkStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'not_applicable', label: 'Not Applicable' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...checklist?.categories?.map(cat => ({
      value: cat.id,
      label: cat.name
    })) || []
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF' },
    { value: 'excel', label: 'Export as Excel' },
    { value: 'csv', label: 'Export as CSV' }
  ];

  const handleBulkUpdate = () => {
    if (bulkStatus && selectedCategory) {
      onBulkUpdate(selectedCategory, bulkStatus);
      setBulkStatus('');
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'text-success';
    if (progress >= 70) return 'text-primary';
    if (progress >= 40) return 'text-warning';
    return 'text-accent';
  };

  if (!checklist) {
    return (
      <div className="bg-card border-b border-border p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="List" size={32} className="mx-auto mb-3" />
          <p>Select a checklist to get started</p>
        </div>
      </div>
    );
  }

  const progress = Math.round((checklist.completedItems / checklist.totalItems) * 100);

  return (
    <div className="bg-card border-b border-border">
      <div className="p-6">
        {/* Title and Progress */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon
                name={checklist.type === 'owasp' ? 'Shield' : checklist.type === 'nist' ? 'Lock' : 'Settings'}
                size={20}
                className={
                  checklist.type === 'owasp' ? 'text-error' :
                  checklist.type === 'nist' ? 'text-primary' : 'text-accent'
                }
              />
              <h1 className="text-2xl font-bold text-foreground">{checklist.name}</h1>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                checklist.type === 'owasp' ? 'bg-error/10 text-error' :
                checklist.type === 'nist' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
              }`}>
                {checklist.type.toUpperCase()}
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{checklist.description}</p>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className={`font-medium ${getProgressColor(progress)}`}>
                    {progress}% ({checklist.completedItems}/{checklist.totalItems})
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress >= 90 ? 'bg-success' :
                      progress >= 70 ? 'bg-primary' :
                      progress >= 40 ? 'bg-warning' : 'bg-accent'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {/* Status Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-muted-foreground">Passed: {checklist.passedItems}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error rounded-full" />
                  <span className="text-muted-foreground">Failed: {checklist.failedItems}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-warning rounded-full" />
                  <span className="text-muted-foreground">In Progress: {checklist.inProgressItems}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Bulk Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Select
              placeholder="Select category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-48"
            />
            <Select
              placeholder="Set status"
              options={statusOptions}
              value={bulkStatus}
              onChange={setBulkStatus}
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkUpdate}
              disabled={!bulkStatus || !selectedCategory}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Bulk Update
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onAddTestCase}
              iconName="Plus"
              iconPosition="left"
            >
              Add Test Case
            </Button>
            
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {exportOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => onExport(option.value)}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistHeader;