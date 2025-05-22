import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Save, Trash2, Download, Upload, Settings, RefreshCw } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('Your Company');
  const [email, setEmail] = useState('admin@example.com');

  const handleExportData = () => {
    const data = {
      leads: localStorage.getItem('trackflow_leads'),
      orders: localStorage.getItem('trackflow_orders'),
      reminders: localStorage.getItem('trackflow_reminders'),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trackflow-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('trackflow_leads');
      localStorage.removeItem('trackflow_orders');
      localStorage.removeItem('trackflow_reminders');
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Settings size={18} className="mr-2" /> Company Settings
            </h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-4">
              <Input
                label="Company Name"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
              <Input
                label="Admin Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className="pt-2">
                <Button leftIcon={<Save size={16} />}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <RefreshCw size={18} className="mr-2" /> Data Management
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <Button 
                  variant="outline" 
                  className="w-full mb-3"
                  leftIcon={<Download size={16} />}
                  onClick={handleExportData}
                >
                  Export All Data
                </Button>
                <p className="text-xs text-gray-500">
                  Download a JSON file containing all your leads, orders, and reminders.
                </p>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full mb-3"
                  leftIcon={<Upload size={16} />}
                >
                  Import Data
                </Button>
                <p className="text-xs text-gray-500">
                  Upload a previously exported JSON file to restore your data.
                </p>
              </div>
              
              <div>
                <Button 
                  variant="danger" 
                  className="w-full mb-3"
                  leftIcon={<Trash2 size={16} />}
                  onClick={handleClearData}
                >
                  Clear All Data
                </Button>
                <p className="text-xs text-gray-500">
                  Permanently delete all data. This action cannot be undone.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;