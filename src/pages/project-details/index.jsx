import React, { useState } from 'react';
import { useProject } from '../../components/ui/ProjectContextProvider';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import StatusIndicatorSystem from '../../components/ui/StatusIndicatorSystem';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import tab components
import ProjectOverviewTab from './components/ProjectOverviewTab';
import ClientInformationTab from './components/ClientInformationTab';
import ScopeTab from './components/ScopeTab';
import SettingsTab from './components/SettingsTab';
import QuickActionButtons from './components/QuickActionButtons';

const ProjectDetails = () => {
  const { currentProject } = useProject();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      component: ProjectOverviewTab
    },
    {
      id: 'client',
      label: 'Client Information',
      icon: 'Building',
      component: ClientInformationTab
    },
    {
      id: 'scope',
      label: 'Scope',
      icon: 'Target',
      component: ScopeTab
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      component: SettingsTab
    }
  ];

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component || ProjectOverviewTab;

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NavigationBreadcrumbs />
        
        <div className="pt-32 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Icon name="FolderOpen" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No Project Selected</h2>
                <p className="text-muted-foreground mb-6">
                  Please select a project from the dashboard to view details.
                </p>
                <Button variant="default" onClick={() => window.history.back()}>
                  <Icon name="ArrowLeft" size={16} />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Details</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive project management and configuration
              </p>
            </div>
            
            {/* Status Indicator - Compact */}
            <div className="hidden lg:block">
              <StatusIndicatorSystem compact={true} showDetails={false} />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-1 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <ActiveTabComponent />
            </div>
          </div>

          {/* Quick Actions - Only show on overview tab */}
          {activeTab === 'overview' && (
            <div className="mb-6">
              <QuickActionButtons />
            </div>
          )}

          {/* Mobile Status Indicator */}
          <div className="lg:hidden">
            <StatusIndicatorSystem compact={false} showDetails={true} />
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <QuickActionToolbar />
    </div>
  );
};

export default ProjectDetails;