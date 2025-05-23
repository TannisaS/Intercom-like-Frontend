import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { users } from '../data/mockData';
import { formatDate, getInitials, getStatusColor } from '../lib/utils';
import { Edit, Trash, MoreHorizontal, Filter } from 'lucide-react';

const UsersPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredUsers = users.filter(user => {
    if (filter === 'admin' && user.role !== 'admin') return false;
    if (filter === 'agent' && user.role !== 'agent') return false;
    if (filter === 'customer' && user.role !== 'customer') return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  return (
    <Layout 
      title="Users" 
      subtitle="Manage user accounts and permissions"
      showSearch={true}
      showActions={true}
    >
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex space-x-1 text-sm">
              <button 
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-md ${
                  filter === 'all' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Users
              </button>
              <button 
                onClick={() => setFilter('admin')}
                className={`px-2.5 py-1 rounded-md ${
                  filter === 'admin' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admins
              </button>
              <button 
                onClick={() => setFilter('agent')}
                className={`px-2.5 py-1 rounded-md ${
                  filter === 'agent' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Agents
              </button>
              <button 
                onClick={() => setFilter('customer')}
                className={`px-2.5 py-1 rounded-md ${
                  filter === 'customer' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Customers
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'agent' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`}></div>
                      <span className="text-sm text-gray-600 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(user.lastActive)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(user.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-error-600 hover:bg-gray-100 rounded">
                        <Trash className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;