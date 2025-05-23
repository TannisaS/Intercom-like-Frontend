import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { Globe, Shield, BellRing, Mail, Key, Cpu, MessageSquare } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'api':
        return <ApiSettings />;
      case 'ai':
        return <AiSettings />;
      default:
        return <GeneralSettings />;
    }
  };
  
  return (
    <Layout 
      title="Settings" 
      subtitle="Configure your admin panel preferences"
      showSearch={false}
      showActions={false}
    >
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 border-r border-gray-200">
            <nav className="p-4 space-y-1">
              <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'general' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">General</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'security' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Security</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BellRing className="h-5 w-5" />
                <span className="text-sm font-medium">Notifications</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'api' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Key className="h-5 w-5" />
                <span className="text-sm font-medium">API Keys</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'ai' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Cpu className="h-5 w-5" />
                <span className="text-sm font-medium">AI Configuration</span>
              </button>
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">General Settings</h2>
        <p className="text-sm text-gray-500">Configure basic settings for your admin panel</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            defaultValue="IntercomAI"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="text"
            defaultValue="https://intercomai.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Support Email
          </label>
          <input
            type="email"
            defaultValue="support@intercomai.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Zone
          </label>
          <select
            defaultValue="America/New_York"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          >
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Chicago">Central Time (US & Canada)</option>
            <option value="America/Denver">Mountain Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Security Settings</h2>
        <p className="text-sm text-gray-500">Configure security options for your account</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <button className="text-xs text-primary-600 hover:text-primary-700">
              Change Password
            </button>
          </div>
          <input
            type="password"
            value="••••••••••••"
            disabled
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Two-Factor Authentication
          </label>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-900">Protect your account with 2FA</p>
              <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
            </div>
            <button className="px-3 py-1.5 bg-primary-500 text-white text-sm rounded-md hover:bg-primary-600">
              Enable
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Management
          </label>
          <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Current Session</p>
                <p className="text-xs text-gray-500 mt-0.5">Chrome on macOS • Active now</p>
              </div>
              <span className="text-xs font-medium text-success-600 bg-success-50 px-2 py-1 rounded-full">
                Current
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Safari on iPhone</p>
                <p className="text-xs text-gray-500 mt-0.5">Last active: Yesterday at 8:45 PM</p>
              </div>
              <button className="text-xs text-error-600 hover:text-error-700">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="px-4 py-2 bg-error-500 text-white rounded-md hover:bg-error-600 transition-colors">
          Sign Out All Devices
        </button>
      </div>
    </div>
  );
};

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Notification Settings</h2>
        <p className="text-sm text-gray-500">Configure how and when you receive notifications</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Email Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">New conversations</p>
                <p className="text-xs text-gray-500">Get notified when a new conversation is created</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Assigned conversations</p>
                <p className="text-xs text-gray-500">Get notified when a conversation is assigned to you</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Mentions</p>
                <p className="text-xs text-gray-500">Get notified when you are mentioned in a conversation</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Weekly summary</p>
                <p className="text-xs text-gray-500">Get a weekly summary of your support activity</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" />
                <div className="block w-10 h-5 rounded-full bg-gray-300"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">In-App Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">New messages</p>
                <p className="text-xs text-gray-500">Show a notification when a new message is received</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Status changes</p>
                <p className="text-xs text-gray-500">Show a notification when a conversation status changes</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Sound alerts</p>
                <p className="text-xs text-gray-500">Play a sound when a notification is received</p>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" />
                <div className="block w-10 h-5 rounded-full bg-gray-300"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const ApiSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">API Keys</h2>
        <p className="text-sm text-gray-500">Manage API keys for integrating with other services</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gemini API Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              defaultValue="sk-••••••••••••••••••••••••••••••••••••••••••••••"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
            />
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Show
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Used for AI chatbot functionality</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your API Keys
          </label>
          <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Production Key</p>
                <span className="text-xs font-medium text-success-600 bg-success-50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="api_••••••••••••••••••••••••"
                  disabled
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                />
                <button className="px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Copy
                </button>
                <button className="px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Show
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Created on May 12, 2025 • Last used 2 hours ago</p>
            </div>
            
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Development Key</p>
                <span className="text-xs font-medium text-warning-600 bg-warning-50 px-2 py-0.5 rounded-full">
                  Testing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="api_test_••••••••••••••••••••"
                  disabled
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                />
                <button className="px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Copy
                </button>
                <button className="px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Show
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Created on May 15, 2025 • Last used 30 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Generate New Key
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Revoke All Keys
        </button>
      </div>
    </div>
  );
};

const AiSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">AI Configuration</h2>
        <p className="text-sm text-gray-500">Configure AI features and integrations</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">AI Features</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Smart Replies</p>
                  <p className="text-xs text-gray-500">AI-generated reply suggestions based on conversation context</p>
                </div>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 rounded-full">
                  <Mail className="h-5 w-5 text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Drafts</p>
                  <p className="text-xs text-gray-500">AI-generated email drafts for customer communications</p>
                </div>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="block w-10 h-5 rounded-full bg-success-500"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition transform translate-x-5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-100 rounded-full">
                  <Cpu className="h-5 w-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sentiment Analysis</p>
                  <p className="text-xs text-gray-500">Analyze customer message sentiment to prioritize urgent cases</p>
                </div>
              </div>
              <div className="relative inline-block w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" />
                <div className="block w-10 h-5 rounded-full bg-gray-300"></div>
                <div className="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Model Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default AI Model
              </label>
              <select
                defaultValue="gemini-pro"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
              >
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-pro-vision">Gemini Pro Vision</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="gpt-4o">GPT-4o</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">The AI model used for generating responses</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Knowledge Base Sources
              </label>
              <div className="p-3 border border-gray-200 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="kb-docs" defaultChecked className="rounded text-primary-500 focus:ring-primary-500" />
                  <label htmlFor="kb-docs" className="text-sm text-gray-700">Documentation</label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="kb-faqs" defaultChecked className="rounded text-primary-500 focus:ring-primary-500" />
                  <label htmlFor="kb-faqs" className="text-sm text-gray-700">FAQs</label>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="kb-kb" defaultChecked className="rounded text-primary-500 focus:ring-primary-500" />
                  <label htmlFor="kb-kb" className="text-sm text-gray-700">Knowledge Base</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="kb-previous" className="rounded text-primary-500 focus:ring-primary-500" />
                  <label htmlFor="kb-previous" className="text-sm text-gray-700">Previous Conversations</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;