import React, { useState } from 'react';
import SignUpModal from './SignUpModal';

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    hospitalId: '',
    email: '',
    password: ''
  });
  
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 개발용 백도어 로직 (최고시스템관리자)
    if (formData.email === '1' && formData.password === '1') {
      alert('최고시스템관리자 권한으로 로그인되었습니다.');
      localStorage.setItem('isAuthenticated', 'true');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      return;
    }

    // TODO: 정상 Login API 호출 로직 (JWT 발급 및 Role 확인)
    console.log('Login attempt:', formData);
    alert('구현 중인 기능입니다. 개발용 백도어(ID: 1, PW: 1)를 이용해주세요.');
  };

  return (
    <div className="min-h-screen bg-[#1A365D] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A365D] mb-2">DENTi-Ai</h1>
          <p className="text-gray-500 text-sm">WAYN-Ai 통합 로그인</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회원병원 ID (Hospital ID)</label>
            <input 
              type="text" 
              name="hospitalId"
              value={formData.hospitalId}
              onChange={handleChange}
              placeholder="예: WAYN-001" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A365D] focus:border-transparent outline-none transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소 (Email / ID)</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@hospital.com" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A365D] focus:border-transparent outline-none transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 (Password)</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A365D] focus:border-transparent outline-none transition"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1A365D] text-white font-semibold py-3 rounded-lg hover:bg-[#132847] transition duration-200 mt-6"
          >
            로그인
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">아직 회원이 아니신가요?</p>
          <button 
            type="button"
            className="text-[#1A365D] font-semibold hover:underline mt-1"
            onClick={() => setIsSignUpModalOpen(true)}
          >
            병원 도입 문의 / 회원가입
          </button>
        </div>
      </div>
      
      {isSignUpModalOpen && (
        <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />
      )}
    </div>
  );
}
