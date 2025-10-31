import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import LicenseKeyManager from '../components/LicenseKeyManager';
import ChatBackupsManager from '../components/ChatBackupsManager';
import AnalyticsPage from '../components/AnalyticsPage';
import DownloadPage from '../components/DownloadPage';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'licenses' | 'chat-history' | 'analytics' | 'download'>('licenses');

  const renderContent = () => {
    switch (activeTab) {
      case 'licenses':
        return (
          <div key="licenses" className="h-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">License Key Management</h1>
              <p className="text-gray-400">Manage your API keys and licenses</p>
            </div>
            <LicenseKeyManager />
          </div>
        );
      case 'chat-history':
        return (
          <div key="chat-history" className="h-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Chat History</h1>
              <p className="text-gray-400">View and manage your chat backups</p>
            </div>
            <ChatBackupsManager />
          </div>
        );
      case 'analytics':
        return (
          <div key="analytics" className="h-full">
            <AnalyticsPage />
          </div>
        );
      case 'download':
        return (
          <div key="download" className="h-full">
            <DownloadPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="h-full">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;