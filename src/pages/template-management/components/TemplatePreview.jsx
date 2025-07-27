import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplatePreview = ({ template, isOpen, onClose, onEdit }) => {
  if (!isOpen || !template) return null;

  const renderPreviewContent = (content) => {
    if (!content) return 'No content available';
    
    // Simple markdown-like rendering for preview
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-2xl font-bold text-foreground mb-4 mt-6">
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-semibold text-foreground mb-3 mt-5">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-lg font-medium text-foreground mb-2 mt-4">
              {line.substring(4)}
            </h3>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={index} className="font-semibold text-foreground mb-2">
              {line.substring(2, line.length - 2)}
            </p>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-foreground mb-1 ml-4">
              {line.substring(2)}
            </li>
          );
        }
        if (line.startsWith('---')) {
          return <hr key={index} className="border-border my-4" />;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Handle placeholders with highlighting
        const processedLine = line.replace(/\$\{([^}]+)\}/g, (match, placeholder) => {
          return `<span class="bg-primary/20 text-primary px-1 rounded font-mono text-sm">${match}</span>`;
        });
        
        return (
          <p 
            key={index} 
            className="text-foreground mb-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Icon name="Eye" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Template Preview
              </h2>
              <p className="text-sm text-muted-foreground">
                {template.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => onEdit(template)}
              className="flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Edit Template</span>
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Template Info Bar */}
        <div className="p-4 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  Last modified: {new Date(template.lastModified).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  Used {template.usageCount} times
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={14} className="text-muted-foreground" />
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
            
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Placeholders highlighted in blue
              </span>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-none">
            {/* Document Style Preview */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="prose prose-blue max-w-none">
                {renderPreviewContent(template.content)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} />
                <span>Template ready for report generation</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} />
                <span className="ml-1">Export</span>
              </Button>
              <Button variant="default" size="sm" onClick={() => onEdit(template)}>
                <Icon name="Edit" size={14} />
                <span className="ml-1">Edit Template</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;