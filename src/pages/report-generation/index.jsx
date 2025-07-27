import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../components/ui/ProjectContextProvider';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import StatusIndicatorSystem from '../../components/ui/StatusIndicatorSystem';
import TemplateSelectionStep from './components/TemplateSelectionStep';
import ContentConfigurationStep from './components/ContentConfigurationStep';
import ReviewGenerateStep from './components/ReviewGenerateStep';
import StepIndicator from './components/StepIndicator';
import ReportGenerationSuccess from './components/ReportGenerationSuccess';
import Icon from '../../components/AppIcon';


const ReportGeneration = () => {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const totalSteps = 3;

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  const handleGenerate = (reportData) => {
    setGeneratedReport(reportData);
    setIsComplete(true);
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setSelectedTemplate(null);
    setFormData({});
    setIsComplete(false);
    setGeneratedReport(null);
  };

  const handleViewReports = () => {
    navigate('/project-dashboard');
  };

  const renderStepContent = () => {
    if (isComplete) {
      return (
        <ReportGenerationSuccess
          reportData={generatedReport}
          onStartNew={handleStartNew}
          onViewReports={handleViewReports}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <TemplateSelectionStep
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <ContentConfigurationStep
            selectedTemplate={selectedTemplate}
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 3:
        return (
          <ReviewGenerateStep
            selectedTemplate={selectedTemplate}
            formData={formData}
            onPrevious={handlePreviousStep}
            onGenerate={handleGenerate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Report Generation</h1>
                  <p className="text-muted-foreground">
                    Create professional vulnerability assessment reports with automated content generation
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <StatusIndicatorSystem compact={true} showDetails={false} />
              <QuickActionToolbar />
            </div>
          </div>

          {/* Project Context */}
          {currentProject && !isComplete && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="FolderOpen" size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="font-medium text-foreground">{currentProject.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentProject.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={14} />
                    <span>{Object.values(currentProject.vulnerabilities).reduce((sum, count) => sum + count, 0)} vulnerabilities</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{currentProject.startDate} - {currentProject.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step Indicator */}
          {!isComplete && (
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          )}

          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-8">
              {renderStepContent()}
            </div>
          </div>

          {/* Help Section */}
          {!isComplete && (
            <div className="mt-8 bg-muted/50 border border-border rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      The report generation wizard guides you through creating professional vulnerability assessment reports.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="text-primary hover:underline">View Template Guide</button>
                      <button className="text-primary hover:underline">Placeholder Reference</button>
                      <button className="text-primary hover:underline">Sample Reports</button>
                      <button className="text-primary hover:underline">Contact Support</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;