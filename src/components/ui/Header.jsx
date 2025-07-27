import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationTabs = [
    {
      label: 'Projects',
      paths: ['/project-dashboard', '/project-details'],
      icon: 'FolderOpen'
    },
    {
      label: 'Assessment',
      paths: ['/vulnerability-management', '/checklist-management'],
      icon: 'Shield'
    },
    {
      label: 'Reports',
      paths: ['/report-generation', '/template-management'],
      icon: 'FileText'
    }
  ];

  const getActiveTab = () => {
    return navigationTabs.find(tab => 
      tab.paths.some(path => location.pathname === path)
    );
  };

  const handleTabClick = (tab) => {
    navigate(tab.paths[0]);
    setMobileMenuOpen(false);
  };

  const activeTab = getActiveTab();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-none">
                VulnTracker
              </span>
              <span className="text-xs text-muted-foreground font-medium leading-none">
                Pro
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationTabs.map((tab) => {
            const isActive = activeTab?.label === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="icon">
            <Icon name="User" size={18} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {navigationTabs.map((tab) => {
              const isActive = activeTab?.label === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(tab)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;