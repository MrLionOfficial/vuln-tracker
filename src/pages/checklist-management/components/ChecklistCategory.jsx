import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ChecklistItem from './ChecklistItem';

const ChecklistCategory = ({ 
  category, 
  onItemUpdate, 
  onAddNote, 
  onLinkEvidence,
  onAddItem,
  isExpanded,
  onToggleExpand
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'failed': return 'text-error';
      case 'in_progress': return 'text-warning';
      case 'not_applicable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'in_progress': return 'Clock';
      case 'not_applicable': return 'Minus';
      default: return 'Circle';
    }
  };

  const categoryProgress = Math.round((category.completedItems / category.totalItems) * 100);

  const handleAddItem = () => {
    if (newItemTitle.trim()) {
      onAddItem(category.id, {
        title: newItemTitle.trim(),
        description: '',
        methodology: '',
        expectedResult: '',
        status: 'not_started'
      });
      setNewItemTitle('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Category Header */}
      <div 
        className="p-4 bg-muted/50 border-b border-border cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon
              name={isExpanded ? "ChevronDown" : "ChevronRight"}
              size={16}
              className="text-muted-foreground"
            />
            <div>
              <h3 className="font-semibold text-foreground">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress */}
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {categoryProgress}% Complete
              </div>
              <div className="text-xs text-muted-foreground">
                {category.completedItems}/{category.totalItems} items
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-24 bg-background rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  categoryProgress >= 90 ? 'bg-success' :
                  categoryProgress >= 70 ? 'bg-primary' :
                  categoryProgress >= 40 ? 'bg-warning' : 'bg-accent'
                }`}
                style={{ width: `${categoryProgress}%` }}
              />
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              {category.statusCounts && Object.entries(category.statusCounts).map(([status, count]) => (
                count > 0 && (
                  <div key={status} className="flex items-center space-x-1">
                    <Icon
                      name={getStatusIcon(status)}
                      size={12}
                      className={getStatusColor(status)}
                    />
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Content */}
      {isExpanded && (
        <div className="divide-y divide-border">
          {/* Test Items */}
          {category.items.map((item, index) => (
            <ChecklistItem
              key={item.id}
              item={item}
              index={index}
              onUpdate={(updates) => onItemUpdate(category.id, item.id, updates)}
              onAddNote={(note) => onAddNote(category.id, item.id, note)}
              onLinkEvidence={(evidence) => onLinkEvidence(category.id, item.id, evidence)}
            />
          ))}

          {/* Add New Item Form */}
          {showAddForm && (
            <div className="p-4 bg-muted/30">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Enter test case title..."
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  autoFocus
                />
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddItem}
                  disabled={!newItemTitle.trim()}
                >
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewItemTitle('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Add Item Button */}
          {!showAddForm && (
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(true)}
                iconName="Plus"
                iconPosition="left"
                className="w-full justify-center"
              >
                Add Test Case
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChecklistCategory;