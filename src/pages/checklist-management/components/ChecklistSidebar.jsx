import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ChecklistSidebar = ({ 
  checklists, 
  activeChecklist, 
  onChecklistSelect, 
  onCreateChecklist 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || checklist.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'owasp': return 'Shield';
      case 'nist': return 'Lock';
      case 'custom': return 'Settings';
      default: return 'List';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'owasp': return 'text-error';
      case 'nist': return 'text-primary';
      case 'custom': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Checklists</h2>
          <Button
            variant="default"
            size="sm"
            onClick={onCreateChecklist}
            iconName="Plus"
            iconPosition="left"
          >
            New
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search checklists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'owasp', label: 'OWASP' },
            { key: 'nist', label: 'NIST' },
            { key: 'custom', label: 'Custom' }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredChecklists.map(checklist => (
            <div
              key={checklist.id}
              onClick={() => onChecklistSelect(checklist)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeChecklist?.id === checklist.id
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={getTypeIcon(checklist.type)}
                  size={16}
                  className={getTypeColor(checklist.type)}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm truncate">
                    {checklist.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {checklist.description}
                  </p>
                  
                  {/* Progress */}
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {checklist.completedItems}/{checklist.totalItems}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${(checklist.completedItems / checklist.totalItems) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-3 mt-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-muted-foreground">{checklist.passedItems}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-error rounded-full" />
                      <span className="text-muted-foreground">{checklist.failedItems}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <span className="text-muted-foreground">{checklist.inProgressItems}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChecklists.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No checklists found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistSidebar;