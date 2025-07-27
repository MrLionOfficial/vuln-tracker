import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentConfigurationStep = ({ selectedTemplate, formData, onFormDataChange, onNext, onPrevious }) => {
  const [activeSection, setActiveSection] = useState('basic');

  const placeholderFields = {
    basic: [
      { key: 'client_name', label: 'Client Name', type: 'text', required: true, placeholder: 'Enter client company name' },
      { key: 'client_contact', label: 'Client Contact', type: 'text', required: true, placeholder: 'Primary contact person' },
      { key: 'assessment_type', label: 'Assessment Type', type: 'select', required: true, options: [
        { value: 'penetration-test', label: 'Penetration Testing' },
        { value: 'vulnerability-assessment', label: 'Vulnerability Assessment' },
        { value: 'security-audit', label: 'Security Audit' },
        { value: 'compliance-review', label: 'Compliance Review' }
      ]},
      { key: 'testing_period', label: 'Testing Period', type: 'text', required: true, placeholder: 'e.g., January 15-25, 2025' },
      { key: 'document_version', label: 'Document Version', type: 'text', required: true, placeholder: 'e.g., v1.0' },
      { key: 'submission_date', label: 'Submission Date', type: 'date', required: true }
    ],
    scope: [
      { key: 'scope_description', label: 'Scope Description', type: 'textarea', required: true, placeholder: 'Describe the assessment scope and boundaries' },
      { key: 'target_systems', label: 'Target Systems', type: 'textarea', required: true, placeholder: 'List target systems, IP ranges, or applications' },
      { key: 'excluded_systems', label: 'Excluded Systems', type: 'textarea', required: false, placeholder: 'Systems or areas excluded from testing' },
      { key: 'testing_methodology', label: 'Testing Methodology', type: 'select', required: true, options: [
        { value: 'owasp', label: 'OWASP Testing Guide' },
        { value: 'nist', label: 'NIST Framework' },
        { value: 'ptes', label: 'PTES (Penetration Testing Execution Standard)' },
        { value: 'custom', label: 'Custom Methodology' }
      ]}
    ],
    findings: [
      { key: 'vulnerability_count', label: 'Total Vulnerabilities', type: 'number', required: true, placeholder: '0' },
      { key: 'critical_count', label: 'Critical Vulnerabilities', type: 'number', required: true, placeholder: '0' },
      { key: 'high_count', label: 'High Vulnerabilities', type: 'number', required: true, placeholder: '0' },
      { key: 'medium_count', label: 'Medium Vulnerabilities', type: 'number', required: true, placeholder: '0' },
      { key: 'low_count', label: 'Low Vulnerabilities', type: 'number', required: true, placeholder: '0' },
      { key: 'overall_risk_rating', label: 'Overall Risk Rating', type: 'select', required: true, options: [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ]}
    ]
  };

  const sections = [
    { id: 'basic', label: 'Basic Information', icon: 'Info' },
    { id: 'scope', label: 'Scope & Methodology', icon: 'Target' },
    { id: 'findings', label: 'Findings Summary', icon: 'AlertTriangle' }
  ];

  const handleInputChange = (key, value) => {
    onFormDataChange({
      ...formData,
      [key]: value
    });
  };

  const getFieldValue = (key) => {
    return formData[key] || '';
  };

  const renderField = (field) => {
    const commonProps = {
      label: field.label,
      required: field.required,
      value: getFieldValue(field.key),
      onChange: (e) => handleInputChange(field.key, e.target.value)
    };

    switch (field.type) {
      case 'select':
        return (
          <Select
            key={field.key}
            {...commonProps}
            options={field.options}
            placeholder={`Select ${field.label.toLowerCase()}`}
            onChange={(value) => handleInputChange(field.key, value)}
            value={getFieldValue(field.key)}
          />
        );
      case 'textarea':
        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-error ml-1">*</span>}
            </label>
            <textarea
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder={field.placeholder}
              value={getFieldValue(field.key)}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              required={field.required}
            />
          </div>
        );
      default:
        return (
          <Input
            key={field.key}
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const validateCurrentSection = () => {
    const currentFields = placeholderFields[activeSection];
    return currentFields.every(field => {
      if (field.required) {
        const value = getFieldValue(field.key);
        return value && value.toString().trim() !== '';
      }
      return true;
    });
  };

  const validateAllSections = () => {
    return Object.keys(placeholderFields).every(sectionKey => {
      return placeholderFields[sectionKey].every(field => {
        if (field.required) {
          const value = getFieldValue(field.key);
          return value && value.toString().trim() !== '';
        }
        return true;
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Configure Report Content</h2>
        <p className="text-muted-foreground">Fill in the template placeholders with your assessment data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Preview */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Eye" size={16} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Template Preview</h3>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm">
              <div className="font-medium text-foreground mb-2">Selected Template:</div>
              <div className="text-muted-foreground">{selectedTemplate?.name}</div>
            </div>
            
            <div className="border border-border rounded p-3 bg-muted/50">
              <div className="text-xs font-mono text-muted-foreground space-y-1">
                <div>Client: <span className="text-primary">${`{client_name}`}</span></div>
                <div>Assessment: <span className="text-primary">${`{assessment_type}`}</span></div>
                <div>Period: <span className="text-primary">${`{testing_period}`}</span></div>
                <div>Vulnerabilities: <span className="text-primary">${`{vulnerability_count}`}</span></div>
                <div>Risk Rating: <span className="text-primary">${`{overall_risk_rating}`}</span></div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <Icon name="Info" size={12} className="inline mr-1" />
              Placeholders will be replaced with your data
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center
                  ${activeSection === section.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={section.icon} size={16} />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-4">
              {placeholderFields[activeSection].map(renderField)}
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </div>
            
            <div className="flex space-x-3">
              {activeSection !== 'basic' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
              )}
              
              {activeSection !== 'findings' ? (
                <Button
                  variant="default"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                  disabled={!validateCurrentSection()}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Next Section
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={onNext}
                  disabled={!validateAllSections()}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Review & Generate
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Templates
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {Object.keys(formData).length} of {Object.values(placeholderFields).flat().filter(f => f.required).length} required fields completed
        </div>
      </div>
    </div>
  );
};

export default ContentConfigurationStep;