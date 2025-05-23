import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConversationsPage from './pages/conversations';
import ConversationListView from './pages/conversations/conversation-list-view';
import ConversationDetailView from './pages/conversations/conversation-detail-view';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/conversations" replace />} />
        <Route path="/conversations" element={<ConversationsPage />}>
          <Route index element={<ConversationListView />} />
          <Route path=":id" element={<ConversationDetailView />} />
        </Route>
        <Route path="*" element={<Navigate to="/conversations" replace />} />
      </Routes>
    </Router>
  );
}

export default App;