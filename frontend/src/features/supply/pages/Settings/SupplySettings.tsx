import { BellRing, Shield, Sliders, Save } from 'lucide-react';

const SupplySettings = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">환경설정</h1>
          <p className="text-[#6B7280] mt-1">중앙공급실 모듈의 시스템 기본 설정 및 알림, 권한을 제어합니다.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1A365D] text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-900 transition shadow-sm whitespace-nowrap">
          <Save size={18} />
          변경사항 저장
        </button>
      </header>

      <div className="space-y-6">
        {/* 알림 설정 */}
        <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><BellRing size={20} /></div>
            <h2 className="text-xl font-bold text-gray-800">알림 (Notification) 설정</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
               <div>
                  <h4 className="font-semibold text-gray-800">안전재고 부족 경고 알림</h4>
                  <p className="text-sm text-gray-500">재고가 설정된 안전재고 아래로 떨어질 때 알림을 보냅니다.</p>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
               </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
               <div>
                  <h4 className="font-semibold text-gray-800">발주 결재 승인/반려 카카오알림톡 전송</h4>
                  <p className="text-sm text-gray-500">원장실 결재 상태 변경 시 모바일로 즉시 알림을 받습니다.</p>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
               </label>
            </div>
            
            <div className="flex items-center justify-between py-3">
               <div>
                  <h4 className="font-semibold text-gray-800">A/S 진행 상태 업데이트 알림</h4>
                  <p className="text-sm text-gray-500">거래처에서 파악한 장비 수리 진행현황을 공지받습니다.</p>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
               </label>
            </div>
          </div>
        </section>

        {/* 시스템/코드 설정 */}
        <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Sliders size={20} /></div>
            <h2 className="text-xl font-bold text-gray-800">품목 분류 및 기준치 설정</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">유효기간 '임박' 알림 기준 (일)</label>
                <input type="number" defaultValue="30" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16A34A]" />
                <p className="text-xs text-gray-500 mt-1">입력된 일 수 이하로 남은 품목은 붉은색 배치 표기</p>
             </div>
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">생물학적 인디케이터 기본 배양 시간 (시간)</label>
                <input type="number" defaultValue="24" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#16A34A]" />
             </div>
          </div>
        </section>

        {/* 권한 관리 */}
        <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 opacity-80">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Shield size={20} /></div>
            <h2 className="text-xl font-bold text-gray-800">접근 권한 관리 <span className="text-xs ml-2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">관리자 전용</span></h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">발주 시스템 승인 라인 및 멸균 일지 전결 권한자는 최고 관리자 메뉴에서 설정할 수 있습니다.</p>
          <button className="text-sm font-semibold text-[#1A365D] hover:underline">관리자 페이지로 이동 &rarr;</button>
        </section>
      </div>
    </div>
  );
};

export default SupplySettings;
