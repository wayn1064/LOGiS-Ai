import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Lock, User, AlertCircle, ArrowRight, PackageSearch, Globe } from 'lucide-react';

export const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="min-h-screen flex bg-[#0A1128] font-sans selection:bg-blue-500/30 selection:text-blue-100">
      
      {/* Left Area: Hero/Branding (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-3/5 flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#102A43] to-[#243B53]">
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-16 h-full flex flex-col justify-center">
          <div className="inline-flex items-center justify-center p-3 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-8">
            <Truck className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Supply Chain
            </span>
          </h1>
          <p className="text-lg text-blue-100/80 max-w-lg mb-12 font-light leading-relaxed">
            국내외 최고 수준의 완벽히 격리된 이벤트 기반 아키텍처.
            <br />
            모든 물류 파이프라인과 글로벌 배송 네트워크를 하나의 플랫폼에서 직관적으로 관리하세요.
          </p>

          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                <Globe size={24} />
              </div>
              <span className="text-sm font-medium text-slate-300">Global Coverage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <PackageSearch size={24} />
              </div>
              <span className="text-sm font-medium text-slate-300">Real-time Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area: Login Container */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-12 relative z-20 bg-white/5 backdrop-blur-3xl shadow-2xl block border-l border-white/5">
        <div className="w-full max-w-sm">
          
          <div className="mb-10 lg:hidden">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl mb-6">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">LOGiS-Ai</h2>
            <p className="text-slate-400 mt-2 text-sm">유통회사 통합 업무 자동화 시스템</p>
          </div>

          <div className="hidden lg:block mb-10">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Login to Platform</h2>
            <p className="text-slate-400 text-sm">권한이 부여된 관리자 계정으로 로그인해주세요.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5 focus-within:text-blue-400 text-slate-500 transition-colors">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5" />
                  </div>
                  <input 
                    type="text" 
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    autoComplete="off"
                    placeholder="아이디를 입력하세요" 
                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 focus-within:text-blue-400 text-slate-500 transition-colors">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="비밀번호를 입력하세요" 
                    className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 focus:ring-blue-500 focus:ring-offset-slate-900" />
                <span>로그인 상태 유지</span>
              </label>
              <button type="button" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                비밀번호 찾기
              </button>
            </div>

            <button 
              type="submit" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all duration-200 active:scale-[0.98]"
            >
              시스템 접속
              <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-slate-500">
              © 2026 WAYN-Ai Co., Ltd. <br className="lg:hidden" />
              Advanced Event-Driven Architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
