import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, User, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 최고관리자 아이디: 1, 비밀번호: 1
    if (userId === '1' && password === '1') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setErrorMsg('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-10 text-center gap-3">
          <div className="h-14 w-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center shadow-md">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">LOGiS-Ai</h1>
            <p className="text-sm text-slate-500 mt-1">유통회사 통합 업무 자동화 시스템</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 mb-4">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">아이디</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="off"
                placeholder="아이디를 입력하세요" 
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">비밀번호</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호를 입력하세요" 
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1A365D] hover:bg-blue-900 text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-200 mt-4 active:scale-[0.98]"
          >
            로그인
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2026 WAYN-Ai Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
