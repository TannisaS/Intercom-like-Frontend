import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { chatbotConfig, getDummyChatbotResponse } from '../data/mockData';
import { ChatbotConfig } from '../types';
import { Bot, Send, PlusCircle, X, Trash, Save, Info } from 'lucide-react';

const ChatbotPage: React.FC = () => {
  const [config, setConfig] = useState<ChatbotConfig>({ ...chatbotConfig });
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState<{ text: string; confidence: number } | null>(null);
  const [newKnowledge, setNewKnowledge] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleToggleBot = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleGreetingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, greeting: e.target.value }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prev => ({ ...prev, model: e.target.value }));
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setConfig(prev => ({ ...prev, temperature: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setConfig(prev => {
      const categories = [...prev.autoRespondCategories];
      const index = categories.indexOf(category);
      
      if (index >= 0) {
        categories.splice(index, 1);
      } else {
        categories.push(category);
      }
      
      return { ...prev, autoRespondCategories: categories };
    });
  };

  const handleAddKnowledge = () => {
    if (newKnowledge.trim()) {
      setConfig(prev => ({
        ...prev,
        knowledgeBase: [...prev.knowledgeBase, newKnowledge.trim()]
      }));
      setNewKnowledge('');
    }
  };

  const handleRemoveKnowledge = (index: number) => {
    setConfig(prev => {
      const knowledgeBase = [...prev.knowledgeBase];
      knowledgeBase.splice(index, 1);
      return { ...prev, knowledgeBase };
    });
  };

  const handleTestMessage = () => {
    if (testMessage.trim()) {
      const response = getDummyChatbotResponse(testMessage);
      setTestResponse(response);
    }
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    setIsEditing(false);
    alert('Chatbot configuration saved successfully!');
  };

  const categories = [
    { id: 'billing', name: 'Billing Questions' },
    { id: 'account', name: 'Account Management' },
    { id: 'password-reset', name: 'Password Reset' },
    { id: 'general-info', name: 'General Information' },
    { id: 'technical', name: 'Technical Issues' },
    { id: 'product', name: 'Product Questions' }
  ];

  return (
    <Layout 
      title="AI Chatbot" 
      subtitle="Configure your automated customer support assistant"
      showSearch={false}
      showActions={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Chatbot Configuration</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Status:</span>
                    <span className={`text-sm font-medium ${config.enabled ? 'text-success-600' : 'text-gray-500'}`}>
                      {config.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="relative inline-block w-12 h-6 cursor-pointer">
                    <input 
                      type="checkbox"
                      className="sr-only"
                      checked={config.enabled}
                      onChange={handleToggleBot}
                    />
                    <div className={`block w-12 h-6 rounded-full transition-colors ${config.enabled ? 'bg-success-500' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${config.enabled ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Configure how the AI assistant interacts with your customers</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Greeting Message</label>
                  <input
                    type="text"
                    value={config.greeting}
                    onChange={handleGreetingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                    disabled={!isEditing}
                  />
                  <p className="text-xs text-gray-500 mt-1">This message is shown when a conversation starts</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
                    <select
                      value={config.model}
                      onChange={handleModelChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                      disabled={!isEditing}
                    >
                      <option value="gemini-pro">Gemini Pro</option>
                      <option value="gemini-pro-vision">Gemini Pro Vision</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Select the AI model to use for responses</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">Temperature: {config.temperature}</label>
                      <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                    {showInfo && (
                      <div className="p-2 bg-gray-50 rounded-md text-xs text-gray-600 mb-2 animate-fade-in">
                        Temperature controls randomness: Lower values (0.2) for more focused, deterministic responses. Higher values (0.8) for more creative, diverse responses.
                      </div>
                    )}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={config.temperature}
                      onChange={handleTemperatureChange}
                      className="w-full"
                      disabled={!isEditing}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>More focused</span>
                      <span>More creative</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Respond Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => isEditing && handleCategoryToggle(category.id)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          config.autoRespondCategories.includes(category.id)
                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        } ${!isEditing && 'opacity-75 cursor-default'}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select categories for which the chatbot should automatically respond</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Knowledge Base</label>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newKnowledge}
                          onChange={(e) => setNewKnowledge(e.target.value)}
                          placeholder="Add knowledge..."
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                        />
                        <button
                          onClick={handleAddKnowledge}
                          className="p-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2 max-h-60 overflow-y-auto">
                    {config.knowledgeBase.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No knowledge base items yet. Add some information that the chatbot can use for responses.</p>
                    ) : (
                      config.knowledgeBase.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200 animate-fade-in">
                          <p className="flex-1 text-sm text-gray-700">{item}</p>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveKnowledge(index)}
                              className="p-1 text-gray-500 hover:text-error-600 rounded-full hover:bg-gray-100"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Add factual information to improve AI responses</p>
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center gap-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                    >
                      Edit Configuration
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Test Chatbot</h3>
              <p className="text-sm text-gray-500 mt-1">See how your chatbot responds to different queries</p>
            </div>
            
            <div className="p-6">
              <div className="h-80 flex flex-col">
                <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                  {!testResponse ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Bot className="h-6 w-6 text-primary-500" />
                      </div>
                      <p className="mt-2 text-gray-600 text-sm">Enter a message to test the AI chatbot.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-primary-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
                          <p className="text-sm">{testMessage}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="bg-secondary-50 border border-secondary-100 px-4 py-2 rounded-lg max-w-[80%]">
                          <p className="text-sm">{testResponse.text}</p>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs text-gray-500">Confidence:</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  testResponse.confidence > 0.8 ? 'bg-success-500' :
                                  testResponse.confidence > 0.5 ? 'bg-warning-500' :
                                  'bg-error-500'
                                }`}
                                style={{ width: `${testResponse.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{Math.round(testResponse.confidence * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Type a test message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleTestMessage()}
                  />
                  <button
                    onClick={handleTestMessage}
                    disabled={!testMessage.trim()}
                    className="p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;