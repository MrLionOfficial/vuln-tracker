import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateSelectionStep = ({ selectedTemplate, onTemplateSelect, onNext }) => {
  const templates = [
    {
      id: 'standard-pentest',
      name: 'Standard Penetration Test Report',
      description: 'Comprehensive vulnerability assessment report with executive summary, methodology, findings, and recommendations.',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      features: ['Executive Summary', 'Methodology', 'Vulnerability Findings', 'Risk Assessment', 'Recommendations'],
      placeholders: 15,
      lastModified: '2025-01-20',
      isPopular: true
    },
    {
      id: 'web-app-assessment',
      name: 'Web Application Security Assessment',
      description: 'Specialized template for web application vulnerability testing with OWASP TOP-10 mapping.',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=400&h=300&fit=crop',
      features: ['OWASP Mapping', 'Code Analysis', 'Authentication Testing', 'Session Management'],
      placeholders: 12,
      lastModified: '2025-01-18',
      isPopular: false
    },
    {
      id: 'network-security',
      name: 'Network Security Assessment',
      description: 'Network infrastructure penetration testing report with detailed host analysis.',
      thumbnail: 'https://images.pixabay.com/photo/2018/05/14/16/54/cyber-3400789_1280.jpg?w=400&h=300&fit=crop',
      features: ['Network Topology', 'Port Scanning', 'Service Analysis', 'Infrastructure Review'],
      placeholders: 10,
      lastModified: '2025-01-15',
      isPopular: false
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance assessment template for SOC2, ISO27001, and other standards.',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
      features: ['Compliance Mapping', 'Control Assessment', 'Gap Analysis', 'Remediation Plan'],
      placeholders: 18,
      lastModified: '2025-01-22',
      isPopular: true
    },
    {
      id: 'mobile-app-security',
      name: 'Mobile Application Security',
      description: 'Mobile app security testing report covering iOS and Android platforms.',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=400&h=300&fit=crop',
      features: ['Platform Analysis', 'API Security', 'Data Storage', 'Runtime Protection'],
      placeholders: 14,
      lastModified: '2025-01-19',
      isPopular: false
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary Only',
      description: 'Concise executive-level report focusing on high-level findings and business impact.',
      thumbnail: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=300&fit=crop',
      features: ['Business Impact', 'Risk Summary', 'Strategic Recommendations', 'Timeline'],
      placeholders: 8,
      lastModified: '2025-01-21',
      isPopular: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Report Template</h2>
        <p className="text-muted-foreground">Choose a template that best fits your assessment type and requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative bg-card border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg
              ${selectedTemplate?.id === template.id 
                ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                : 'border-border hover:border-primary/50'
              }
            `}
            onClick={() => onTemplateSelect(template)}
          >
            {/* Popular Badge */}
            {template.isPopular && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Popular
                </div>
              </div>
            )}

            {/* Template Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Selection Indicator */}
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-3 left-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={12} />
                  <span>{template.placeholders} placeholders</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>Updated {template.lastModified}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Template Option */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Icon name="Plus" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-semibold text-foreground mb-2">Create Custom Template</h3>
        <p className="text-muted-foreground mb-4">
          Start with a blank template or modify an existing one to match your specific requirements
        </p>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Create Custom Template
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {selectedTemplate ? (
            <span>Selected: <strong>{selectedTemplate.name}</strong></span>
          ) : (
            <span>Please select a template to continue</span>
          )}
        </div>
        
        <Button
          variant="default"
          onClick={onNext}
          disabled={!selectedTemplate}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Configuration
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelectionStep;