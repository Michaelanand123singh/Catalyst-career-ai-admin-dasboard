import React, { useState, useEffect } from 'react';
import { Users, Activity, BarChart3, Settings, LogOut, RefreshCw, User, Calendar, TrendingUp, FileText, Mail } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'overview') {
        const [[status], [health]] = await Promise.all([
          api.getSystemStatus(),
          api.getHealth()
        ]);
        setSystemStatus({ ...status, ...health });
      } else if (activeTab === 'users') {
        const [data, err] = await api.getUsers();
        if (err) throw new Error(err.message);
        setUsers(data?.users || []);
      } else if (activeTab === 'activity') {
        const [data, err] = await api.getActivity(50);
        if (err) throw new Error(err.message);
        setActivity(data?.activity || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">System Status</p>
              <p className={`text-2xl font-bold ${
                systemStatus?.status === 'healthy' || systemStatus?.status === 'operational' 
                  ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {systemStatus?.status || 'Unknown'}
              </p>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">{users.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Recent Activity</p>
              <p className="text-2xl font-bold text-slate-900">{activity.length}</p>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600">Environment</p>
            <p className="font-medium">{systemStatus?.environment || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Version</p>
            <p className="font-medium">{systemStatus?.version || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Model</p>
            <p className="font-medium">{systemStatus?.model || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Last Updated</p>
            <p className="font-medium">{formatDate(systemStatus?.timestamp)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-slate-800">User Management</h3>
        <p className="text-sm text-slate-600">Manage user accounts and view user information</p>
      </div>
      
      {loading ? (
        <div className="p-6 text-center">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
          <p className="text-sm text-slate-500 mt-2">Loading users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{user.name || 'N/A'}</div>
                        <div className="text-sm text-slate-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(user.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(user.last_login_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-amber-600 hover:text-amber-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderActivity = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-slate-800">Activity Logs</h3>
        <p className="text-sm text-slate-600">Monitor system activity and user interactions</p>
      </div>
      
      {loading ? (
        <div className="p-6 text-center">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
          <p className="text-sm text-slate-500 mt-2">Loading activity...</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {activity.map((item, index) => (
            <div key={index} className="p-6 hover:bg-slate-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">
                      {item.action || 'Activity'}
                    </span>
                    {item.user_id && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        User: {item.user_id}
                      </span>
                    )}
                  </div>
                  {item.message && (
                    <p className="text-sm text-slate-600 mt-1">{item.message}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(item.ts)}
                    </span>
                    {item.duration && (
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {item.duration}ms
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-slate-900">Catalyst Career AI - Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Welcome, {adminUser.name || adminUser.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'blog', label: 'Blog', icon: FileText },
              { id: 'contact', label: 'Contact', icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 rounded-lg p-4">
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'activity' && renderActivity()}
          {activeTab === 'blog' && <BlogPage />}
          {activeTab === 'contact' && <ContactPage />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
