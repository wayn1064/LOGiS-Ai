import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, PackageSearch, PenTool, Archive, LogOut, Droplets, Wrench, Settings } from 'lucide-react';

const SupplyLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: '대시보드', icon: <LayoutDashboard size={20} />, path: '/supply' },
    { name: '재고 현황', icon: <PackageSearch size={20} />, path: '/supply/inventory' },
    { name: '발주 관리', icon: <PenTool size={20} />, path: '/supply/orders' },
    { name: '멸균 및 소독 내역', icon: <Archive size={20} />, path: '/supply/sterilization' },
    { name: '청소관리', icon: <Droplets size={20} />, path: '/supply/cleaning' },
    { name: 'A/S관리', icon: <Wrench size={20} />, path: '/supply/as' },
    { name: '거래처 관리', icon: <Users size={20} />, path: '/supply/vendors' },
    { name: '환경설정', icon: <Settings size={20} />, path: '/supply/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* 1열: Sidebar 영역 */}
      <aside className="w-64 bg-[#16A34A] text-white flex flex-col shadow-xl z-10 transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">중앙공급실</h2>
          <p className="text-green-100 text-sm mt-1">DENTi-Ai Supply</p>
        </div>
        
        <nav className="flex-1 mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/supply'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                      isActive 
                        ? 'bg-white text-[#16A34A] font-bold shadow-md' 
                        : 'text-green-50 hover:bg-green-700/50 hover:text-white'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-green-700/50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-green-100 hover:bg-green-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>메인(대시보드)으로</span>
          </button>
        </div>
      </aside>

      {/* 2열: Content 영역 */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SupplyLayout;
