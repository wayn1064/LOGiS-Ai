import { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, Users, UserCog, Settings, LogOut, Menu, Bell, Package, ChevronDown, ChevronRight } from 'lucide-react';
import { medicalTypes, currentUser } from '../../../shared/lib/mockData';
import { mockPubSub } from '../../../shared/lib/mockPubSub';
import { ProductList } from './ProductList';
import { SettingsPage } from './SettingsPage';

export const HospitalLayout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalCategory, setHospitalCategory] = useState('');
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Verify hospital and access
    const hospital = medicalTypes.find(h => h.id === id);
    if (!hospital) {
      navigate('/');
      return;
    }

    const hasAccess = 
      currentUser.customClaims.accessibleModules.includes('all') || 
      currentUser.customClaims.accessibleModules.includes(hospital.id);
    const isDenied = currentUser.customClaims.deniedModules?.includes(hospital.id);

    if (!hasAccess || isDenied) {
      navigate('/');
      return;
    }

    setHospitalName(hospital.name);
    setHospitalCategory(hospital.category);
    
    // Simulate PubSub init event
    mockPubSub.publish('hospital_init', { hospitalId: id, name: hospital.name });
  }, [id, navigate]);

  const navItems = [
    { label: '대시보드', path: `/hospital/${id}`, icon: <LayoutDashboard size={20} /> },
    { label: '환자관리', path: `/hospital/${id}/patients`, icon: <Users size={20} /> },
    { label: '스태프관리', path: `/hospital/${id}/staff`, icon: <UserCog size={20} /> },
    { label: '환경설정', path: `/hospital/${id}/settings`, icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* Sidebar 1-Column */}
      <aside className="w-64 bg-[#1A365D] text-white flex flex-col pt-4">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <div className="text-sm text-blue-200 font-medium tracking-wider uppercase">LOGiS-Ai Workspace</div>
            <div className="font-bold text-lg leading-tight truncate">{hospitalName}</div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname === item.path + '/';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-600/50 text-white font-medium border border-blue-500/30' 
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* 치과(Dental) 전용 메뉴: 상품관리 */}
          {hospitalCategory === 'Dental' && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-2">물류/자재</div>
              <button
                onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-blue-100 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <span>상품관리</span>
                </div>
                {isProductsMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {/* 상품관리 서브메뉴 */}
              {isProductsMenuOpen && (
                <div className="mt-1 ml-4 space-y-1 border-l-2 border-white/10 pl-2">
                  <Link
                    to={`/hospital/${id}/products`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm
                      ${location.pathname.includes('/products') 
                        ? 'bg-blue-600/30 text-white font-medium border-l-2 border-blue-400 -ml-[10px]' 
                        : 'text-blue-200 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                    상품목록
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>시스템 선택으로</span>
          </button>
        </div>
      </aside>

      {/* Content Area 2-Column */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex flex-row items-center justify-between z-10">
          <div className="flex items-center gap-4 text-slate-500">
            <Menu className="h-5 w-5 cursor-pointer hover:text-slate-800 transition-colors" />
            <h2 className="text-xl font-semibold text-slate-800">
              {navItems.find(i => location.pathname === i.path || location.pathname === i.path + '/')?.label || '대시보드'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-700">{currentUser.name}</div>
                <div className="text-xs text-slate-500">{currentUser.customClaims.role}</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 text-[#1A365D] border border-slate-200 flex items-center justify-center font-bold">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardContent hospitalName={hospitalName} />} />
              <Route path="/patients" element={<PlaceholderContent title="환자관리 모듈" />} />
              <Route path="/staff" element={<PlaceholderContent title="스태프관리 모듈" />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

// Temp components for child routes
const DashboardContent = ({ hospitalName }: { hospitalName: string }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{hospitalName} 대시보드</h3>
        <p className="text-sm text-slate-500">오늘의 주요 현황을 한눈에 확인하세요.</p>
      </div>
      <button className="px-4 py-2 bg-[#1A365D] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
        빠른 등록
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-48 flex items-center justify-center text-slate-400">
        차트 위젯 1
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-48 flex items-center justify-center text-slate-400">
        차트 위젯 2
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-48 flex items-center justify-center text-slate-400">
        최근 활동 내역
      </div>
    </div>
  </div>
);

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
      <Building2 size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-700 mb-2">{title}</h3>
    <p className="text-slate-500 max-w-md">
      해당 모듈은 현재 설계 및 개발 진행 중입니다. FSD 아키텍처 규칙에 따라 독립된 모듈로 분리되어 구현될 예정입니다.
    </p>
  </div>
);
