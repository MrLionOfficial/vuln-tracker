import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const TemplateEditor = ({ template, onSave, onCancel, isOpen, project_name, client_name, assessment_type, testing_period, document_version, submission_date, total_vulnerabilities, critical_count, high_count, medium_count, low_count, target_domain, ip_addresses, scope_details, vulnerability_table, web_server, tech_stack }) => {
  const [editorContent, setEditorContent] = useState(template?.content || '');
  const [templateName, setTemplateName] = useState(template?.name || '');
  const [templateDescription, setTemplateDescription] = useState(template?.description || '');
  const [selectedSection, setSelectedSection] = useState('header');
  const [showPlaceholderLibrary, setShowPlaceholderLibrary] = useState(false);
  const editorRef = useRef(null);

  const documentStructure = [
  {
    id: 'header',
    name: 'Document Header',
    icon: 'FileText',
    children: [
    { id: 'title', name: 'Title Page', icon: 'Type' },
    { id: 'toc', name: 'Table of Contents', icon: 'List' }]

  },
  {
    id: 'executive',
    name: 'Executive Summary',
    icon: 'Users',
    children: [
    { id: 'overview', name: 'Assessment Overview', icon: 'Eye' },
    { id: 'findings', name: 'Key Findings', icon: 'AlertTriangle' }]

  },
  {
    id: 'methodology',
    name: 'Methodology',
    icon: 'Settings',
    children: [
    { id: 'approach', name: 'Testing Approach', icon: 'Target' },
    { id: 'scope', name: 'Scope Definition', icon: 'Layers' }]

  },
  {
    id: 'vulnerabilities',
    name: 'Vulnerability Details',
    icon: 'Shield',
    children: [
    { id: 'critical', name: 'Critical Issues', icon: 'AlertCircle' },
    { id: 'high', name: 'High Risk Issues', icon: 'AlertTriangle' },
    { id: 'medium', name: 'Medium Risk Issues', icon: 'Info' },
    { id: 'low', name: 'Low Risk Issues', icon: 'CheckCircle' }]

  },
  {
    id: 'recommendations',
    name: 'Recommendations',
    icon: 'Lightbulb',
    children: [
    { id: 'immediate', name: 'Immediate Actions', icon: 'Zap' },
    { id: 'longterm', name: 'Long-term Strategy', icon: 'Calendar' }]

  },
  {
    id: 'appendix',
    name: 'Appendix',
    icon: 'Paperclip',
    children: [
    { id: 'technical', name: 'Technical Details', icon: 'Code' },
    { id: 'references', name: 'References', icon: 'Link' }]

  }];


  const placeholderCategories = [
  {
    name: 'Project Information',
    placeholders: [
    { name: '${project_name}', description: 'Project name' },
    { name: '${project_id}', description: 'Project identifier' },
    { name: '${assessment_type}', description: 'Type of assessment' },
    { name: '${testing_period}', description: 'Testing period dates' },
    { name: '${submission_date}', description: 'Report submission date' }]

  },
  {
    name: 'Client Details',
    placeholders: [
    { name: '${client_name}', description: 'Client organization name' },
    { name: '${client_contact}', description: 'Primary contact person' },
    { name: '${client_email}', description: 'Contact email address' },
    { name: '${document_version}', description: 'Document version number' }]

  },
  {
    name: 'Vulnerability Data',
    placeholders: [
    { name: '${total_vulnerabilities}', description: 'Total vulnerability count' },
    { name: '${critical_count}', description: 'Critical vulnerabilities' },
    { name: '${high_count}', description: 'High severity vulnerabilities' },
    { name: '${medium_count}', description: 'Medium severity vulnerabilities' },
    { name: '${low_count}', description: 'Low severity vulnerabilities' },
    { name: '${vulnerability_table}', description: 'Complete vulnerability table' }]

  },
  {
    name: 'System Information',
    placeholders: [
    { name: '${target_domain}', description: 'Primary target domain' },
    { name: '${ip_addresses}', description: 'Target IP addresses' },
    { name: '${web_server}', description: 'Web server information' },
    { name: '${tech_stack}', description: 'Technology stack details' },
    { name: '${scope_details}', description: 'Assessment scope' }]

  }];


  const sectionTemplates = {
    header: `# ${project_name} Security Assessment Report

**Client:** ${client_name}
**Assessment Type:** ${assessment_type}
**Testing Period:** ${testing_period}
**Document Version:** ${document_version}
**Submission Date:** ${submission_date}

---`,
    executive: `## Executive Summary

This document presents the findings of the security assessment conducted for ${client_name}. The assessment identified ${total_vulnerabilities} security vulnerabilities across the target systems.

### Key Findings:
- **Critical:** ${critical_count} vulnerabilities requiring immediate attention
- **High:** ${high_count} vulnerabilities with significant risk
- **Medium:** ${medium_count} vulnerabilities with moderate risk
- **Low:** ${low_count} vulnerabilities with minimal risk

### Risk Assessment:
The overall security posture requires immediate attention to address critical and high-severity vulnerabilities.`,
    methodology: `## Methodology

### Testing Approach
The security assessment was conducted using a combination of automated tools and manual testing techniques following industry best practices and OWASP guidelines.

### Scope
**Target Domain:** ${target_domain}
**IP Addresses:** ${ip_addresses}
**Assessment Scope:** ${scope_details}

### Testing Timeline
**Start Date:** ${testing_period}
**Duration:** As specified in the engagement`,
    vulnerabilities: `## Vulnerability Details

${vulnerability_table}

### Detailed Findings

The following sections provide detailed information about each identified vulnerability, including:
- Vulnerability description
- Risk assessment
- Proof of concept
- Remediation recommendations`,
    recommendations: `## Recommendations

### Immediate Actions Required
1. Address all critical and high-severity vulnerabilities
2. Implement security patches and updates
3. Review and strengthen access controls

### Long-term Security Strategy
1. Establish regular security assessments
2. Implement security awareness training
3. Deploy continuous monitoring solutions`,
    appendix: `## Appendix

### Technical Details
**Web Server:** ${web_server}
**Technology Stack:** ${tech_stack}

### References
- OWASP Top 10
- NIST Cybersecurity Framework
- Industry security standards`
  };

  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
    if (sectionTemplates[sectionId]) {
      setEditorContent(sectionTemplates[sectionId]);
    }
  };

  const insertPlaceholder = (placeholder) => {
    const textarea = editorRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = editorContent.substring(0, start) + placeholder + editorContent.substring(end);
      setEditorContent(newContent);

      // Set cursor position after inserted placeholder
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + placeholder.length;
        textarea.focus();
      }, 0);
    }
  };

  const handleSave = () => {
    const updatedTemplate = {
      ...template,
      name: templateName,
      description: templateDescription,
      content: editorContent,
      lastModified: new Date().toISOString()
    };
    onSave(updatedTemplate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Icon name="Edit" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {template ? 'Edit Template' : 'Create New Template'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Design and customize your report template
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setShowPlaceholderLibrary(!showPlaceholderLibrary)}
              className="flex items-center space-x-2">

              <Icon name="Code" size={16} />
              <span>Placeholders</span>
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              <Icon name="Save" size={16} />
              <span className="ml-2">Save Template</span>
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              required />

            <Input
              label="Description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Brief description of the template" />

          </div>
        </div>

        {/* Editor Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Document Structure Panel */}
          <div className="w-80 border-r border-border bg-muted/20 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Document Structure</h3>
              <div className="space-y-2">
                {documentStructure.map((section) =>
                <div key={section.id}>
                    <button
                    onClick={() => handleSectionSelect(section.id)}
                    className={`
                        w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors
                        ${selectedSection === section.id ?
                    'bg-primary text-primary-foreground' :
                    'hover:bg-muted text-foreground'}
                      `
                    }>

                      <Icon name={section.icon} size={16} />
                      <span className="font-medium">{section.name}</span>
                    </button>
                    
                    {section.children &&
                  <div className="ml-6 mt-1 space-y-1">
                        {section.children.map((child) =>
                    <button
                      key={child.id}
                      onClick={() => handleSectionSelect(child.id)}
                      className={`
                              w-full flex items-center space-x-2 p-2 rounded text-sm text-left transition-colors
                              ${selectedSection === child.id ?
                      'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}
                            `
                      }>

                            <Icon name={child.icon} size={14} />
                            <span>{child.name}</span>
                          </button>
                    )}
                      </div>
                  }
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border bg-background">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Content Editor</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Type" size={14} />
                  <span>Markdown supported</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                ref={editorRef}
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground font-mono text-sm"
                placeholder="Start typing your template content here...\n\nUse ${placeholder_name} syntax for dynamic content.\nMarkdown formatting is supported." />

            </div>
          </div>

          {/* Placeholder Library Panel */}
          {showPlaceholderLibrary &&
          <div className="w-80 border-l border-border bg-muted/20 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Placeholder Library</h3>
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPlaceholderLibrary(false)}>

                    <Icon name="X" size={16} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {placeholderCategories.map((category, categoryIndex) =>
                <div key={categoryIndex}>
                      <h4 className="font-medium text-foreground mb-2 text-sm">
                        {category.name}
                      </h4>
                      <div className="space-y-1">
                        {category.placeholders.map((placeholder, index) =>
                    <button
                      key={index}
                      onClick={() => insertPlaceholder(placeholder.name)}
                      className="w-full p-2 text-left rounded hover:bg-muted transition-colors group">

                            <div className="font-mono text-sm text-primary group-hover:text-primary-foreground">
                              {placeholder.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {placeholder.description}
                            </div>
                          </button>
                    )}
                      </div>
                    </div>
                )}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default TemplateEditor;