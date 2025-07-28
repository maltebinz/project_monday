import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClientCard } from '../components/ClientCard';

const mockClients = [
  {
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    contractStatus: 'active' as const,
    expiryDate: 'March 15, 2025',
    service: 'SEO & Marketing',
    lastCheck: 'Last SEO Check: January 15, 2025'
  },
  {
    name: 'Tech Startup Inc',
    email: 'hello@techstartup.com',
    phone: '(555) 987-6543',
    contractStatus: 'expiring' as const,
    expiryDate: 'August 28, 2025',
    service: 'Web Development',
    lastCheck: 'SEO Check Due: August 1, 2025'
  },
  {
    name: 'Global Solutions Ltd',
    email: 'info@globalsolutions.com',
    phone: '(555) 456-7890',
    contractStatus: 'draft' as const,
    expiryDate: 'Pending Signature',
    service: 'Full Marketing Suite',
    oneflowStatus: 'Awaiting Client'
  }
];

const mockNotifications = [
  {
    type: 'contract-signed',
    title: 'Contract Signed!',
    message: 'Acme Corporation contract executed via OneFlow',
    time: '2 hours ago',
    channel: '#contracts channel'
  },
  {
    type: 'contract-expiring',
    title: 'Contract Expiring Soon',
    message: 'Tech Startup Inc contract expires in 30 days',
    time: '1 day ago',
    channel: '#account-management channel'
  },
  {
    type: 'seo-reminder',
    title: 'Monthly SEO Check',
    message: 'Time to review Tech Startup Inc SEO status',
    time: '3 days ago',
    channel: '#seo-team channel'
  }
];

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contractFilter, setContractFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContract = !contractFilter || client.contractStatus === contractFilter;
    const matchesService = !serviceFilter || client.service.toLowerCase().includes(serviceFilter.toLowerCase());
    
    return matchesSearch && matchesContract && matchesService;
  });

  const syncOneFlow = () => {
    alert('Syncing with OneFlow API...\n✓ Contract statuses updated\n✓ New signatures detected\n✓ Client data refreshed');
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'contract-signed': return 'bg-green-50 border-green-400';
      case 'contract-expiring': return 'bg-red-50 border-red-400';
      case 'seo-reminder': return 'bg-blue-50 border-blue-400';
      default: return 'bg-gray-50 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Management Dashboard</h1>
              <p className="text-gray-600">Automated contract workflows and client relationship management</p>
            </div>
            
            {/* AI Chat Call-to-Action */}
            <Link
              to="/chat"
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🤖</span>
              Try AI Assistant
            </Link>
          </div>
        </div>

        {/* OneFlow Sync Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
          <span className="text-green-800 font-semibold">✓ OneFlow API Connected</span>
          <span className="text-gray-600 mx-2">|</span>
          <span className="text-gray-600">Last sync: 2 minutes ago</span>
          <button 
            onClick={syncOneFlow}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Sync Now
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Contracts</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Services</option>
              <option value="seo">SEO</option>
              <option value="web">Web Development</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* AI Assistant Promotion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">AI-Powered Client Management</h3>
                <p className="text-gray-600">Get intelligent assistance with workflows, contract management, and client insights using Google Gemini AI.</p>
              </div>
            </div>
            <Link
              to="/chat"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Chat →
            </Link>
          </div>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredClients.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
        </div>

        {/* Notifications Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Slack Notifications</h3>
          <div className="space-y-4">
            {mockNotifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getNotificationColor(notification.type)}`}
              >
                <div className="font-semibold text-gray-900">{notification.title}</div>
                <div className="text-gray-700 mt-1">{notification.message}</div>
                <div className="text-sm text-gray-500 mt-2">
                  Sent to {notification.channel} • {notification.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};