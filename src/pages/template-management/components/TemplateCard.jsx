import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onEdit, onDuplicate, onDelete, onPreview }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUsageColor = (count) => {
    if (count >= 10) return 'text-success';
    if (count >= 5) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Template Preview */}
      <div className="relative mb-4">
        <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
          {template.thumbnail ? (
            <Image
              src={template.thumbnail}
              alt={`${template.name} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="FileText" size={32} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Quick Actions Overlay */}
        <div className={`
          absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center space-x-2 transition-opacity duration-200
          ${showActions ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPreview(template)}
            className="bg-white/90 text-foreground hover:bg-white"
          >
            <Icon name="Eye" size={14} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(template)}
            className="bg-white/90 text-foreground hover:bg-white"
          >
            <Icon name="Edit" size={14} />
          </Button>
        </div>

        {/* Template Type Badge */}
        <div className="absolute top-2 right-2">
          <span className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${template.type === 'standard' ? 'bg-primary/10 text-primary' : ''}
            ${template.type === 'custom' ? 'bg-accent/10 text-accent' : ''}
            ${template.type === 'premium' ? 'bg-warning/10 text-warning' : ''}
          `}>
            {template.type}
          </span>
        </div>
      </div>

      {/* Template Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {template.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Template Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {formatDate(template.lastModified)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BarChart3" size={14} className="text-muted-foreground" />
              <span className={`font-medium ${getUsageColor(template.usageCount)}`}>
                {template.usageCount} uses
              </span>
            </div>
          </div>
        </div>

        {/* Template Features */}
        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
              +{template.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(template)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Copy" size={14} />
              <span className="ml-1">Duplicate</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(template)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Edit" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(template)}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;