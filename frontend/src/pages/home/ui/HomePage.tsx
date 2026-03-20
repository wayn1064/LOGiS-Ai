import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Warehouse, Ship, Plane, AlertCircle, Truck } from 'lucide-react';
import { logisticsCenters, currentUser } from '../../../shared/lib/mockData';
import { Card } from '../../../shared/ui/Card';

export const HomePage = () => {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  const handleCardClick = (centerId: string, centerName: string) => {
    const hasAccess = 
      currentUser.customClaims.accessibleModules.includes('all') || 
      currentUser.customClaims.accessibleModules.includes(centerId);
      
    const isDenied = currentUser.customClaims.deniedModules?.includes(centerId);

    if (!hasAccess || isDenied) {
      setToastMsg(`[${centerName}] 접근 권한이 없습니다.`);
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    // Navigate to hospital main program (Keep original URL structure for now)
    navigate(`/hospital/${centerId}`);
  };

  const getIcon = (category: string) => {
    switch(category) {
      case 'Hub': return <Warehouse className="h-6 w-6" />;
      case 'Port': return <Ship className="h-6 w-6" />;
      case 'Airport': return <Plane className="h-6 w-6" />;
      case 'ColdChain': return <MapPin className="h-6 w-6 text-blue-300" />;
      default: return <Truck className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-800" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">
              LOGiS-Ai
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">
              환영합니다, <span className="font-semibold text-slate-900">{currentUser.name}</span>님
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200">
              {currentUser.name.charAt(0)}
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
              }}
              className="ml-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">통합 물류 센터 선택</h1>
          <p className="text-slate-500">배차명령 및 관리할 물류 센터/허브를 선택하여 WMS 대시보드로 이동하세요.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logisticsCenters.map((center) => {
            const isDenied = currentUser.customClaims.deniedModules?.includes(center.id);
            return (
              <Card
                key={center.id}
                onClick={() => handleCardClick(center.id, center.name)}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-300 group
                  hover:shadow-md hover:-translate-y-1 hover:border-blue-400
                  ${isDenied ? 'opacity-50 grayscale cursor-not-allowed hover:translate-y-0 hover:shadow-sm' : ''}
                `}
              >
                <div className="p-5 flex flex-col items-center justify-center text-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100">
                    {getIcon(center.category)}
                  </div>
                  <h3 className="font-semibold text-slate-800">{center.name}</h3>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium">{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};
