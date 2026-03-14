import { Wrench, PhoneCall, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';

interface AsRequest {
  id: string;
  equipmentName: string;
  vendor: string;
  requestDate: string;
  issue: string;
  status: 'REPAIR_IN_PROGRESS' | 'REPAIR_COMPLETED' | 'NEED_INSPECTION';
  isLoanerUsed: boolean;
}

const MOCK_AS_LOGS: AsRequest[] = [
  { id: 'AS-260312-1', equipmentName: '신흥 유니트체어 3번', vendor: '신흥 영남영업소', requestDate: '2026-03-12', issue: '타구 배수 불량 및 석션 모터 소음', status: 'REPAIR_IN_PROGRESS', isLoanerUsed: false },
  { id: 'AS-260310-2', equipmentName: 'NSK 하이스피드 핸드피스', vendor: '오스템임플란트', requestDate: '2026-03-10', issue: '버 빠짐 현상 (카트리지 교체 요망)', status: 'REPAIR_IN_PROGRESS', isLoanerUsed: true },
  { id: 'AS-260305-1', equipmentName: '포터블 엑스레이 (EzRay)', vendor: '바텍코리아', requestDate: '2026-03-05', issue: '방사선 조사 버튼 인식 오류', status: 'REPAIR_COMPLETED', isLoanerUsed: true },
  { id: 'AS-260301-1', equipmentName: '오토클레이브 B-Class', vendor: '한신메디칼', requestDate: '2026-03-01', issue: '정기 점검 (연 1회)', status: 'NEED_INSPECTION', isLoanerUsed: false },
];

const StatusBadge = ({ status }: { status: AsRequest['status'] }) => {
  switch (status) {
    case 'REPAIR_COMPLETED':
      return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold w-fit"><CheckCircle2 size={14} /> 수리 완료</span>;
    case 'REPAIR_IN_PROGRESS':
      return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md text-xs font-bold w-fit"><Wrench size={14} /> 수리 진행 중</span>;
    case 'NEED_INSPECTION':
      return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold w-fit"><AlertTriangle size={14} /> 점검 필요</span>;
    default:
      return null;
  }
};

const SupplyAs = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">장비 A/S 관리</h1>
          <p className="text-[#6B7280] mt-1">병원 내 주요 의료 장비의 고장 신고, 수리 진행 상태 및 대체 장비 현황을 추적합니다.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#16A34A] text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-sm whitespace-nowrap">
          <Plus size={18} />
          A/S 접수하기
        </button>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <h3 className="font-bold text-gray-500 mb-2">진행 중인 A/S</h3>
            <p className="text-3xl font-bold text-[#16A34A]">2<span className="text-sm text-gray-400 ml-1 font-medium">건</span></p>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center border-l-4 border-l-amber-500">
            <h3 className="font-bold text-gray-500 mb-2">대체 장비(Loaner) 운용</h3>
            <p className="text-3xl font-bold text-amber-600">1<span className="text-sm text-gray-400 ml-1 font-medium">건</span></p>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><PhoneCall size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-800">주요 벤더 연락망</h3>
                <p className="text-sm text-blue-600 font-semibold mt-1">연락처 보기 &rarr;</p>
              </div>
            </div>
         </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-sm font-semibold text-gray-500">
                <th className="py-4 px-6">접수 번호 (일자)</th>
                <th className="py-4 px-6">장비명 및 모델</th>
                <th className="py-4 px-6">신고 내용 (증상)</th>
                <th className="py-4 px-6">담당 업체</th>
                <th className="py-4 px-6 text-center">대체 장비</th>
                <th className="py-4 px-6">처리 상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_AS_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-mono text-sm text-gray-500">{log.id}</span>
                      <span className="font-bold text-gray-800 mt-0.5">{log.requestDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <span className="font-bold text-[#1A365D] block">{log.equipmentName}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate" title={log.issue}>
                    {log.issue}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                      {log.vendor}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {log.isLoanerUsed ? (
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">사용중</span>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplyAs;
