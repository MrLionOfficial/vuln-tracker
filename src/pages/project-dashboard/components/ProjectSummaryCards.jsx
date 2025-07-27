import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectSummaryCards = ({ projects }) => {
  const getActiveProjects = () => {
    return projects.filter(project => project.status === 'active').length;
  };

  const getPendingVulnerabilities = () => {
    return projects.reduce((total, project) => {
      return total + Object.values(project.vulnerabilities).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  const getCompletedAssessments = () => {
    return projects.filter(project => project.status === 'completed').length;
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return projects.filter(project => {
      const endDate = new Date(project.endDate);
      return endDate >= today && endDate <= nextWeek && project.status !== 'completed';
    }).length;
  };

  const summaryData = [
    {
      title: 'Active Projects',
      value: getActiveProjects(),
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'Pending Vulnerabilities',
      value: getPendingVulnerabilities(),
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    {
      title: 'Completed Assessments',
      value: getCompletedAssessments(),
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'Upcoming Deadlines',
      value: getUpcomingDeadlines(),
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    }
  ];

  return (
    <div className="space-y-4">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor} transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon name={item.icon} size={20} className={item.color} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </h3>
                <p className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSummaryCards;