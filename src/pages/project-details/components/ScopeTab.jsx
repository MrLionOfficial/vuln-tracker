import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ScopeTab = () => {
  const [targetSystems, setTargetSystems] = useState([
    { id: 1, type: 'Web Application', url: 'https://app.techcorp.com', description: 'Main customer portal' },
    { id: 2, type: 'API Endpoint', url: 'https://api.techcorp.com', description: 'REST API services' },
    { id: 3, type: 'Admin Panel', url: 'https://admin.techcorp.com', description: 'Administrative interface' }
  ]);

  const [ipRanges, setIpRanges] = useState([
    { id: 1, range: '192.168.1.0/24', description: 'Internal network range' },
    { id: 2, range: '10.0.0.0/16', description: 'DMZ network range' },
    { id: 3, range: '172.16.0.0/12', description: 'Management network' }
  ]);

  const [testingBoundaries, setTestingBoundaries] = useState({
    included: `• Web application functionality testing\n• Authentication and authorization mechanisms\n• Input validation and sanitization\n• Session management\n• Business logic flaws\n• Client-side security controls\n• API security testing\n• Configuration review`,
    excluded: `• Social engineering attacks\n• Physical security testing\n• Denial of Service (DoS) attacks\n• Testing during business hours (9 AM - 5 PM)\n• Production database manipulation\n• Email system testing\n• Third-party integrations`,
    constraints: `• Testing limited to staging environment\n• Maximum 5 concurrent connections\n• No automated scanning during peak hours\n• All testing activities must be logged\n• Immediate notification for critical findings\n• Data exfiltration strictly prohibited`
  });

  const [newSystem, setNewSystem] = useState({ type: '', url: '', description: '' });
  const [newIpRange, setNewIpRange] = useState({ range: '', description: '' });
  const [showAddSystem, setShowAddSystem] = useState(false);
  const [showAddIpRange, setShowAddIpRange] = useState(false);

  const handleAddSystem = () => {
    if (newSystem.type && newSystem.url) {
      setTargetSystems(prev => [...prev, {
        id: Date.now(),
        ...newSystem
      }]);
      setNewSystem({ type: '', url: '', description: '' });
      setShowAddSystem(false);
    }
  };

  const handleAddIpRange = () => {
    if (newIpRange.range) {
      setIpRanges(prev => [...prev, {
        id: Date.now(),
        ...newIpRange
      }]);
      setNewIpRange({ range: '', description: '' });
      setShowAddIpRange(false);
    }
  };

  const handleRemoveSystem = (id) => {
    setTargetSystems(prev => prev.filter(system => system.id !== id));
  };

  const handleRemoveIpRange = (id) => {
    setIpRanges(prev => prev.filter(range => range.id !== id));
  };

  const handleBoundaryChange = (field, value) => {
    setTestingBoundaries(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Project Scope</h2>
        <p className="text-muted-foreground">Define target systems, IP ranges, and testing boundaries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Target Systems & IP Ranges */}
        <div className="space-y-6">
          {/* Target Systems */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Globe" size={20} className="mr-2" />
                Target Systems
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddSystem(true)}
              >
                <Icon name="Plus" size={16} />
                Add System
              </Button>
            </div>

            {/* Add System Form */}
            {showAddSystem && (
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <Input
                    label="System Type"
                    type="text"
                    value={newSystem.type}
                    onChange={(e) => setNewSystem(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., Web Application, API, Database"
                  />
                  <Input
                    label="URL/Address"
                    type="text"
                    value={newSystem.url}
                    onChange={(e) => setNewSystem(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                  />
                  <Input
                    label="Description"
                    type="text"
                    value={newSystem.description}
                    onChange={(e) => setNewSystem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the system"
                  />
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" onClick={handleAddSystem}>
                      Add System
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowAddSystem(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Systems List */}
            <div className="space-y-3">
              {targetSystems.map((system) => (
                <div key={system.id} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Server" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{system.type}</span>
                    </div>
                    <p className="text-sm text-accent font-mono">{system.url}</p>
                    <p className="text-sm text-muted-foreground mt-1">{system.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveSystem(system.id)}
                  >
                    <Icon name="Trash2" size={16} className="text-error" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* IP Ranges */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Network" size={20} className="mr-2" />
                IP Ranges
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddIpRange(true)}
              >
                <Icon name="Plus" size={16} />
                Add Range
              </Button>
            </div>

            {/* Add IP Range Form */}
            {showAddIpRange && (
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <Input
                    label="IP Range/CIDR"
                    type="text"
                    value={newIpRange.range}
                    onChange={(e) => setNewIpRange(prev => ({ ...prev, range: e.target.value }))}
                    placeholder="192.168.1.0/24"
                  />
                  <Input
                    label="Description"
                    type="text"
                    value={newIpRange.description}
                    onChange={(e) => setNewIpRange(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Network description"
                  />
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" onClick={handleAddIpRange}>
                      Add Range
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowAddIpRange(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* IP Ranges List */}
            <div className="space-y-3">
              {ipRanges.map((range) => (
                <div key={range.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Wifi" size={16} className="text-accent" />
                      <span className="font-medium text-foreground font-mono">{range.range}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{range.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveIpRange(range.id)}
                  >
                    <Icon name="Trash2" size={16} className="text-error" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Testing Boundaries */}
        <div className="space-y-6">
          {/* Included in Scope */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="CheckCircle" size={20} className="mr-2 text-success" />
              Included in Scope
            </h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Testing Activities Included
              </label>
              <textarea
                value={testingBoundaries.included}
                onChange={(e) => handleBoundaryChange('included', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="List activities included in the testing scope..."
              />
            </div>
          </div>

          {/* Excluded from Scope */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="XCircle" size={20} className="mr-2 text-error" />
              Excluded from Scope
            </h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Testing Activities Excluded
              </label>
              <textarea
                value={testingBoundaries.excluded}
                onChange={(e) => handleBoundaryChange('excluded', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="List activities excluded from testing..."
              />
            </div>
          </div>

          {/* Testing Constraints */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="AlertTriangle" size={20} className="mr-2 text-warning" />
              Testing Constraints
            </h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Constraints and Limitations
              </label>
              <textarea
                value={testingBoundaries.constraints}
                onChange={(e) => handleBoundaryChange('constraints', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="List testing constraints and limitations..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Scope Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{targetSystems.length}</div>
            <div className="text-sm text-muted-foreground">Target Systems</div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{ipRanges.length}</div>
            <div className="text-sm text-muted-foreground">IP Ranges</div>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">8</div>
            <div className="text-sm text-muted-foreground">Included Activities</div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning">7</div>
            <div className="text-sm text-muted-foreground">Excluded Activities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeTab;