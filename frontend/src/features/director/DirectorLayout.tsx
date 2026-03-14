import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Settings, Crown } from 'lucide-react';

const DirectorLayout = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { name: '대시보드', icon: <LayoutDashboard size={20} />, path: '/director' },
    { name: '환경설정', icon: <Settings size={20} />, path: '/director/settings' }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-50 border-r border-gray-100 flex flex-col shadow-sm z-10 transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 w-full">
             <div className="p-1.5 bg-blue-50 text-blue-900 rounded-lg shadow-sm">
               <Crown size={22} strokeWidth={2.5} />
             </div>
             <span className="text-lg font-bold text-blue-900 tracking-tight">원장실</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/director'}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-white text-blue-900 font-bold shadow-md ring-1 ring-gray-100 scale-[1.02]' 
                  : 'text-gray-600 hover:bg-blue-100 hover:text-gray-900 font-medium'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm transition-all duration-200 font-medium whitespace-nowrap active:scale-95"
          >
            <Home size={18} />
            <span>메인 시스템 로비</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative selection:bg-blue-100 selection:text-blue-900">
        <div className="max-w-7xl mx-auto p-8 relative min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DirectorLayout;
