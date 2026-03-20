import { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Warehouse, LayoutDashboard, Truck, ClipboardList, Settings, Menu, Bell, ChevronDown, ChevronRight, PackageSearch, MapPin } from 'lucide-react';
import { logisticsCenters, currentUser } from '../../../shared/lib/mockData';
import { mockPubSub } from '../../../shared/lib/mockPubSub';
import { ProductList } from './ProductList';
import { SettingsPage } from './SettingsPage';

export const HospitalLayout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [centerName, setCenterName] = useState('');
  const [isInventoryMenuOpen, setIsInventoryMenuOpen] = useState(false);
  
  useEffect(() => {
    // Verify center and access
    const center = logisticsCenters.find(h => h.id === id);
    if (!center) {
      navigate('/');
      return;
    }

    const hasAccess = 
      currentUser.customClaims.accessibleModules.includes('all') || 
      currentUser.customClaims.accessibleModules.includes(center.id);
    const isDenied = currentUser.customClaims.deniedModules?.includes(center.id);

    if (!hasAccess || isDenied) {
      navigate('/');
      return;
    }

    setCenterName(center.name);
    
    // Simulate PubSub init event
    mockPubSub.publish('center_init', { centerId: id, name: center.name });
  }, [id, navigate]);

  const navItems = [
    { label: 'WMS 대시보드', path: `/hospital/${id}`, icon: <LayoutDashboard size={20} /> },
    { label: '수배송/배차 현황', path: `/hospital/${id}/dispatch`, icon: <Truck size={20} /> },
    { label: '입출고 관리', path: `/hospital/${id}/inout`, icon: <ClipboardList size={20} /> },
    { label: '환경설정', path: `/hospital/${id}/settings`, icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* Sidebar 1-Column */}
      <aside className="w-64 bg-[#0A1128] border-r border-[#102A43] text-slate-300 flex flex-col pt-4 shadow-xl z-20">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Warehouse className="text-white" size={22} />
          </div>
          <div>
            <div className="text-xs text-blue-400 font-semibold tracking-widest uppercase">LOGiS-Ai 허브</div>
            <div className="font-bold text-lg text-white leading-tight truncate">{centerName}</div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname === item.path + '/';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600/20 text-blue-400 font-medium border border-blue-500/20 shadow-inner' 
                    : 'hover:bg-white/5 hover:text-white'
                  }`}
              >
                <div className={`${isActive ? 'text-blue-400' : 'text-slate-400'}`}>{item.icon}</div>
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* 물류/자재 전용 메뉴: 재고관리 */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Inventory</div>
            <button
              onClick={() => setIsInventoryMenuOpen(!isInventoryMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <PackageSearch className="text-slate-400" size={20} />
                <span>재고/품목 관리</span>
              </div>
              {isInventoryMenuOpen ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
            </button>
            
            {/* 상품관리 서브메뉴 */}
            {isInventoryMenuOpen && (
              <div className="mt-2 ml-4 space-y-1 border-l border-white/10 pl-3">
                <Link
                  to={`/hospital/${id}/products`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm
                    ${location.pathname.includes('/products') 
                      ? 'bg-blue-600/20 text-blue-400 font-medium border-l-2 border-blue-500 -ml-[13px]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  품목 마스터
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5 bg-[#060B19]">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
          >
            <MapPin size={18} />
            <span>다른 허브 선택</span>
          </button>
        </div>
      </aside>

      {/* Content Area 2-Column */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex flex-row items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4 text-slate-500">
            <Menu className="h-5 w-5 cursor-pointer hover:text-blue-600 transition-colors" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {navItems.find(i => location.pathname === i.path || location.pathname === i.path + '/')?.label || '대시보드'}
            </h2>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer group">
              <Bell className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{currentUser.name}</div>
                <div className="text-xs font-medium text-slate-400">{currentUser.customClaims.role}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 border border-blue-200/50 flex items-center justify-center font-bold shadow-sm group-hover:shadow transition-all">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Routes>
              <Route path="/" element={<DashboardContent centerName={centerName} />} />
              <Route path="/dispatch" element={<PlaceholderContent title="수배송/배차 현황 모듈" />} />
              <Route path="/inout" element={<PlaceholderContent title="입출고 관리 모듈" />} />
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
const DashboardContent = ({ centerName }: { centerName: string }) => (
  <div className="space-y-6">
    <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{centerName} 물류 현황</h3>
        <p className="text-slate-500">오늘의 출고 지연 건수 및 리드타임 지표를 확인하세요.</p>
      </div>
      <button className="relative z-10 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
        신규 배차 등록
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="text-sm font-medium text-slate-500 mb-1">금일 출고 예정</div>
        <div className="text-3xl font-bold text-slate-800">1,284<span className="text-lg font-medium text-slate-400 ml-1">건</span></div>
        <div className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">↑ 어제 대비 12% 증가</div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="text-sm font-medium text-slate-500 mb-1">입고 대기</div>
        <div className="text-3xl font-bold text-slate-800">342<span className="text-lg font-medium text-slate-400 ml-1">건</span></div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="text-sm font-medium text-slate-500 mb-1">가용 배차 차량</div>
        <div className="text-3xl font-bold text-slate-800">45<span className="text-lg font-medium text-slate-400 ml-1">대</span></div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="text-sm font-medium text-slate-500 mb-1">출고 지연 경고</div>
        <div className="text-3xl font-bold text-red-500">12<span className="text-lg font-medium text-red-400 ml-1">건</span></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400">
        배송 흐름 차트 영역
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm min-h-[300px] flex flex-col">
        <h4 className="font-bold text-slate-800 mb-4">최근 경고 로그</h4>
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          내역이 없습니다.
        </div>
      </div>
    </div>
  </div>
);

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="bg-white p-12 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
    <div className="relative z-10 h-20 w-20 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center mb-6 border border-blue-100 shadow-inner">
      <Warehouse size={40} strokeWidth={1.5} />
    </div>
    <h3 className="relative z-10 text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">{title}</h3>
    <p className="relative z-10 text-slate-500 max-w-md leading-relaxed">
      해당 모듈은 현재 글로벌 SCM 표준에 맞추어 설계 및 개발이 진행 중입니다. 
      <br/><span className="text-blue-600 font-medium">완전 격리된 FSD 아키텍처</span>에 따라 독립 배포가 가능하도록 준비됩니다.
    </p>
  </div>
);
