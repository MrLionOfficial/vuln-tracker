import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionButtons = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Add Vulnerability',
      icon: 'AlertTriangle',
      variant: 'default',
      description: 'Document a new security vulnerability',
      onClick: () => navigate('/vulnerability-management')
    },
    {
      label: 'Manage Checklists',
      icon: 'CheckSquare',
      variant: 'outline',
      description: 'Update testing checklists and progress',
      onClick: () => navigate('/checklist-management')
    },
    {
      label: 'Generate Report',
      icon: 'FileText',
      variant: 'success',
      description: 'Create assessment report',
      onClick: () => navigate('/report-generation')
    },
    {
      label: 'Archive Project',
      icon: 'Archive',
      variant: 'secondary',
      description: 'Archive completed project',
      onClick: () => console.log('Archive project')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Zap" size={20} className="mr-2" />
        Quick Actions
      </h3>
      
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <div key={index} className="group">
            <Button
              variant={action.variant}
              onClick={action.onClick}
              className="w-full h-auto flex-col space-y-2 p-4"
            >
              <Icon name={action.icon} size={24} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {action.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            className="w-full justify-start space-x-3 p-4"
          >
            <Icon name={action.icon} size={20} />
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs opacity-75">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionButtons;