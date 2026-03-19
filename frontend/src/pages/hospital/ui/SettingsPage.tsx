import { useState } from 'react';
import { Settings2, Plus, Edit2, Trash2, Check, X, GripVertical } from 'lucide-react';
import { useCategories } from '../../../shared/lib/CategoryContext';

export const SettingsPage = () => {
  const { categories, addCategory, updateCategory, removeCategory } = useCategories();
  
  const [addingNew, setAddingNew] = useState(false);
  const [tempNewCatName, setTempNewCatName] = useState('');
  
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddNew = () => {
    if (!tempNewCatName.trim()) return;
    addCategory(-1, tempNewCatName.trim());
    setTempNewCatName('');
    setAddingNew(false);
  };

  const startEditing = (idx: number, name: string) => {
    if (idx === 0) return; // '전체상품' is fixed
    setEditingIdx(idx);
    setEditValue(name);
  };

  const saveEdit = (idx: number) => {
    if (!editValue.trim()) return;
    updateCategory(idx, editValue.trim());
    setEditingIdx(null);
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setEditValue('');
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2 mb-2">
          <Settings2 className="h-6 w-6 text-blue-800" />
          환경설정
        </h2>
        <p className="text-sm text-slate-500">시스템의 전반적인 규칙과 분류, 분류 코드를 관리합니다.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex overflow-hidden">
        {/* Settings Side Navigation */}
        <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">시스템 관리</h3>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg">
                제품 카테고리 관리
              </button>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                코드 관리
              </button>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                권한 설정
              </button>
            </li>
          </ul>
        </div>

        {/* Setting Content Area */}
        <div className="flex-1 flex flex-col p-8 bg-white overflow-y-auto">
          <div className="max-w-3xl w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">제품 카테고리 설정</h3>
                <p className="text-sm text-slate-500 mt-1">상품의 탭 메뉴에 표시되는 카테고리를 편집합니다.</p>
              </div>
              <button 
                onClick={() => setAddingNew(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} /> 신규 카테고리 추가
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
              <ul className="divide-y divide-slate-100">
                {categories.map((cat, idx) => (
                  <li key={`${idx}_${cat}`} className="flex items-center py-3 px-4 hover:bg-white transition-colors group">
                    <div className="mr-3 text-slate-300">
                      <GripVertical size={18} />
                    </div>
                    
                    {editingIdx === idx ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input 
                          type="text" 
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(idx)}
                          className="flex-1 bg-white border border-blue-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <button onClick={() => saveEdit(idx)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md">
                          <Check size={18} />
                        </button>
                        <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="font-medium text-slate-700">{cat}</span>
                          {idx === 0 && (
                            <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-semibold">고정</span>
                          )}
                        </div>
                        {idx !== 0 && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => startEditing(idx, cat)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="수정"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`'${cat}' 카테고리를 삭제하시겠습니까?`)) {
                                  removeCategory(idx);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="삭제"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}

                {addingNew && (
                  <li className="flex items-center py-3 px-4 bg-blue-50/50">
                    <div className="mr-3 text-transparent">
                      <GripVertical size={18} />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="새 카테고리명"
                        value={tempNewCatName}
                        onChange={(e) => setTempNewCatName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
                        className="flex-1 bg-white border border-blue-300 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button onClick={handleAddNew} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md font-medium text-sm">
                        추가
                      </button>
                      <button onClick={() => setAddingNew(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md font-medium text-sm">
                        취소
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
