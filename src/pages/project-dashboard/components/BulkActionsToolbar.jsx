import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsToolbar = ({ selectedProjects, onClearSelection, projects }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'export', label: 'Export Projects' },
    { value: 'archive', label: 'Archive Projects' },
    { value: 'duplicate', label: 'Duplicate Projects' },
    { value: 'change-status', label: 'Change Status' },
    { value: 'assign-team', label: 'Assign Team' },
    { value: 'delete', label: 'Delete Projects' }
  ];

  const handleBulkAction = () => {
    if (!bulkAction) return;

    switch (bulkAction) {
      case 'export':
        console.log('Exporting projects:', selectedProjects);
        break;
      case 'archive': console.log('Archiving projects:', selectedProjects);
        break;
      case 'duplicate': console.log('Duplicating projects:', selectedProjects);
        break;
      case 'change-status': console.log('Changing status for projects:', selectedProjects);
        break;
      case 'assign-team': console.log('Assigning team to projects:', selectedProjects);
        break;
      case 'delete':
        setShowConfirmDialog(true);
        return;
      default:
        break;
    }

    // Reset selection after action
    setBulkAction('');
    onClearSelection();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting projects:', selectedProjects);
    setShowConfirmDialog(false);
    setBulkAction('');
    onClearSelection();
  };

  const getSelectedProjectNames = () => {
    return projects
      .filter(project => selectedProjects.includes(project.id))
      .map(project => project.name);
  };

  if (selectedProjects.length === 0) return null;

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedProjects.length} project{selectedProjects.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <Select
                placeholder="Choose action..."
                options={bulkActionOptions}
                value={bulkAction}
                onChange={setBulkAction}
                className="min-w-48"
              />
              
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkAction}
                disabled={!bulkAction}
                iconName="Play"
              >
                Execute
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log('Exporting selected projects');
                  onClearSelection();
                }}
                iconName="Download"
              >
                Export
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log('Archiving selected projects');
                  onClearSelection();
                }}
                iconName="Archive"
              >
                Archive
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden mt-4 flex items-center space-x-2">
          <Select
            placeholder="Choose action..."
            options={bulkActionOptions}
            value={bulkAction}
            onChange={setBulkAction}
            className="flex-1"
          />
          
          <Button
            variant="default"
            size="sm"
            onClick={handleBulkAction}
            disabled={!bulkAction}
            iconName="Play"
          >
            Execute
          </Button>
        </div>

        {/* Selected Projects Preview */}
        {selectedProjects.length <= 5 && (
          <div className="mt-3 pt-3 border-t border-primary/20">
            <div className="flex flex-wrap gap-2">
              {getSelectedProjectNames().map((name, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/20 text-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-foreground mb-6">
              Are you sure you want to delete {selectedProjects.length} project{selectedProjects.length !== 1 ? 's' : ''}? 
              All associated data will be permanently removed.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                iconName="Trash2"
              >
                Delete Projects
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;