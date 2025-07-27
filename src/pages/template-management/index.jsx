import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ProjectContextProvider from '../../components/ui/ProjectContextProvider';
import TemplateCard from './components/TemplateCard';
import TemplateEditor from './components/TemplateEditor';
import TemplatePreview from './components/TemplatePreview';
import TemplateFilters from './components/TemplateFilters';
import TemplateStats from './components/TemplateStats';

const TemplateManagement = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock templates data
  const mockTemplates = [
    {
      id: 1,
      name: 'Standard Web Application Assessment',
      description: 'Comprehensive template for web application security assessments including OWASP Top 10 coverage',
      type: 'standard',
      category: 'web-app',
      lastModified: '2025-01-25T10:30:00Z',
      usageCount: 24,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      features: ['OWASP Top 10', 'Executive Summary', 'Technical Details', 'Remediation'],
      content: `# \${project_name} Web Application Security Assessment

**Client:** \${client_name}
**Assessment Type:** \${assessment_type}
**Testing Period:** \${testing_period}

## Executive Summary
This document presents the findings of the web application security assessment conducted for \${client_name}.

### Vulnerability Summary
- **Critical:** \${critical_count} vulnerabilities
- **High:** \${high_count} vulnerabilities
- **Medium:** \${medium_count} vulnerabilities
- **Low:** \${low_count} vulnerabilities

## Detailed Findings
\${vulnerability_table}

## Recommendations
Immediate attention is required for critical and high-severity vulnerabilities.`
    },
    {
      id: 2,
      name: 'Network Infrastructure Penetration Test',
      description: 'Template for comprehensive network security assessments and infrastructure testing',
      type: 'standard',
      category: 'network',
      lastModified: '2025-01-24T14:15:00Z',
      usageCount: 18,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      features: ['Network Mapping', 'Port Analysis', 'Service Enumeration', 'Exploitation'],
      content: `# \${project_name} Network Security Assessment

**Target Network:** \${target_domain}
**IP Range:** \${ip_addresses}

## Methodology
Network reconnaissance and vulnerability assessment following industry standards.

## Findings
\${vulnerability_table}

## Network Architecture
**Web Server:** \${web_server}
**Technology Stack:** \${tech_stack}`
    },
    {
      id: 3,
      name: 'Mobile Application Security Review',
      description: 'Specialized template for mobile app security assessments covering iOS and Android platforms',
      type: 'premium',
      category: 'mobile',
      lastModified: '2025-01-23T09:45:00Z',
      usageCount: 12,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      features: ['OWASP Mobile Top 10', 'Static Analysis', 'Dynamic Testing', 'Privacy Assessment'],
      content: `# \${project_name} Mobile Application Security Assessment

**Application:** \${project_name}
**Platform:** iOS/Android
**Version:** \${document_version}

## Mobile Security Testing
Comprehensive security assessment following OWASP Mobile Security Testing Guide.

## Vulnerability Analysis
\${vulnerability_table}

## Privacy and Data Protection
Assessment of data handling and privacy controls.`
    },
    {
      id: 4,
      name: 'Custom Financial Services Template',
      description: 'Tailored template for financial sector compliance and security assessments',
      type: 'custom',
      category: 'compliance',
      lastModified: '2025-01-22T16:20:00Z',
      usageCount: 8,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      features: ['PCI DSS', 'SOX Compliance', 'Risk Assessment', 'Regulatory Framework'],
      content: `# \${project_name} Financial Services Security Assessment

**Institution:** \${client_name}
**Regulatory Framework:** PCI DSS, SOX, GDPR

## Compliance Assessment
Evaluation of security controls against financial industry standards.

## Risk Analysis
\${vulnerability_table}

## Regulatory Recommendations
Specific guidance for financial services compliance.`
    },
    {
      id: 5,
      name: 'Cloud Infrastructure Assessment',
      description: 'Template for cloud security assessments covering AWS, Azure, and GCP environments',
      type: 'standard',
      category: 'infrastructure',
      lastModified: '2025-01-21T11:10:00Z',
      usageCount: 15,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      features: ['Cloud Security', 'IAM Review', 'Configuration Assessment', 'Data Protection'],
      content: `# \${project_name} Cloud Infrastructure Security Assessment

**Cloud Provider:** AWS/Azure/GCP
**Environment:** \${scope_details}

## Cloud Security Posture
Assessment of cloud infrastructure security controls and configurations.

## Identity and Access Management
Review of IAM policies and access controls.

## Findings
\${vulnerability_table}`
    },
    {
      id: 6,
      name: 'API Security Assessment Template',
      description: 'Comprehensive template for REST API and GraphQL security testing',
      type: 'custom',
      category: 'web-app',
      lastModified: '2025-01-20T13:30:00Z',
      usageCount: 21,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      features: ['REST API Testing', 'GraphQL Security', 'Authentication', 'Rate Limiting'],
      content: `# \${project_name} API Security Assessment

**API Endpoints:** \${target_domain}/api
**Authentication:** OAuth 2.0, JWT

## API Security Testing
Comprehensive testing of API endpoints and security controls.

## Authentication and Authorization
Review of API authentication mechanisms.

## Vulnerability Summary
\${vulnerability_table}`
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTemplates(mockTemplates);
      setFilteredTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortTemplates();
  }, [templates, searchQuery, selectedType, selectedCategory, sortBy]);

  const filterAndSortTemplates = () => {
    let filtered = [...templates];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(template => template.type === selectedType);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'usage':
          return b.usageCount - a.usageCount;
        case 'created':
          return new Date(b.lastModified) - new Date(a.lastModified);
        default:
          return 0;
      }
    });

    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate(null);
    setShowEditor(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString(),
      usageCount: 0
    };
    setTemplates(prev => [...prev, duplicatedTemplate]);
  };

  const handleDeleteTemplate = (template) => {
    if (window.confirm(`Are you sure you want to delete "${template.name}"?`)) {
      setTemplates(prev => prev.filter(t => t.id !== template.id));
    }
  };

  const handleSaveTemplate = (updatedTemplate) => {
    if (updatedTemplate.id) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === updatedTemplate.id ? updatedTemplate : t
      ));
    } else {
      // Create new template
      const newTemplate = {
        ...updatedTemplate,
        id: Date.now(),
        type: 'custom',
        category: 'web-app',
        usageCount: 0,
        features: ['Custom Template'],
        thumbnail: null
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('name');
  };

  if (loading) {
    return (
      <ProjectContextProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <NavigationBreadcrumbs />
          <div className="flex items-center justify-center h-96">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Loading templates...</span>
            </div>
          </div>
        </div>
      </ProjectContextProvider>
    );
  }

  return (
    <ProjectContextProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <NavigationBreadcrumbs />
        
        <main className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Template Management
                </h1>
                <p className="text-muted-foreground">
                  Create, customize, and maintain report templates for consistent professional documentation
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-card border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="List" size={16} />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/report-generation')}
                  className="flex items-center space-x-2"
                >
                  <Icon name="FileText" size={16} />
                  <span>Generate Report</span>
                </Button>
                
                <Button
                  variant="default"
                  onClick={handleCreateTemplate}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span>Create New Template</span>
                </Button>
              </div>
            </div>

            {/* Template Statistics */}
            <TemplateStats templates={templates} />

            {/* Filters */}
            <TemplateFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />

            {/* Templates Grid/List */}
            <div className="space-y-6">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="FileText" size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No templates found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery || selectedType !== 'all' || selectedCategory !== 'all' ?'Try adjusting your filters or search terms' :'Get started by creating your first template'
                        }
                      </p>
                      <Button
                        variant="default"
                        onClick={handleCreateTemplate}
                        className="flex items-center space-x-2"
                      >
                        <Icon name="Plus" size={16} />
                        <span>Create Template</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredTemplates.length} of {templates.length} templates
                    </p>
                  </div>
                  
                  <div className={`
                    ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                    }
                  `}>
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onEdit={handleEditTemplate}
                        onPreview={handlePreviewTemplate}
                        onDuplicate={handleDuplicateTemplate}
                        onDelete={handleDeleteTemplate}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Template Editor Modal */}
        <TemplateEditor
          template={selectedTemplate}
          isOpen={showEditor}
          onSave={handleSaveTemplate}
          onCancel={() => {
            setShowEditor(false);
            setSelectedTemplate(null);
          }}
        />

        {/* Template Preview Modal */}
        <TemplatePreview
          template={selectedTemplate}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedTemplate(null);
          }}
          onEdit={handleEditTemplate}
        />

        {/* Quick Action Toolbar */}
        <QuickActionToolbar />
      </div>
    </ProjectContextProvider>
  );
};

export default TemplateManagement;