import React, { useState, useEffect } from 'react';
import { useProject } from '../../components/ui/ProjectContextProvider';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ChecklistSidebar from './components/ChecklistSidebar';
import ChecklistHeader from './components/ChecklistHeader';
import ChecklistTabs from './components/ChecklistTabs';
import ChecklistCategory from './components/ChecklistCategory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const ChecklistManagement = () => {
  const { currentProject } = useProject();
  const [checklists, setChecklists] = useState([]);
  const [activeChecklists, setActiveChecklists] = useState([]);
  const [currentChecklistId, setCurrentChecklistId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Mock checklists data
  const mockChecklists = [
    {
      id: 1,
      name: 'OWASP Top 10 2021',
      description: 'Comprehensive security testing checklist based on OWASP Top 10 vulnerabilities',
      type: 'owasp',
      totalItems: 45,
      completedItems: 28,
      passedItems: 22,
      failedItems: 6,
      inProgressItems: 12,
      categories: [
        {
          id: 'cat1',
          name: 'Broken Access Control',
          description: 'Test cases for access control vulnerabilities',
          totalItems: 8,
          completedItems: 6,
          statusCounts: { passed: 4, failed: 2, in_progress: 2 },
          items: [
            {
              id: 'item1',
              title: 'Vertical Privilege Escalation',
              description: 'Test for unauthorized access to higher privilege functions',
              methodology: `1. Login with low-privilege user account\n2. Attempt to access admin functions directly\n3. Modify request parameters to bypass authorization\n4. Check for privilege escalation vulnerabilities`,
              expectedResult: 'Application should deny access to unauthorized functions',
              status: 'passed',
              assignee: 'John Doe',
              lastUpdated: '2025-01-25T10:30:00Z',
              notes: [
                {
                  text: 'Tested admin panel access - properly restricted',
                  author: 'John Doe',
                  timestamp: '2025-01-25T10:30:00Z'
                }
              ],
              evidenceLinks: []
            },
            {
              id: 'item2',
              title: 'Horizontal Privilege Escalation',
              description: 'Test for unauthorized access to other users data',
              methodology: `1. Login with user account\n2. Identify user-specific resources\n3. Attempt to access other users resources\n4. Test parameter manipulation`,
              expectedResult: 'Users should only access their own data',
              status: 'failed',
              assignee: 'Jane Smith',
              lastUpdated: '2025-01-24T15:45:00Z',
              notes: [
                {
                  text: 'Found IDOR vulnerability in user profile endpoint',
                  author: 'Jane Smith',
                  timestamp: '2025-01-24T15:45:00Z'
                }
              ],
              evidenceLinks: [
                {
                  type: 'vulnerability',
                  id: 'vuln-001',
                  title: 'IDOR in User Profile API'
                }
              ]
            }
          ]
        },
        {
          id: 'cat2',
          name: 'Cryptographic Failures',
          description: 'Test cases for encryption and data protection issues',
          totalItems: 6,
          completedItems: 4,
          statusCounts: { passed: 3, failed: 1, in_progress: 2 },
          items: [
            {
              id: 'item3',
              title: 'Data in Transit Encryption',
              description: 'Verify all sensitive data is encrypted during transmission',
              methodology: `1. Intercept network traffic\n2. Check for unencrypted sensitive data\n3. Verify TLS implementation\n4. Test certificate validation`,
              expectedResult: 'All sensitive data should be encrypted with strong protocols',
              status: 'in_progress',
              assignee: 'Mike Johnson',
              lastUpdated: '2025-01-26T09:15:00Z',
              notes: [],
              evidenceLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'NIST Cybersecurity Framework',
      description: 'Security assessment checklist based on NIST CSF guidelines',
      type: 'nist',
      totalItems: 32,
      completedItems: 15,
      passedItems: 12,
      failedItems: 3,
      inProgressItems: 8,
      categories: [
        {
          id: 'nist1',
          name: 'Identify',
          description: 'Asset management and risk assessment',
          totalItems: 10,
          completedItems: 6,
          statusCounts: { passed: 5, failed: 1, in_progress: 4 },
          items: [
            {
              id: 'nist_item1',
              title: 'Asset Inventory',
              description: 'Verify comprehensive asset inventory exists',
              methodology: 'Review asset management documentation and systems',
              expectedResult: 'Complete and up-to-date asset inventory',
              status: 'passed',
              assignee: 'Sarah Wilson',
              lastUpdated: '2025-01-23T14:20:00Z',
              notes: [],
              evidenceLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Custom Web Application Checklist',
      description: 'Tailored checklist for specific web application testing requirements',
      type: 'custom',
      totalItems: 25,
      completedItems: 8,
      passedItems: 6,
      failedItems: 2,
      inProgressItems: 5,
      categories: [
        {
          id: 'custom1',
          name: 'Authentication & Session Management',
          description: 'Custom authentication testing procedures',
          totalItems: 12,
          completedItems: 4,
          statusCounts: { passed: 3, failed: 1, in_progress: 8 },
          items: [
            {
              id: 'custom_item1',
              title: 'Multi-Factor Authentication',
              description: 'Test MFA implementation and bypass attempts',
              methodology: 'Test MFA setup, backup codes, and potential bypasses',
              expectedResult: 'MFA should be properly implemented and secure',
              status: 'in_progress',
              assignee: 'Alex Chen',
              lastUpdated: '2025-01-26T11:00:00Z',
              notes: [],
              evidenceLinks: []
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    setChecklists(mockChecklists);
  }, []);

  const handleChecklistSelect = (checklist) => {
    if (!activeChecklists.find(c => c.id === checklist.id)) {
      setActiveChecklists(prev => [...prev, checklist]);
    }
    setCurrentChecklistId(checklist.id);
    
    // Expand first category by default
    if (checklist.categories && checklist.categories.length > 0) {
      setExpandedCategories(prev => ({
        ...prev,
        [checklist.categories[0].id]: true
      }));
    }
  };

  const handleTabChange = (checklistId) => {
    setCurrentChecklistId(checklistId);
  };

  const handleCloseTab = (checklistId) => {
    setActiveChecklists(prev => prev.filter(c => c.id !== checklistId));
    if (currentChecklistId === checklistId) {
      const remaining = activeChecklists.filter(c => c.id !== checklistId);
      setCurrentChecklistId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleCreateChecklist = () => {
    console.log('Create new checklist');
  };

  const handleBulkUpdate = (categoryId, status) => {
    console.log('Bulk update:', categoryId, status);
  };

  const handleExport = (format) => {
    console.log('Export checklist as:', format);
  };

  const handleAddTestCase = () => {
    console.log('Add new test case');
  };

  const handleItemUpdate = (categoryId, itemId, updates) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === currentChecklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.map(item => 
                  item.id === itemId 
                    ? { ...item, ...updates, lastUpdated: new Date().toISOString() }
                    : item
                )
              };
            }
            return category;
          })
        };
      }
      return checklist;
    }));

    // Update active checklists
    setActiveChecklists(prev => prev.map(checklist => {
      if (checklist.id === currentChecklistId) {
        return checklists.find(c => c.id === currentChecklistId) || checklist;
      }
      return checklist;
    }));
  };

  const handleAddNote = (categoryId, itemId, note) => {
    handleItemUpdate(categoryId, itemId, {
      notes: [...(getCurrentItem(categoryId, itemId)?.notes || []), note]
    });
  };

  const handleLinkEvidence = (categoryId, itemId, evidence) => {
    handleItemUpdate(categoryId, itemId, {
      evidenceLinks: [...(getCurrentItem(categoryId, itemId)?.evidenceLinks || []), evidence]
    });
  };

  const handleAddItem = (categoryId, newItem) => {
    const newItemWithId = {
      ...newItem,
      id: `item_${Date.now()}`,
      assignee: 'Current User',
      lastUpdated: new Date().toISOString(),
      notes: [],
      evidenceLinks: []
    };

    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === currentChecklistId) {
        return {
          ...checklist,
          categories: checklist.categories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: [...category.items, newItemWithId],
                totalItems: category.totalItems + 1
              };
            }
            return category;
          }),
          totalItems: checklist.totalItems + 1
        };
      }
      return checklist;
    }));
  };

  const getCurrentItem = (categoryId, itemId) => {
    const currentChecklist = checklists.find(c => c.id === currentChecklistId);
    const category = currentChecklist?.categories.find(cat => cat.id === categoryId);
    return category?.items.find(item => item.id === itemId);
  };

  const handleToggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const currentChecklist = activeChecklists.find(c => c.id === currentChecklistId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBreadcrumbs />
      
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <ChecklistSidebar
            checklists={checklists}
            activeChecklist={currentChecklist}
            onChecklistSelect={handleChecklistSelect}
            onCreateChecklist={handleCreateChecklist}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <ChecklistTabs
            activeChecklists={activeChecklists}
            currentChecklistId={currentChecklistId}
            onTabChange={handleTabChange}
            onCloseTab={handleCloseTab}
            onNewChecklist={handleCreateChecklist}
          />

          {/* Header */}
          <ChecklistHeader
            checklist={currentChecklist}
            onBulkUpdate={handleBulkUpdate}
            onExport={handleExport}
            onAddTestCase={handleAddTestCase}
          />

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {currentChecklist ? (
              <div className="p-6 space-y-6">
                {currentChecklist.categories.map(category => (
                  <ChecklistCategory
                    key={category.id}
                    category={category}
                    onItemUpdate={handleItemUpdate}
                    onAddNote={handleAddNote}
                    onLinkEvidence={handleLinkEvidence}
                    onAddItem={handleAddItem}
                    isExpanded={expandedCategories[category.id] || false}
                    onToggleExpand={() => handleToggleCategory(category.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="List" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Checklist Selected
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Select a checklist from the sidebar to start testing
                  </p>
                  <Button
                    variant="default"
                    onClick={handleCreateChecklist}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create New Checklist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6">
        <QuickActionToolbar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40 hidden" id="mobile-sidebar-overlay">
        <div className="w-80 h-full bg-card">
          <ChecklistSidebar
            checklists={checklists}
            activeChecklist={currentChecklist}
            onChecklistSelect={handleChecklistSelect}
            onCreateChecklist={handleCreateChecklist}
          />
        </div>
      </div>
    </div>
  );
};

export default ChecklistManagement;