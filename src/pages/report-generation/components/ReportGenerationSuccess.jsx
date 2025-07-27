import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportGenerationSuccess = ({ reportData, onStartNew, onViewReports }) => {
  const downloadActions = [
    {
      label: 'Download DOCX',
      icon: 'Download',
      variant: 'default',
      onClick: () => console.log('Download DOCX')
    },
    {
      label: 'Download PDF',
      icon: 'FileText',
      variant: 'outline',
      onClick: () => console.log('Download PDF')
    },
    {
      label: 'Share Report',
      icon: 'Share',
      variant: 'outline',
      onClick: () => console.log('Share report')
    }
  ];

  const reportStats = [
    { label: 'Pages Generated', value: '24', icon: 'FileText' },
    { label: 'Vulnerabilities', value: reportData?.data?.vulnerability_count || '0', icon: 'AlertTriangle' },
    { label: 'Template Used', value: reportData?.template?.name || 'Unknown', icon: 'Layout' },
    { label: 'Generation Time', value: '2.3s', icon: 'Clock' }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Report Generated Successfully!</h2>
        <p className="text-lg text-muted-foreground">
          Your vulnerability assessment report has been generated and is ready for download.
        </p>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col items-center space-y-2">
              <Icon name={stat.icon} size={20} className="text-primary" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Actions */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Download Options</h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {downloadActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.onClick}
              iconName={action.icon}
              iconPosition="left"
            >
              {action.label}
            </Button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <Icon name="Info" size={14} className="inline mr-1" />
          Reports are automatically saved to your project folder
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Report Summary</h3>
        
        <div className="text-left space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Client:</span>
            <span className="font-medium text-foreground">{reportData?.data?.client_name || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Assessment Type:</span>
            <span className="font-medium text-foreground">{reportData?.data?.assessment_type || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Testing Period:</span>
            <span className="font-medium text-foreground">{reportData?.data?.testing_period || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Overall Risk:</span>
            <span className={`
              font-medium capitalize px-2 py-1 rounded-full text-xs
              ${reportData?.data?.overall_risk_rating === 'critical' ? 'bg-error/10 text-error' : ''}
              ${reportData?.data?.overall_risk_rating === 'high' ? 'bg-warning/10 text-warning' : ''}
              ${reportData?.data?.overall_risk_rating === 'medium' ? 'bg-accent/10 text-accent' : ''}
              ${reportData?.data?.overall_risk_rating === 'low' ? 'bg-success/10 text-success' : ''}
            `}>
              {reportData?.data?.overall_risk_rating || 'N/A'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Generated:</span>
            <span className="font-medium text-foreground">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          onClick={onStartNew}
          iconName="Plus"
          iconPosition="left"
        >
          Generate Another Report
        </Button>
        
        <Button
          variant="outline"
          onClick={onViewReports}
          iconName="FolderOpen"
          iconPosition="left"
        >
          View All Reports
        </Button>
      </div>

      {/* Additional Options */}
      <div className="text-sm text-muted-foreground space-y-2">
        <p>Need to make changes? You can regenerate this report with updated data anytime.</p>
        <div className="flex justify-center space-x-4">
          <button className="text-primary hover:underline">Edit Template</button>
          <button className="text-primary hover:underline">Update Data</button>
          <button className="text-primary hover:underline">View History</button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationSuccess;