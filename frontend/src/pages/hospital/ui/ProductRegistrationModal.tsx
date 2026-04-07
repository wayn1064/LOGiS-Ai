import { useState, useRef } from 'react';
import { X, PackagePlus, UploadCloud, Barcode, Building2, Calendar, Settings2 } from 'lucide-react';
import axios from 'axios';
import { mockPubSub } from '../../../shared/lib/mockPubSub';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export const ProductRegistrationModal = ({ isOpen, onClose, product }: Props) => {
  const [isInsuranceItem, setIsInsuranceItem] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form 상태 관리
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '재료',
    price: product?.price || '',
    stock: product?.stock || '',
    manufacturer: product?.manufacturer || '',
    spec: product?.spec || '',
    code: product?.code || '',
    barcode: product?.barcode || '',
    lotNumber: product?.lotNumber || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      alert('이미지 파일은 500KB 이하만 업로드 가능합니다.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('제품명을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        tenantId: 'hospital-1', // Mock tenant ID for multi-tenant architecture
        ...formData,
        isInsurance: isInsuranceItem,
      };

      const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';
      await axios.post(`${API_URL}/api/products`, payload);
      
      alert('상품이 성공적으로 등록되었습니다.');
      // Pub/Sub 이벤트를 통해 상태 강제 리렌더링 유발
      mockPubSub.publish('PRODUCT_LIST_REFRESH');
      onClose();
    } catch (error) {
      console.error('등록 실패:', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div 
        key={product?.id || 'new'}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-green-700" />
            <h2 className="text-lg font-bold text-green-800">
              {product ? '상품 정보 수정' : '신규 상품 등록'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 text-sm bg-slate-50/50">
          
          {/* Top Row: Name & Category */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 space-y-2">
              <label className="font-semibold text-slate-700 flex items-center gap-1">
                제품명 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="제품명을 입력하세요" 
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 flex items-center gap-1">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-slate-700"
              >
                <option value="재료">재료</option>
                <option value="장비">장비</option>
                <option value="기구">기구</option>
                <option value="기초재료">기초재료</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            
            {/* Left Column: 품목 주요 정보 */}
            <div className="space-y-6">
              <div className="pb-2 border-b-2 border-green-600 inline-block w-full">
                <h3 className="text-base font-bold text-green-700 flex items-center gap-2">
                  <PackagePlus className="w-4 h-4" /> 품목 주요 정보
                </h3>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700">제품 사진</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/80 hover:bg-slate-50 transition-colors h-36 flex flex-col items-center justify-center cursor-pointer group overflow-hidden relative"
                >
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {previewImage ? (
                    <img src={previewImage} alt="미리보기" className="w-full h-full object-contain p-2" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-green-500 mb-2 transition-colors" />
                      <span className="text-xs text-slate-400 font-medium group-hover:text-green-600">클릭하여 이미지 파일 업로드 (Max 500KB)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Barcode */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700">바코드</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Barcode className="w-4 h-4 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    placeholder="바코드 스캐너 입력 가능"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* LOT */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700">LOT 번호</label>
                <input 
                  type="text" 
                  name="lotNumber"
                  value={formData.lotNumber}
                  onChange={handleChange}
                  placeholder="입고된 제품의 LOT 번호"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-slate-400"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700">공급 가격 (원)</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-800 outline-none focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">현재 재고</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-green-600 outline-none focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">안전 재고</label>
                  <input 
                    type="number" 
                    defaultValue="0"
                    disabled
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-orange-500 outline-none focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: 관리 상세 정보 */}
            <div className="space-y-6">
              <div className="pb-2 border-b-2 border-blue-500 inline-block w-full">
                <h3 className="text-base font-bold text-blue-600 flex items-center gap-2">
                  <Settings2 className="w-4 h-4" /> 관리 상세 정보
                </h3>
              </div>

              {/* Item No */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700">품목 번호</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none font-bold text-slate-400">#</div>
                  <input 
                    type="text" 
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="내부 관리용 품목 번호"
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Specs row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">규격 (Size)</label>
                  <input 
                    type="text" 
                    name="spec"
                    value={formData.spec}
                    onChange={handleChange}
                    placeholder="예: 4.0x10"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">포장 단위</label>
                  <input 
                    type="text" 
                    placeholder="EA, Box 등"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">수량</label>
                  <input 
                    type="text" 
                    placeholder="수량"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 text-right focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Maker row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">제조사</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      placeholder="제조기업"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">수입사</label>
                  <input 
                    type="text" 
                    placeholder="수입 대행사 명"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Vendor row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">유통사</label>
                  <input 
                    type="text" 
                    placeholder="주요 납품 라인"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-slate-700">유통 기한</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="연도. 월. 일."
                      className="w-full pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance toggle */}
              <div className="mt-4 p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-800 text-sm mb-1">치과재료대 구입 신고 품목</h4>
                  <p className="text-xs text-blue-500 font-medium">건강보험심사평가원(심평원) 신고 대상인 경우 체크하세요.</p>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setIsInsuranceItem(!isInsuranceItem)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isInsuranceItem ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isInsuranceItem ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50 gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            취소
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-bold rounded-lg shadow-sm transition-colors active:scale-[0.98] ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#10b981] hover:bg-[#059669]'
            }`}
          >
            <PackagePlus size={18} />
            {isLoading ? '처리 중...' : (product ? '수정하기' : '등록하기')}
          </button>
        </div>
      </div>
    </div>
  );
};
