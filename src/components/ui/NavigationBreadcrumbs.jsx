import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContextProvider';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentProject } = useProject();

  const routeConfig = {
    '/project-dashboard': {
      title: 'Dashboard',
      parent: null,
      section: 'Projects'
    },
    '/project-details': {
      title: 'Project Details',
      parent: '/project-dashboard',
      section: 'Projects'
    },
    '/vulnerability-management': {
      title: 'Vulnerability Management',
      parent: null,
      section: 'Assessment'
    },
    '/checklist-management': {
      title: 'Checklist Management',
      parent: '/vulnerability-management',
      section: 'Assessment'
    },
    '/report-generation': {
      title: 'Report Generation',
      parent: null,
      section: 'Reports'
    },
    '/template-management': {
      title: 'Template Management',
      parent: '/report-generation',
      section: 'Reports'
    }
  };

  const currentRoute = routeConfig[location.pathname];
  
  if (!currentRoute) return null;

  const buildBreadcrumbs = () => {
    const breadcrumbs = [];
    let current = currentRoute;
    
    // Build breadcrumb chain
    while (current) {
      breadcrumbs.unshift({
        title: current.title,
        path: Object.keys(routeConfig).find(key => routeConfig[key] === current),
        section: current.section
      });
      
      if (current.parent) {
        current = routeConfig[current.parent];
      } else {
        break;
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm">
            {/* Home */}
            <button
              onClick={() => navigate('/project-dashboard')}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="Home" size={16} />
            </button>
            
            {breadcrumbs.length > 0 && (
              <>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                
                {/* Section */}
                <span className="text-muted-foreground font-medium">
                  {currentRoute.section}
                </span>
                
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.path || index}>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                    
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-foreground font-medium">
                        {breadcrumb.title}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBreadcrumbClick(breadcrumb.path)}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        {breadcrumb.title}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </nav>

          {/* Project Context */}
          {currentProject && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg">
                <Icon name="FolderOpen" size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {currentProject.name}
                </span>
                <div className={`
                  w-2 h-2 rounded-full
                  ${currentProject.status === 'active' ? 'bg-success' : ''}
                  ${currentProject.status === 'planning' ? 'bg-warning' : ''}
                  ${currentProject.status === 'completed' ? 'bg-primary' : ''}
                  ${currentProject.status === 'overdue' ? 'bg-error' : ''}
                `} />
              </div>
              
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBreadcrumbs;