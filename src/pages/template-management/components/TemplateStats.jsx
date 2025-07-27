import React from 'react';
import Icon from '../../../components/AppIcon';

const TemplateStats = ({ templates }) => {
  const totalTemplates = templates.length;
  const standardTemplates = templates.filter(t => t.type === 'standard').length;
  const customTemplates = templates.filter(t => t.type === 'custom').length;
  const premiumTemplates = templates.filter(t => t.type === 'premium').length;
  
  const totalUsage = templates.reduce((sum, template) => sum + template.usageCount, 0);
  const avgUsage = totalTemplates > 0 ? Math.round(totalUsage / totalTemplates) : 0;
  
  const recentlyModified = templates.filter(template => {
    const modifiedDate = new Date(template.lastModified);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return modifiedDate > weekAgo;
  }).length;

  const stats = [
    {
      label: 'Total Templates',
      value: totalTemplates,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Standard',
      value: standardTemplates,
      icon: 'Shield',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Custom',
      value: customTemplates,
      icon: 'Settings',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Premium',
      value: premiumTemplates,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Total Usage',
      value: totalUsage,
      icon: 'BarChart3',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Avg. Usage',
      value: avgUsage,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Recently Modified',
      value: recentlyModified,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} size={16} className={stat.color} />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateStats;