import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../components/ui/ProjectContextProvider';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import StatusIndicatorSystem from '../../components/ui/StatusIndicatorSystem';
import ProjectSummaryCards from './components/ProjectSummaryCards';
import ProjectFilters from './components/ProjectFilters';
import ProjectTable from './components/ProjectTable';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const { projects, currentProject, switchProject } = useProject();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  // Mock additional projects for demonstration
  const mockProjects = [
    {
      id: 4,
      name: 'API Security Assessment',
      client: 'DataSafe Corp',
      status: 'planning',
      progress: 25,
      vulnerabilities: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 2
      },
      startDate: '2025-02-15',
      endDate: '2025-03-30',
      type: 'API'
    },
    {
      id: 5,
      name: 'Cloud Infrastructure Review',
      client: 'CloudSecure Inc.',
      status: 'active',
      progress: 45,
      vulnerabilities: {
        critical: 2,
        high: 5,
        medium: 8,
        low: 4
      },
      startDate: '2025-01-20',
      endDate: '2025-02-25',
      type: 'Infrastructure'
    },
    {
      id: 6,
      name: 'E-commerce Platform Assessment',
      client: 'ShopSafe Ltd.',
      status: 'overdue',
      progress: 80,
      vulnerabilities: {
        critical: 1,
        high: 3,
        medium: 6,
        low: 2
      },
      startDate: '2024-12-15',
      endDate: '2025-01-20',
      type: 'Web Application'
    }
  ];

  const allProjects = [...projects, ...mockProjects];

  useEffect(() => {
    setFilteredProjects(allProjects);
  }, []);

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    let filtered = allProjects;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.client.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Apply assessment type filter
    if (filters.assessmentType) {
      filtered = filtered.filter(project => project.type === filters.assessmentType);
    }

    // Apply client filter
    if (filters.client) {
      filtered = filtered.filter(project => project.client === filters.client);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const now = new Date();
      filtered = filtered.filter(project => {
        const startDate = new Date(project.startDate);
        switch (filters.dateRange) {
          case 'this-week':
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            return startDate >= weekStart && startDate <= weekEnd;
          case 'this-month':
            return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
          case 'last-month':
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return startDate.getMonth() === lastMonth.getMonth() && startDate.getFullYear() === lastMonth.getFullYear();
          case 'this-quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const projectQuarter = Math.floor(startDate.getMonth() / 3);
            return projectQuarter === quarter && startDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    setFilteredProjects(filtered);
    setSelectedProjects([]); // Clear selection when filters change
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setFilteredProjects(allProjects);
    setSelectedProjects([]);
  };

  const handleProjectSelect = (projectIds) => {
    setSelectedProjects(projectIds);
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  const handleCreateProject = () => {
    console.log('Creating new project...');
    // Navigate to project creation form or open modal
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage and monitor your vulnerability assessment projects
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <QuickActionToolbar />
              <Button
                variant="default"
                onClick={handleCreateProject}
                iconName="Plus"
                iconPosition="left"
                className="hidden md:flex"
              >
                New Project
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="mb-8">
            <StatusIndicatorSystem compact={true} showDetails={false} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-8 space-y-6">
              {/* Filters */}
              <ProjectFilters
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />

              {/* Bulk Actions */}
              <BulkActionsToolbar
                selectedProjects={selectedProjects}
                onClearSelection={handleClearSelection}
                projects={filteredProjects}
              />

              {/* Projects Table */}
              <ProjectTable
                projects={filteredProjects}
                onProjectSelect={handleProjectSelect}
                selectedProjects={selectedProjects}
              />

              {/* Results Summary */}
              {Object.keys(activeFilters).some(key => activeFilters[key]) && (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Filter" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Showing {filteredProjects.length} of {allProjects.length} projects
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      iconName="X"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-4 space-y-6">
              {/* Summary Cards */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Overview</h3>
                <ProjectSummaryCards projects={allProjects} />
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-success/10 rounded-full">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        Mobile Application Security Review completed
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-warning/10 rounded-full">
                      <Icon name="AlertTriangle" size={14} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        3 critical vulnerabilities found in Enterprise Web Application
                      </p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <Icon name="Plus" size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        New project created: API Security Assessment
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="text-sm font-medium text-foreground">
                      {allProjects.filter(p => {
                        const startDate = new Date(p.startDate);
                        const now = new Date();
                        return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
                      }).length} projects
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(allProjects.reduce((sum, p) => sum + p.progress, 0) / allProjects.length)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Vulnerabilities</span>
                    <span className="text-sm font-medium text-foreground">
                      {allProjects.reduce((total, project) => {
                        return total + Object.values(project.vulnerabilities).reduce((sum, count) => sum + count, 0);
                      }, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;