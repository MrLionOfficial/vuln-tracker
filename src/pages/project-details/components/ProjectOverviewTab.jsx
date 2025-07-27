import React from 'react';
import { useProject } from '../../../components/ui/ProjectContextProvider';
import Icon from '../../../components/AppIcon';

const ProjectOverviewTab = () => {
  const { currentProject } = useProject();

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No project selected</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'planning': return 'text-warning bg-warning/10 border-warning/20';
      case 'completed': return 'text-primary bg-primary/10 border-primary/20';
      case 'overdue': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const totalVulnerabilities = Object.values(currentProject.vulnerabilities).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{currentProject.name}</h2>
            <p className="text-muted-foreground">{currentProject.client}</p>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium capitalize ${getStatusColor(currentProject.status)}`}>
            {currentProject.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Type</h3>
            <p className="text-foreground font-medium">{currentProject.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Start Date</h3>
            <p className="text-foreground font-medium">{new Date(currentProject.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">End Date</h3>
            <p className="text-foreground font-medium">{new Date(currentProject.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Client & Assessment Details */}
        <div className="space-y-6">
          {/* Client Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Building" size={20} className="mr-2" />
              Client Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Client Name</label>
                  <p className="text-foreground font-medium mt-1">{currentProject.client}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
                  <p className="text-foreground font-medium mt-1">John Smith</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Document Version</label>
                  <p className="text-foreground font-medium mt-1">v2.1</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submission Date</label>
                  <p className="text-foreground font-medium mt-1">January 15, 2025</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground font-medium mt-1">john.smith@techcorp.com</p>
              </div>
            </div>
          </div>

          {/* Assessment Parameters */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Settings" size={20} className="mr-2" />
              Assessment Parameters
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assessment Type</label>
                  <p className="text-foreground font-medium mt-1">{currentProject.type} Security Assessment</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-foreground font-medium mt-1">External Black Box Testing</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Testing Period</label>
                <p className="text-foreground font-medium mt-1">
                  {new Date(currentProject.startDate).toLocaleDateString()} - {new Date(currentProject.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Methodology</label>
                <p className="text-foreground font-medium mt-1">OWASP Testing Guide v4.0, NIST SP 800-115</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Progress & Team */}
        <div className="space-y-6">
          {/* Project Timeline */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Calendar" size={20} className="mr-2" />
              Project Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">{currentProject.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${currentProject.progress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Days Elapsed:</span>
                  <span className="ml-2 font-medium text-foreground">12</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Days Remaining:</span>
                  <span className="ml-2 font-medium text-foreground">32</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Assignment */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Users" size={20} className="mr-2" />
              Team Assignment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Lead Security Analyst</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Mike Chen</p>
                  <p className="text-sm text-muted-foreground">Penetration Tester</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Alex Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Security Consultant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Activity" size={20} className="mr-2" />
              Status Indicators
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vulnerabilities Found</span>
                <span className="font-medium text-foreground">{totalVulnerabilities}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Checklist Items</span>
                <span className="font-medium text-foreground">45 / 60</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Report Status</span>
                <span className="text-sm font-medium text-warning">Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerability Dashboard */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" />
          Vulnerability Dashboard
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(currentProject.vulnerabilities).map(([severity, count]) => (
            <div key={severity} className={`p-4 rounded-lg border ${getSeverityColor(severity)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize">{severity}</span>
                <Icon name="AlertTriangle" size={16} />
              </div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs opacity-75 mt-1">
                {totalVulnerabilities > 0 ? Math.round((count / totalVulnerabilities) * 100) : 0}% of total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewTab;