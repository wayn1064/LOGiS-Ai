import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    hospitalId: '',
    email: '',
    password: ''
  });

  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 식별번호(Device ID) 생성 및 로드
    let storedId = localStorage.getItem('WAYN_DEVICE_ID');
    if (!storedId) {
      storedId = 'DEV-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('WAYN_DEVICE_ID', storedId);
    }
    setDeviceId(storedId);
  }, []);

  const getApiUrl = () => {
    return import.meta.env.VITE_WAYN_AI_API_URL || 'http://localhost:5001';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 개발용 백도어 로직
    if (formData.email === '1' && formData.password === '1') {
      alert('최고시스템관리자 권한으로 로그인되었습니다. (백도어)');
      localStorage.setItem('isAuthenticated', 'true');
      if (onLoginSuccess) onLoginSuccess();
      return;
    }

    setIsLoading(true);
    try {
      const BASE_URL = getApiUrl();
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        hospitalCode: formData.hospitalId,
        email: formData.email,
        password: formData.password,
        deviceId: deviceId
      });

      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        if (onLoginSuccess) onLoginSuccess();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('서버와의 통신에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!formData.hospitalId || !formData.email || !formData.password) {
      alert("회원병원 ID, 이메일 주소, 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const BASE_URL = getApiUrl();
      const response = await axios.post(`${BASE_URL}/api/tenants/join`, {
        hospitalCode: formData.hospitalId,
        email: formData.email,
        password: formData.password,
        deviceId: deviceId
      });

      if (response.status === 201 || response.status === 200) {
        alert("모든 기기 인증 정보 및 가입 내역이 본사로 전송되었습니다.\n승인 대기 중 상태입니다.");
      }
    } catch (error: any) {
      console.error('Join error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('서버와의 통신에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A365D] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A365D] mb-2">DENTi-Ai</h1>
          <p className="text-gray-500 text-sm">기기 인증 통합 보안 로그인</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회원병원 ID</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@hospital.com" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A365D] focus:border-transparent outline-none transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
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

          <div className="text-xs text-gray-400 mt-2 text-center">
            식별번호: {deviceId || '발급 중...'}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1A365D] text-white font-semibold py-3 rounded-lg hover:bg-[#132847] transition duration-200 disabled:opacity-50"
            >
              안전 접속 (로그인)
            </button>
            <button 
              type="button" 
              onClick={handleJoin}
              disabled={isLoading}
              className="w-full bg-slate-100 text-[#1A365D] font-semibold py-3 rounded-lg hover:bg-slate-200 border border-slate-200 transition duration-200 disabled:opacity-50"
            >
              최초 가맹 승인 (기기 등록)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
