import React, { createContext, useContext, useState } from 'react';

const INITIAL_CATEGORIES = [
  '전체상품', '기공용 장비/기구', '기공용 재료', '예장/구강관리', '교정',
  '임플란트', '위생/기타', '치과장비', '진료장비', '진료용기구', '보철재료',
  '인상재료', '수복/접착재료', '보존/엔도재료', '절삭/연마재료'
];

interface CategoryContextType {
  categories: string[];
  addCategory: (idx: number, name: string) => void;
  updateCategory: (idx: number, newName: string) => void;
  removeCategory: (idx: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);

  const addCategory = (idx: number, name: string) => {
    // 0번인 '전체상품' 뒤에 추가하거나 맨 끝에 추가
    setCategories(prev => {
      const newCats = [...prev];
      if (idx === -1) newCats.push(name);
      else newCats.splice(idx, 0, name);
      return newCats;
    });
  };

  const updateCategory = (idx: number, newName: string) => {
    // 0번 전체상품은 이름 변경 금지하지만 일단 자유롭게
    if (idx === 0 && newName !== '전체상품') return;
    setCategories(prev => {
      const newCats = [...prev];
      newCats[idx] = newName;
      return newCats;
    });
  };

  const removeCategory = (idx: number) => {
    // 0번 전체상품 삭제 금지
    if (idx === 0) return;
    setCategories(prev => {
      const newCats = [...prev];
      newCats.splice(idx, 1);
      return newCats;
    });
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
