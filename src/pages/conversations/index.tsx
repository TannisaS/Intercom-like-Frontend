import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../components/layout/layout';

const ConversationsPage: React.FC = () => {
  return (
    <Layout 
      title="Conversations" 
      subtitle="Manage and respond to customer conversations"
      showSearch={false}
      showActions={true}
    >
      <div className="h-[calc(100vh-9rem)] bg-white rounded-lg shadow-card overflow-hidden">
        <Outlet />
      </div>
    </Layout>
  );
};

export default ConversationsPage;