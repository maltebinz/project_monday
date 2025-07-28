import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/chat', label: 'AI Chat', icon: '💬' }
  ];

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">OneFlow Client Manager</h1>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'border-blue-400 text-white'
                      : 'border-transparent text-gray-300 hover:border-gray-400 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              ✓ OneFlow Connected
            </div>
            
            {/* Prominent AI Chat Button */}
            <Link
              to="/chat"
              className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                location.pathname === '/chat'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="mr-2">🤖</span>
              AI Chat
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden bg-slate-700">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-slate-600 border-blue-400 text-white'
                  : 'border-transparent text-gray-300 hover:bg-slate-600 hover:border-gray-300 hover:text-white'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          {/* Prominent AI Chat Button for Mobile */}
          <div className="px-3 pt-2">
            <Link
              to="/chat"
              className={`flex items-center justify-center w-full px-4 py-3 rounded-lg font-semibold text-base transition-colors ${
                location.pathname === '/chat'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
              }`}
            >
              <span className="mr-2">🤖</span>
              AI Chat Assistant
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};