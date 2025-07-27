import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectTable = ({ projects, onProjectSelect, selectedProjects }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
      case 'critical': return 'bg-error text-white';
      case 'high': return 'bg-warning text-white';
      case 'medium': return 'bg-accent text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 70) return 'bg-primary';
    if (progress >= 40) return 'bg-warning';
    return 'bg-accent';
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = React.useMemo(() => {
    if (!sortConfig.key) return projects;

    return [...projects].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'vulnerabilities') {
        aValue = Object.values(a.vulnerabilities).reduce((sum, count) => sum + count, 0);
        bValue = Object.values(b.vulnerabilities).reduce((sum, count) => sum + count, 0);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [projects, sortConfig]);

  const handleProjectClick = (projectId) => {
    navigate('/project-details', { state: { projectId } });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onProjectSelect(projects.map(p => p.id));
    } else {
      onProjectSelect([]);
    }
  };

  const isAllSelected = selectedProjects.length === projects.length && projects.length > 0;
  const isIndeterminate = selectedProjects.length > 0 && selectedProjects.length < projects.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Project Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('client')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Client</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Type</th>
              <th className="text-left p-4 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('startDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Start Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                <button
                  onClick={() => handleSort('progress')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Progress</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Vulnerabilities</th>
              <th className="text-center p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr key={project.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onProjectSelect([...selectedProjects, project.id]);
                      } else {
                        onProjectSelect(selectedProjects.filter(id => id !== project.id));
                      }
                    }}
                  />
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="text-left hover:text-primary transition-colors"
                  >
                    <div className="font-medium text-foreground">{project.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {project.id}</div>
                  </button>
                </td>
                <td className="p-4">
                  <div className="text-foreground">{project.client}</div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                    {project.type}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border capitalize ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-foreground">{new Date(project.startDate).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(project.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    {Object.entries(project.vulnerabilities).map(([severity, count]) => (
                      count > 0 && (
                        <span
                          key={severity}
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getSeverityColor(severity)}`}
                          title={`${count} ${severity} vulnerabilities`}
                        >
                          {count}
                        </span>
                      )
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleProjectClick(project.id)}
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('Edit project', project.id)}
                      title="Edit Project"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('Duplicate project', project.id)}
                      title="Duplicate Project"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate('/report-generation', { state: { projectId: project.id } })}
                      title="Generate Report"
                    >
                      <Icon name="FileText" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedProjects.map((project) => (
          <div key={project.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onProjectSelect([...selectedProjects, project.id]);
                    } else {
                      onProjectSelect(selectedProjects.filter(id => id !== project.id));
                    }
                  }}
                />
                <div>
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="text-left"
                  >
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </button>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border capitalize ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 text-foreground">{project.type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Progress:</span>
                <span className="ml-2 text-foreground">{project.progress}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {Object.entries(project.vulnerabilities).map(([severity, count]) => (
                  count > 0 && (
                    <span
                      key={severity}
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getSeverityColor(severity)}`}
                      title={`${count} ${severity} vulnerabilities`}
                    >
                      {count}
                    </span>
                  )
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/report-generation', { state: { projectId: project.id } })}
                >
                  <Icon name="FileText" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
          <Button variant="default" iconName="Plus">
            Create New Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;