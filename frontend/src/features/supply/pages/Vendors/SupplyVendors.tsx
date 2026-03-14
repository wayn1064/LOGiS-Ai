import { Building2, Phone, Mail, FileText, Plus, Star } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  recentOrderDate: string;
  isFavorite: boolean;
}

const MOCK_VENDORS: Vendor[] = [
  { id: 'VND-001', name: '오스템임플란트', category: '임플란트/재료', contactPerson: '김영업 대리', phone: '010-1234-5678', email: 'sales@osstem.mock', rating: 5, recentOrderDate: '2026-03-12', isFavorite: true },
  { id: 'VND-002', name: '신흥', category: '장비/재료', contactPerson: '박상무 과장', phone: '010-9876-5432', email: 'sales@shinhung.mock', rating: 4, recentOrderDate: '2026-03-05', isFavorite: true },
  { id: 'VND-003', name: '세일글로발', category: '소모품', contactPerson: '이소분 주임', phone: '051-123-4567', email: 'order@seil.mock', rating: 4, recentOrderDate: '2026-03-11', isFavorite: false },
  { id: 'VND-004', name: '한신메디칼', category: '멸균장비', contactPerson: '최기사', phone: '02-987-6543', email: 'as@hanshin.mock', rating: 5, recentOrderDate: '2025-12-10', isFavorite: false },
];

const SupplyVendors = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">거래처 관리</h1>
          <p className="text-[#6B7280] mt-1">치과 내외의 장비, 소모품, 약품 관련 주요 협력업체의 연락망과 발주 이력을 관리합니다.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#16A34A] text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-sm whitespace-nowrap">
          <Plus size={18} />
          새 거래처 등록
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MOCK_VENDORS.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 relative group">
            <button className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 transition" title="즐겨찾기">
              <Star size={20} className={vendor.isFavorite ? "fill-yellow-400 text-yellow-400" : ""} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-50 text-[#16A34A] rounded-full flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{vendor.name}</h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{vendor.category}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserIcon /> <span className="font-medium text-gray-800">{vendor.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gray-400" /> {vendor.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" /> <span className="truncate">{vendor.email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span className="block font-semibold">최근 발주/문의</span>
                {vendor.recentOrderDate}
              </div>
              <button className="bg-gray-50 hover:bg-[#16A34A] hover:text-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                <FileText size={14} /> 상세 이력
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default SupplyVendors;
