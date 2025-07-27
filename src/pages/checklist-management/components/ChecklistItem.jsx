import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ChecklistItem = ({ item, index, onUpdate, onAddNote, onLinkEvidence }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description,
    methodology: item.methodology,
    expectedResult: item.expectedResult
  });

  const statusOptions = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'not_applicable', label: 'Not Applicable' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success bg-success/10 border-success/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      case 'in_progress': return 'text-warning bg-warning/10 border-warning/20';
      case 'not_applicable': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-background border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'in_progress': return 'Clock';
      case 'not_applicable': return 'Minus';
      default: return 'Circle';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ status: newStatus });
  };

  const handleSaveEdit = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        text: newNote.trim(),
        timestamp: new Date().toISOString(),
        author: 'Current User'
      });
      setNewNote('');
      setShowNoteForm(false);
    }
  };

  const handleLinkEvidence = () => {
    // Mock evidence linking - in real app would open modal to select vulnerabilities
    onLinkEvidence({
      type: 'vulnerability',
      id: 'vuln-001',
      title: 'SQL Injection in Login Form'
    });
  };

  return (
    <div className="p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Index */}
        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium text-muted-foreground">
          {index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <h4 className="font-medium text-foreground">{item.title}</h4>
              )}
              
              {item.description && !isEditing && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              {/* Status Selector */}
              <Select
                options={statusOptions}
                value={item.status}
                onChange={handleStatusChange}
                className="w-32"
              />

              {/* Actions */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-3 mb-3">
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
              <Icon name={getStatusIcon(item.status)} size={12} />
              <span>{statusOptions.find(opt => opt.value === item.status)?.label}</span>
            </div>

            {item.assignee && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="User" size={12} />
                <span>{item.assignee}</span>
              </div>
            )}

            {item.lastUpdated && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                {isEditing ? (
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {item.description || 'No description provided'}
                  </p>
                )}
              </div>

              {/* Methodology */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Testing Methodology</label>
                {isEditing ? (
                  <textarea
                    value={editData.methodology}
                    onChange={(e) => setEditData({ ...editData, methodology: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {item.methodology || 'No methodology specified'}
                  </p>
                )}
              </div>

              {/* Expected Result */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Expected Result</label>
                {isEditing ? (
                  <textarea
                    value={editData.expectedResult}
                    onChange={(e) => setEditData({ ...editData, expectedResult: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={2}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {item.expectedResult || 'No expected result specified'}
                  </p>
                )}
              </div>

              {/* Evidence Links */}
              {item.evidenceLinks && item.evidenceLinks.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Linked Evidence</label>
                  <div className="space-y-2">
                    {item.evidenceLinks.map((evidence, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Icon name="Link" size={14} className="text-primary" />
                        <span className="text-sm text-foreground">{evidence.title}</span>
                        <span className="text-xs text-muted-foreground">({evidence.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {item.notes && item.notes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Notes</label>
                  <div className="space-y-2">
                    {item.notes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-md">
                        <p className="text-sm text-foreground">{note.text}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                          <span>{note.author}</span>
                          <span>•</span>
                          <span>{new Date(note.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Note Form */}
              {showNoteForm && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground block">Add Note</label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                    >
                      Add Note
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowNoteForm(false);
                        setNewNote('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSaveEdit}
                      iconName="Save"
                      iconPosition="left"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({
                          title: item.title,
                          description: item.description,
                          methodology: item.methodology,
                          expectedResult: item.expectedResult
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      iconName="Edit"
                      iconPosition="left"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNoteForm(true)}
                      iconName="MessageSquare"
                      iconPosition="left"
                    >
                      Add Note
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLinkEvidence}
                      iconName="Link"
                      iconPosition="left"
                    >
                      Link Evidence
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;