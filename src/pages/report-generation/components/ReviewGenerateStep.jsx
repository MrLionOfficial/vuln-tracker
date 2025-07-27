import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReviewGenerateStep = ({ selectedTemplate, formData, onPrevious, onGenerate }) => {
  const [generationOptions, setGenerationOptions] = useState({
    format: 'docx',
    theme: 'professional-blue',
    includeExecutiveSummary: true,
    includeMethodology: true,
    includeAppendices: true,
    includeReferences: true,
    watermark: false,
    confidential: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreviewSection, setActivePreviewSection] = useState('executive-summary');

  const formatOptions = [
    { value: 'docx', label: 'Microsoft Word (.docx)' },
    { value: 'pdf', label: 'PDF Document (.pdf)' }
  ];

  const themeOptions = [
    { value: 'professional-blue', label: 'Professional Blue' },
    { value: 'corporate-gray', label: 'Corporate Gray' },
    { value: 'security-red', label: 'Security Red' },
    { value: 'minimal-white', label: 'Minimal White' }
  ];

  const previewSections = [
    { id: 'executive-summary', label: 'Executive Summary', icon: 'FileText' },
    { id: 'methodology', label: 'Methodology', icon: 'Settings' },
    { id: 'findings', label: 'Findings', icon: 'AlertTriangle' },
    { id: 'recommendations', label: 'Recommendations', icon: 'CheckCircle' }
  ];

  const handleOptionChange = (key, value) => {
    setGenerationOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate({
        template: selectedTemplate,
        data: formData,
        options: generationOptions
      });
    }, 3000);
  };

  const getPreviewContent = (sectionId) => {
    const replacePlaceholders = (text) => {
      return text
        .replace(/\$\{client_name\}/g, formData.client_name || '[Client Name]')
        .replace(/\$\{assessment_type\}/g, formData.assessment_type || '[Assessment Type]')
        .replace(/\$\{testing_period\}/g, formData.testing_period || '[Testing Period]')
        .replace(/\$\{vulnerability_count\}/g, formData.vulnerability_count || '[Total Vulnerabilities]')
        .replace(/\$\{overall_risk_rating\}/g, formData.overall_risk_rating || '[Risk Rating]')
        .replace(/\$\{critical_count\}/g, formData.critical_count || '[Critical Count]')
        .replace(/\$\{high_count\}/g, formData.high_count || '[High Count]');
    };

    switch (sectionId) {
      case 'executive-summary':
        return replacePlaceholders(`This report presents the findings of a comprehensive ${formData.assessment_type || 'security assessment'} conducted for ${formData.client_name || '[Client Name]'} during the period of ${formData.testing_period || '[Testing Period]'}.\n\nThe assessment identified a total of ${formData.vulnerability_count || '[Total Vulnerabilities]'} vulnerabilities, with an overall risk rating of ${formData.overall_risk_rating || '[Risk Rating]'}. Immediate attention is required for ${formData.critical_count || '[Critical Count]'} critical and ${formData.high_count || '[High Count]'} high-severity vulnerabilities.`);
      
      case 'methodology':
        return replacePlaceholders(`The security assessment was conducted following industry-standard methodologies including ${formData.testing_methodology || 'OWASP Testing Guide'}.\n\nThe scope of testing included:\n• ${formData.target_systems || 'Target systems and applications'}\n• ${formData.scope_description || 'Comprehensive security evaluation'}\n\nTesting was performed during ${formData.testing_period || '[Testing Period]'} with minimal impact to business operations.`);
      
      case 'findings':
        return replacePlaceholders(`Vulnerability Summary:\n• Critical: ${formData.critical_count || '0'} vulnerabilities\n• High: ${formData.high_count || '0'} vulnerabilities\n• Medium: ${formData.medium_count || '0'} vulnerabilities\n• Low: ${formData.low_count || '0'} vulnerabilities\n\nTotal vulnerabilities identified: ${formData.vulnerability_count || '0'}\nOverall risk rating: ${formData.overall_risk_rating || '[Risk Rating]'}`);
      
      case 'recommendations':
        return replacePlaceholders(`Based on the assessment findings, we recommend ${formData.client_name || '[Client Name]'} prioritize remediation efforts focusing on:\n\n1. Immediate remediation of ${formData.critical_count || '0'} critical vulnerabilities\n2. Address ${formData.high_count || '0'} high-severity issues within 30 days\n3. Implement security controls for medium and low-risk findings\n4. Establish ongoing security monitoring and assessment processes`);
      
      default:
        return 'Preview content not available for this section.';
    }
  };

  const validateData = () => {
    const requiredFields = ['client_name', 'assessment_type', 'testing_period', 'vulnerability_count'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  };

  const validation = validateData();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Generate Report</h2>
        <p className="text-muted-foreground">Review your report content and configure generation options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Preview */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Report Preview</h3>
              <div className="text-sm text-muted-foreground">
                {selectedTemplate?.name}
              </div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {previewSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActivePreviewSection(section.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                    ${activePreviewSection === section.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }
                  `}
                >
                  <Icon name={section.icon} size={14} />
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="bg-background border border-border rounded-lg p-4 min-h-[300px]">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {getPreviewContent(activePreviewSection)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generation Options */}
        <div className="space-y-6">
          {/* Validation Status */}
          {!validation.isValid && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning mb-1">Missing Required Data</h4>
                  <ul className="text-sm text-warning/80 space-y-1">
                    {validation.missingFields.map(field => (
                      <li key={field}>• {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Format Options */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Generation Options</h3>
            
            <Select
              label="Output Format"
              options={formatOptions}
              value={generationOptions.format}
              onChange={(value) => handleOptionChange('format', value)}
            />

            <Select
              label="Report Theme"
              options={themeOptions}
              value={generationOptions.theme}
              onChange={(value) => handleOptionChange('theme', value)}
            />
          </div>

          {/* Content Options */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Content Options</h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Include Executive Summary"
                checked={generationOptions.includeExecutiveSummary}
                onChange={(e) => handleOptionChange('includeExecutiveSummary', e.target.checked)}
              />
              
              <Checkbox
                label="Include Methodology Section"
                checked={generationOptions.includeMethodology}
                onChange={(e) => handleOptionChange('includeMethodology', e.target.checked)}
              />
              
              <Checkbox
                label="Include Appendices"
                checked={generationOptions.includeAppendices}
                onChange={(e) => handleOptionChange('includeAppendices', e.target.checked)}
              />
              
              <Checkbox
                label="Include References"
                checked={generationOptions.includeReferences}
                onChange={(e) => handleOptionChange('includeReferences', e.target.checked)}
              />
            </div>
          </div>

          {/* Security Options */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Security Options</h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Mark as Confidential"
                checked={generationOptions.confidential}
                onChange={(e) => handleOptionChange('confidential', e.target.checked)}
              />
              
              <Checkbox
                label="Add Watermark"
                checked={generationOptions.watermark}
                onChange={(e) => handleOptionChange('watermark', e.target.checked)}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            variant="default"
            fullWidth
            onClick={handleGenerate}
            disabled={!validation.isValid || isGenerating}
            loading={isGenerating}
            iconName={isGenerating ? "Loader" : "Download"}
            iconPosition="left"
          >
            {isGenerating ? 'Generating Report...' : 'Generate Report'}
          </Button>
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
          Back to Configuration
        </Button>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Ready to generate {selectedTemplate?.name}
          </div>
          
          <Button
            variant="outline"
            iconName="Eye"
            iconPosition="left"
          >
            Full Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewGenerateStep;