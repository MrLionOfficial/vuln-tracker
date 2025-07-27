import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Template Selection', icon: 'Layout' },
    { id: 2, label: 'Content Configuration', icon: 'Settings' },
    { id: 3, label: 'Review & Generate', icon: 'FileText' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                  ${currentStep === step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : currentStep > step.id
                    ? 'bg-success border-success text-success-foreground'
                    : 'bg-background border-border text-muted-foreground'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              
              {/* Step Label */}
              <div className="text-center">
                <div
                  className={`
                    text-sm font-medium
                    ${currentStep === step.id
                      ? 'text-primary'
                      : currentStep > step.id
                      ? 'text-success' :'text-muted-foreground'
                    }
                  `}
                >
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  Step {step.id} of {totalSteps}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`
                    h-0.5 transition-all duration-200
                    ${currentStep > step.id
                      ? 'bg-success' :'bg-border'
                    }
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;