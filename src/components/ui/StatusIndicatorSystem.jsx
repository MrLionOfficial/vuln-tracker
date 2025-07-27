import React from 'react';
import { useProject } from './ProjectContextProvider';
import Icon from '../AppIcon';

const StatusIndicatorSystem = ({ compact = false, showDetails = true }) => {
  const { currentProject, projects } = useProject();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'high': return 'bg-warning/10 border-warning/20';
      case 'medium': return 'bg-accent/10 border-accent/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'planning': return 'text-warning';
      case 'completed': return 'text-primary';
      case 'overdue': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'planning': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'overdue': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 70) return 'bg-primary';
    if (progress >= 40) return 'bg-warning';
    return 'bg-accent';
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-4">
        {/* Project Status */}
        {currentProject && (
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(currentProject.status)} 
              size={16} 
              className={getStatusColor(currentProject.status)}
            />
            <span className="text-sm font-medium text-foreground">
              {currentProject.progress}%
            </span>
          </div>
        )}

        {/* Vulnerability Count */}
        {currentProject?.vulnerabilities && (
          <div className="flex items-center space-x-3">
            {Object.entries(currentProject.vulnerabilities).map(([severity, count]) => (
              count > 0 && (
                <div key={severity} className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity).replace('text-', 'bg-')}`} />
                  <span className="text-sm font-medium text-foreground">{count}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Project Status */}
      {currentProject && showDetails && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Current Project</h3>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(currentProject.status)} 
                size={16} 
                className={getStatusColor(currentProject.status)}
              />
              <span className={`text-sm font-medium capitalize ${getStatusColor(currentProject.status)}`}>
                {currentProject.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-foreground mb-1">{currentProject.name}</h4>
              <p className="text-sm text-muted-foreground">{currentProject.client}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{currentProject.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(currentProject.progress)}`}
                  style={{ width: `${currentProject.progress}%` }}
                />
              </div>
            </div>

            {/* Vulnerability Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(currentProject.vulnerabilities).map(([severity, count]) => (
                <div 
                  key={severity}
                  className={`p-3 rounded-lg border ${getSeverityBgColor(severity)}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      {severity}
                    </span>
                    <Icon name="AlertTriangle" size={14} className={getSeverityColor(severity)} />
                  </div>
                  <div className="mt-1">
                    <span className={`text-lg font-bold ${getSeverityColor(severity)}`}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Projects Overview */}
      {showDetails && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">All Projects</h3>
          
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(project.status)} 
                    size={16} 
                    className={getStatusColor(project.status)}
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{project.progress}%</div>
                    <div className="text-xs text-muted-foreground">
                      {Object.values(project.vulnerabilities).reduce((sum, count) => sum + count, 0)} issues
                    </div>
                  </div>
                  
                  <div className="w-16 bg-background rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusIndicatorSystem;