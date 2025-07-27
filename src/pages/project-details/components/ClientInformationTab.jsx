import React, { useState } from 'react';
import { useProject } from '../../../components/ui/ProjectContextProvider';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ClientInformationTab = () => {
  const { currentProject } = useProject();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clientName: currentProject?.client || '',
    contactPerson: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100\nNew York, NY 10001',
    documentVersion: 'v2.1',
    submissionDate: '2025-01-15',
    projectScope: `Web application security assessment including:\n• Authentication and authorization testing\n• Input validation and injection testing\n• Session management review\n• Business logic testing\n• Client-side security controls`,
    testingPeriod: '44 days',
    deliverables: `• Executive Summary Report\n• Technical Findings Report\n• Remediation Guidelines\n• Risk Assessment Matrix\n• Compliance Mapping (OWASP Top 10)`
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving client information:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      clientName: currentProject?.client || '',
      contactPerson: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, Suite 100\nNew York, NY 10001',
      documentVersion: 'v2.1',
      submissionDate: '2025-01-15',
      projectScope: `Web application security assessment including:\n• Authentication and authorization testing\n• Input validation and injection testing\n• Session management review\n• Business logic testing\n• Client-side security controls`,
      testingPeriod: '44 days',
      deliverables: `• Executive Summary Report\n• Technical Findings Report\n• Remediation Guidelines\n• Risk Assessment Matrix\n• Compliance Mapping (OWASP Top 10)`
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Client Information</h2>
          <p className="text-muted-foreground">Manage client details and project parameters</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <Icon name="X" size={16} />
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave}>
                <Icon name="Save" size={16} />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Icon name="Edit" size={16} />
              Edit Information
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Information */}
        <div className="space-y-6">
          {/* Client Details */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Building" size={20} className="mr-2" />
              Client Details
            </h3>
            <div className="space-y-4">
              <Input
                label="Client Name"
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Contact Person"
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="FileText" size={20} className="mr-2" />
              Document Information
            </h3>
            <div className="space-y-4">
              <Input
                label="Document Version"
                type="text"
                value={formData.documentVersion}
                onChange={(e) => handleInputChange('documentVersion', e.target.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Submission Date"
                type="date"
                value={formData.submissionDate}
                onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Testing Period"
                type="text"
                value={formData.testingPeriod}
                onChange={(e) => handleInputChange('testingPeriod', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., 30 days"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Project Scope & Deliverables */}
        <div className="space-y-6">
          {/* Project Scope */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Target" size={20} className="mr-2" />
              Project Scope
            </h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Scope Description
              </label>
              <textarea
                value={formData.projectScope}
                onChange={(e) => handleInputChange('projectScope', e.target.value)}
                disabled={!isEditing}
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Describe the project scope and testing objectives..."
              />
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Package" size={20} className="mr-2" />
              Deliverables
            </h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expected Deliverables
              </label>
              <textarea
                value={formData.deliverables}
                onChange={(e) => handleInputChange('deliverables', e.target.value)}
                disabled={!isEditing}
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="List the expected deliverables..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2" />
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Project Timeline</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Start: {new Date(currentProject?.startDate || '2025-01-15').toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              End: {new Date(currentProject?.endDate || '2025-02-28').toLocaleDateString()}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Assessment Type</span>
            </div>
            <p className="text-sm text-muted-foreground">{currentProject?.type || 'Web Application'}</p>
            <p className="text-sm text-muted-foreground">External Black Box</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Team Size</span>
            </div>
            <p className="text-sm text-muted-foreground">3 Security Analysts</p>
            <p className="text-sm text-muted-foreground">1 Lead Consultant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInformationTab;