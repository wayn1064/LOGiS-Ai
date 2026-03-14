import { Package, AlertTriangle, PenTool, CheckCircle } from 'lucide-react';

const SupplyDashboard = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E293B]">공급실 대시보드</h1>
        <p className="text-[#6B7280] mt-2">중앙공급실의 핵심 지표 및 현황을 한눈에 파악합니다.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-[#16A34A]">
          <div className="p-3 bg-green-50 rounded-xl text-[#16A34A]">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">전체 관리 물품</p>
            <h3 className="text-2xl font-bold text-gray-800">1,245<span className="text-sm font-normal text-gray-400 ml-1">개</span></h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="p-3 bg-red-50 rounded-xl text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">재고 부족 물품</p>
            <h3 className="text-2xl font-bold text-gray-800">12<span className="text-sm font-normal text-gray-400 ml-1">건</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
            <PenTool size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">진행 중 발주</p>
            <h3 className="text-2xl font-bold text-gray-800">3<span className="text-sm font-normal text-gray-400 ml-1">건</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">금일 멸균 완료</p>
            <h3 className="text-2xl font-bold text-gray-800">8<span className="text-sm font-normal text-gray-400 ml-1">회</span></h3>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> 
            재고 부족 알림 (Top 5)
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">멸균 거즈 (10x10) - Box</span>
                  <span className="text-xs text-red-500 font-semibold">적정 재고 미달 (현재 2 Box)</span>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold bg-[#16A34A] text-white rounded-lg shadow-sm hover:bg-green-700 transition">
                  발주 등록
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            최근 결재/발주 현황
          </h2>
          <div className="space-y-4">
             {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <PenTool size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">오스템 임플란트 픽스처 발주</p>
                  <p className="text-xs text-gray-500">2026-03-12 10:30 • 결재 승인 완료</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-600">
                  승인 완료
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyDashboard;
