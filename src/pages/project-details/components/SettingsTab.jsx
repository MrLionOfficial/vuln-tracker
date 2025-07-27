import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsTab = () => {
  const [projectSettings, setProjectSettings] = useState({
    projectName: 'Enterprise Web Application Assessment',
    projectDescription: 'Comprehensive security assessment of the client\'s web application infrastructure',
    priority: 'high',
    category: 'web-application',
    methodology: 'owasp',
    reportTemplate: 'standard',
    autoBackup: true,
    emailNotifications: true,
    slackIntegration: false,
    dataRetention: '365',
    encryptionEnabled: true,
    auditLogging: true
  });

  const [teamSettings, setTeamSettings] = useState({
    leadAnalyst: 'sarah.johnson@company.com',
    teamMembers: ['mike.chen@company.com', 'alex.rodriguez@company.com'],
    clientContact: 'john.smith@techcorp.com',
    escalationContact: 'manager@company.com'
  });

  const [reportSettings, setReportSettings] = useState({
    executiveSummary: true,
    technicalDetails: true,
    riskMatrix: true,
    remediationSteps: true,
    complianceMapping: true,
    appendices: false,
    logoInclude: true,
    confidentialityLevel: 'confidential'
  });

  const [newTeamMember, setNewTeamMember] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  const handleProjectSettingChange = (field, value) => {
    setProjectSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTeamSettingChange = (field, value) => {
    setTeamSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReportSettingChange = (field, value) => {
    setReportSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTeamMember = () => {
    if (newTeamMember && !teamSettings.teamMembers.includes(newTeamMember)) {
      setTeamSettings(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newTeamMember]
      }));
      setNewTeamMember('');
      setShowAddMember(false);
    }
  };

  const handleRemoveTeamMember = (email) => {
    setTeamSettings(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member !== email)
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving project settings:', {
      projectSettings,
      teamSettings,
      reportSettings
    });
    // In a real app, this would save to the backend
  };

  const handleArchiveProject = () => {
    if (confirm('Are you sure you want to archive this project? This action cannot be undone.')) {
      console.log('Archiving project...');
      // In a real app, this would archive the project
    }
  };

  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone and all data will be lost.')) {
      console.log('Deleting project...');
      // In a real app, this would delete the project
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Project Settings</h2>
          <p className="text-muted-foreground">Configure project parameters and team settings</p>
        </div>
        <Button variant="default" onClick={handleSaveSettings}>
          <Icon name="Save" size={16} />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Project Configuration */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Settings" size={20} className="mr-2" />
              Project Configuration
            </h3>
            <div className="space-y-4">
              <Input
                label="Project Name"
                type="text"
                value={projectSettings.projectName}
                onChange={(e) => handleProjectSettingChange('projectName', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Description
                </label>
                <textarea
                  value={projectSettings.projectDescription}
                  onChange={(e) => handleProjectSettingChange('projectDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                  <select
                    value={projectSettings.priority}
                    onChange={(e) => handleProjectSettingChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={projectSettings.category}
                    onChange={(e) => handleProjectSettingChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="web-application">Web Application</option>
                    <option value="network">Network</option>
                    <option value="mobile">Mobile</option>
                    <option value="api">API</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Methodology</label>
                  <select
                    value={projectSettings.methodology}
                    onChange={(e) => handleProjectSettingChange('methodology', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="owasp">OWASP Testing Guide</option>
                    <option value="nist">NIST SP 800-115</option>
                    <option value="ptes">PTES</option>
                    <option value="custom">Custom Methodology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Report Template</label>
                  <select
                    value={projectSettings.reportTemplate}
                    onChange={(e) => handleProjectSettingChange('reportTemplate', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="standard">Standard Template</option>
                    <option value="executive">Executive Template</option>
                    <option value="technical">Technical Template</option>
                    <option value="compliance">Compliance Template</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Team Management */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Users" size={20} className="mr-2" />
              Team Management
            </h3>
            <div className="space-y-4">
              <Input
                label="Lead Analyst"
                type="email"
                value={teamSettings.leadAnalyst}
                onChange={(e) => handleTeamSettingChange('leadAnalyst', e.target.value)}
                required
              />
              <Input
                label="Client Contact"
                type="email"
                value={teamSettings.clientContact}
                onChange={(e) => handleTeamSettingChange('clientContact', e.target.value)}
                required
              />
              <Input
                label="Escalation Contact"
                type="email"
                value={teamSettings.escalationContact}
                onChange={(e) => handleTeamSettingChange('escalationContact', e.target.value)}
              />
              
              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Team Members</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAddMember(true)}
                  >
                    <Icon name="Plus" size={16} />
                    Add Member
                  </Button>
                </div>
                
                {showAddMember && (
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        value={newTeamMember}
                        onChange={(e) => setNewTeamMember(e.target.value)}
                        placeholder="team.member@company.com"
                        className="flex-1"
                      />
                      <Button variant="default" size="sm" onClick={handleAddTeamMember}>
                        Add
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowAddMember(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {teamSettings.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm text-foreground">{member}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveTeamMember(member)}
                      >
                        <Icon name="X" size={16} className="text-error" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Cog" size={20} className="mr-2" />
              System Settings
            </h3>
            <div className="space-y-4">
              <Checkbox
                label="Auto Backup"
                description="Automatically backup project data daily"
                checked={projectSettings.autoBackup}
                onChange={(e) => handleProjectSettingChange('autoBackup', e.target.checked)}
              />
              <Checkbox
                label="Email Notifications"
                description="Send email notifications for important updates"
                checked={projectSettings.emailNotifications}
                onChange={(e) => handleProjectSettingChange('emailNotifications', e.target.checked)}
              />
              <Checkbox
                label="Slack Integration"
                description="Send notifications to Slack channels"
                checked={projectSettings.slackIntegration}
                onChange={(e) => handleProjectSettingChange('slackIntegration', e.target.checked)}
              />
              <Checkbox
                label="Encryption Enabled"
                description="Encrypt sensitive project data"
                checked={projectSettings.encryptionEnabled}
                onChange={(e) => handleProjectSettingChange('encryptionEnabled', e.target.checked)}
              />
              <Checkbox
                label="Audit Logging"
                description="Log all project activities for compliance"
                checked={projectSettings.auditLogging}
                onChange={(e) => handleProjectSettingChange('auditLogging', e.target.checked)}
              />
              <Input
                label="Data Retention (days)"
                type="number"
                value={projectSettings.dataRetention}
                onChange={(e) => handleProjectSettingChange('dataRetention', e.target.value)}
                min="30"
                max="2555"
              />
            </div>
          </div>

          {/* Report Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="FileText" size={20} className="mr-2" />
              Report Settings
            </h3>
            <div className="space-y-4">
              <Checkbox
                label="Executive Summary"
                description="Include executive summary section"
                checked={reportSettings.executiveSummary}
                onChange={(e) => handleReportSettingChange('executiveSummary', e.target.checked)}
              />
              <Checkbox
                label="Technical Details"
                description="Include detailed technical findings"
                checked={reportSettings.technicalDetails}
                onChange={(e) => handleReportSettingChange('technicalDetails', e.target.checked)}
              />
              <Checkbox
                label="Risk Matrix"
                description="Include risk assessment matrix"
                checked={reportSettings.riskMatrix}
                onChange={(e) => handleReportSettingChange('riskMatrix', e.target.checked)}
              />
              <Checkbox
                label="Remediation Steps"
                description="Include step-by-step remediation guide"
                checked={reportSettings.remediationSteps}
                onChange={(e) => handleReportSettingChange('remediationSteps', e.target.checked)}
              />
              <Checkbox
                label="Compliance Mapping"
                description="Map findings to compliance frameworks"
                checked={reportSettings.complianceMapping}
                onChange={(e) => handleReportSettingChange('complianceMapping', e.target.checked)}
              />
              <Checkbox
                label="Include Company Logo"
                description="Add company logo to report header"
                checked={reportSettings.logoInclude}
                onChange={(e) => handleReportSettingChange('logoInclude', e.target.checked)}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confidentiality Level</label>
                <select
                  value={reportSettings.confidentialityLevel}
                  onChange={(e) => handleReportSettingChange('confidentialityLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-error/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-error mb-4 flex items-center">
              <Icon name="AlertTriangle" size={20} className="mr-2" />
              Danger Zone
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Archive Project</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Archive this project to remove it from active projects while preserving data.
                </p>
                <Button variant="warning" size="sm" onClick={handleArchiveProject}>
                  <Icon name="Archive" size={16} />
                  Archive Project
                </Button>
              </div>
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Delete Project</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete this project and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" onClick={handleDeleteProject}>
                  <Icon name="Trash2" size={16} />
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;