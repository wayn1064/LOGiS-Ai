import { useState } from 'react';
import { Search, Filter, Plus, Package } from 'lucide-react';
import { dentalProducts } from '../../../shared/lib/mockData';
import { ProductRegistrationModal } from './ProductRegistrationModal';
import { useCategories } from '../../../shared/lib/CategoryContext';

export const ProductList = () => {
  const [activeTab, setActiveTab] = useState('전체상품');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { categories } = useCategories();

  // 필터링 로직
  const filteredProducts = dentalProducts.filter(product => {
    const matchTab = activeTab === '전체상품' || product.category === activeTab;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       product.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header & Actions */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-800" />
            상품목록
          </h2>
          <p className="text-sm text-slate-500 mt-1">치과 전용 모든 상품 및 재고를 카테고리별로 조회합니다.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text"
              placeholder="상품명 또는 코드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={16} /> 필터
          </button>
          <button 
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A365D] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm"
          >
            <Plus size={16} /> 새 상품 등록
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="border-b border-slate-200 bg-slate-50/50">
        <div className="flex overflow-x-auto hide-scrollbar whitespace-nowrap p-2 px-6 gap-2">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 shrink-0
                ${activeTab === tab 
                  ? 'bg-blue-100 text-blue-900 border border-blue-200 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200/50 border border-transparent'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Table Area */}
      <div className="flex-1 overflow-auto bg-slate-50/30 p-6">
        {filteredProducts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Package className="h-12 w-12 mb-3 text-slate-300" />
            <p>선택하신 카테고리에 해당하는 상품이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-6 py-4">상품코드</th>
                  <th className="px-6 py-4">카테고리</th>
                  <th className="px-6 py-4">상품명</th>
                  <th className="px-6 py-4">제조사</th>
                  <th className="px-6 py-4">규격</th>
                  <th className="px-6 py-4 text-right">단가</th>
                  <th className="px-6 py-4 text-center">재고</th>
                  <th className="px-6 py-4 text-center">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(product => (
                  <tr 
                    key={product.id} 
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{product.code}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{product.name}</td>
                    <td className="px-6 py-4 text-slate-600">{product.manufacturer}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{product.spec}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-700">{product.price.toLocaleString()}원</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.isActive ? (
                        <span className="text-blue-600 text-xs font-medium">판매중</span>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">단종</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
      />
    </div>
  );
};
