import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProjectContextProvider from "components/ui/ProjectContextProvider";
// Add your imports here
import ProjectDashboard from "pages/project-dashboard";
import ReportGeneration from "pages/report-generation";
import ChecklistManagement from "pages/checklist-management";
import ProjectDetails from "pages/project-details";
import VulnerabilityManagement from "pages/vulnerability-management";
import TemplateManagement from "pages/template-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ProjectContextProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<ProjectDashboard />} />
            <Route path="/project-dashboard" element={<ProjectDashboard />} />
            <Route path="/report-generation" element={<ReportGeneration />} />
            <Route path="/checklist-management" element={<ChecklistManagement />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/vulnerability-management" element={<VulnerabilityManagement />} />
            <Route path="/template-management" element={<TemplateManagement />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ProjectContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;