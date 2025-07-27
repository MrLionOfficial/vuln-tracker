import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContextProvider';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const [showMobileActions, setShowMobileActions] = useState(false);

  const getContextualActions = () => {
    const currentPath = location.pathname;
    
    switch (currentPath) {
      case '/project-dashboard':
        return [
          {
            label: 'New Project',
            icon: 'Plus',
            variant: 'default',
            onClick: () => console.log('Create new project')
          },
          {
            label: 'Import Data',
            icon: 'Upload',
            variant: 'outline',
            onClick: () => console.log('Import project data')
          },
          {
            label: 'Export Report',
            icon: 'Download',
            variant: 'outline',
            onClick: () => navigate('/report-generation')
          }
        ];
        
      case '/project-details':
        return [
          {
            label: 'Edit Project',
            icon: 'Edit',
            variant: 'default',
            onClick: () => console.log('Edit project details')
          },
          {
            label: 'Start Assessment',
            icon: 'Play',
            variant: 'success',
            onClick: () => navigate('/vulnerability-management')
          },
          {
            label: 'View Checklist',
            icon: 'CheckSquare',
            variant: 'outline',
            onClick: () => navigate('/checklist-management')
          }
        ];
        
      case '/vulnerability-management':
        return [
          {
            label: 'Add Vulnerability',
            icon: 'AlertTriangle',
            variant: 'default',
            onClick: () => console.log('Add new vulnerability')
          },
          {
            label: 'Bulk Import',
            icon: 'Upload',
            variant: 'outline',
            onClick: () => console.log('Bulk import vulnerabilities')
          },
          {
            label: 'Generate Report',
            icon: 'FileText',
            variant: 'success',
            onClick: () => navigate('/report-generation')
          },
          {
            label: 'View Checklist',
            icon: 'List',
            variant: 'outline',
            onClick: () => navigate('/checklist-management')
          }
        ];
        
      case '/checklist-management':
        return [
          {
            label: 'Add Item',
            icon: 'Plus',
            variant: 'default',
            onClick: () => console.log('Add checklist item')
          },
          {
            label: 'Mark Vulnerability',
            icon: 'AlertCircle',
            variant: 'warning',
            onClick: () => navigate('/vulnerability-management')
          },
          {
            label: 'Export Checklist',
            icon: 'Download',
            variant: 'outline',
            onClick: () => console.log('Export checklist')
          }
        ];
        
      case '/report-generation':
        return [
          {
            label: 'Generate Report',
            icon: 'FileText',
            variant: 'default',
            onClick: () => console.log('Generate new report')
          },
          {
            label: 'Use Template',
            icon: 'Layout',
            variant: 'outline',
            onClick: () => navigate('/template-management')
          },
          {
            label: 'Preview Report',
            icon: 'Eye',
            variant: 'outline',
            onClick: () => console.log('Preview report')
          },
          {
            label: 'Export PDF',
            icon: 'Download',
            variant: 'success',
            onClick: () => console.log('Export as PDF')
          }
        ];
        
      case '/template-management':
        return [
          {
            label: 'New Template',
            icon: 'Plus',
            variant: 'default',
            onClick: () => console.log('Create new template')
          },
          {
            label: 'Import Template',
            icon: 'Upload',
            variant: 'outline',
            onClick: () => console.log('Import template')
          },
          {
            label: 'Generate Report',
            icon: 'FileText',
            variant: 'success',
            onClick: () => navigate('/report-generation')
          }
        ];
        
      default:
        return [];
    }
  };

  const actions = getContextualActions();
  
  if (actions.length === 0) return null;

  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden md:flex items-center space-x-3 bg-card border border-border rounded-lg p-2 shadow-sm">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            size="sm"
            onClick={action.onClick}
            className="flex items-center space-x-2"
          >
            <Icon name={action.icon} size={14} />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Expanded Actions */}
          {showMobileActions && (
            <div className="absolute bottom-16 right-0 space-y-2 animate-slide-in">
              {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-end space-x-2">
                  <div className="bg-card px-3 py-1 rounded-lg shadow-md border border-border">
                    <span className="text-sm font-medium text-foreground">
                      {action.label}
                    </span>
                  </div>
                  <Button
                    variant={action.variant}
                    size="icon"
                    onClick={() => {
                      action.onClick();
                      setShowMobileActions(false);
                    }}
                    className="shadow-lg"
                  >
                    <Icon name={action.icon} size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Main FAB */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowMobileActions(!showMobileActions)}
            className="w-14 h-14 rounded-full shadow-lg"
          >
            <Icon 
              name={showMobileActions ? "X" : "Plus"} 
              size={20} 
            />
          </Button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {showMobileActions && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setShowMobileActions(false)}
        />
      )}
    </>
  );
};

export default QuickActionToolbar;