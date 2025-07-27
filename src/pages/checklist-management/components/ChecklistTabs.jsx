import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChecklistTabs = ({ 
  activeChecklists, 
  currentChecklistId, 
  onTabChange, 
  onCloseTab,
  onNewChecklist 
}) => {
  if (activeChecklists.length === 0) {
    return (
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={onNewChecklist}
            iconName="Plus"
            iconPosition="left"
          >
            Open Checklist
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center overflow-x-auto">
        {activeChecklists.map((checklist) => (
          <div
            key={checklist.id}
            className={`flex items-center space-x-2 px-4 py-3 border-r border-border cursor-pointer transition-colors min-w-0 ${
              currentChecklistId === checklist.id
                ? 'bg-primary/10 border-b-2 border-b-primary' :'hover:bg-muted'
            }`}
            onClick={() => onTabChange(checklist.id)}
          >
            <Icon
              name={
                checklist.type === 'owasp' ? 'Shield' :
                checklist.type === 'nist' ? 'Lock' : 'Settings'
              }
              size={14}
              className={
                checklist.type === 'owasp' ? 'text-error' :
                checklist.type === 'nist' ? 'text-primary' : 'text-accent'
              }
            />
            <span className="text-sm font-medium text-foreground truncate max-w-32">
              {checklist.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(checklist.id);
              }}
              className="p-1 hover:bg-muted-foreground/20 rounded-full transition-colors"
            >
              <Icon name="X" size={12} className="text-muted-foreground" />
            </button>
          </div>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewChecklist}
          className="ml-2"
          iconName="Plus"
        />
      </div>
    </div>
  );
};

export default ChecklistTabs;