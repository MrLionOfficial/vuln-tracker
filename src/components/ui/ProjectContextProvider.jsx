import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectContextProvider');
  }
  return context;
};

const ProjectContextProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock projects data - replace with actual API calls
  const mockProjects = [
    {
      id: 1,
      name: 'Enterprise Web Application Assessment',
      client: 'TechCorp Inc.',
      status: 'active',
      progress: 65,
      vulnerabilities: {
        critical: 3,
        high: 8,
        medium: 12,
        low: 5
      },
      startDate: '2025-01-15',
      endDate: '2025-02-28',
      type: 'Web Application'
    },
    {
      id: 2,
      name: 'Network Infrastructure Penetration Test',
      client: 'SecureBank Ltd.',
      status: 'planning',
      progress: 15,
      vulnerabilities: {
        critical: 0,
        high: 2,
        medium: 4,
        low: 1
      },
      startDate: '2025-02-01',
      endDate: '2025-03-15',
      type: 'Network'
    },
    {
      id: 3,
      name: 'Mobile Application Security Review',
      client: 'FinTech Solutions',
      status: 'completed',
      progress: 100,
      vulnerabilities: {
        critical: 1,
        high: 4,
        medium: 7,
        low: 3
      },
      startDate: '2024-12-01',
      endDate: '2025-01-10',
      type: 'Mobile'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setProjects(mockProjects);
    
    // Set first project as current if none selected
    const savedProjectId = localStorage.getItem('currentProjectId');
    if (savedProjectId) {
      const savedProject = mockProjects.find(p => p.id === parseInt(savedProjectId));
      if (savedProject) {
        setCurrentProject(savedProject);
      }
    } else if (mockProjects.length > 0) {
      setCurrentProject(mockProjects[0]);
    }
  }, []);

  const switchProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      localStorage.setItem('currentProjectId', projectId.toString());
    }
  };

  const updateProjectProgress = (projectId, progress) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, progress }
        : project
    ));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(prev => ({ ...prev, progress }));
    }
  };

  const updateVulnerabilityCount = (projectId, severity, count) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            vulnerabilities: {
              ...project.vulnerabilities,
              [severity]: count
            }
          }
        : project
    ));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(prev => ({
        ...prev,
        vulnerabilities: {
          ...prev.vulnerabilities,
          [severity]: count
        }
      }));
    }
  };

  const getProjectStatus = (project) => {
    if (!project) return 'unknown';
    
    const now = new Date();
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    
    if (project.status === 'completed') return 'completed';
    if (now < startDate) return 'planning';
    if (now > endDate) return 'overdue';
    if (project.progress >= 100) return 'completed';
    if (project.progress > 0) return 'active';
    return 'planning';
  };

  const getTotalVulnerabilities = (project) => {
    if (!project?.vulnerabilities) return 0;
    return Object.values(project.vulnerabilities).reduce((sum, count) => sum + count, 0);
  };

  const value = {
    currentProject,
    projects,
    loading,
    switchProject,
    updateProjectProgress,
    updateVulnerabilityCount,
    getProjectStatus,
    getTotalVulnerabilities,
    setLoading
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;