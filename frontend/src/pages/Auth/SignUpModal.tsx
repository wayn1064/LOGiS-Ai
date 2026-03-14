import React, { useState } from 'react';
import axios from 'axios';
import { mockPubSub } from '../../shared/lib/mockPubSub';

interface SignUpModalProps {
  onClose: () => void;
}

export default function SignUpModal({ onClose }: SignUpModalProps) {
  const [formData, setFormData] = useState({
    hospitalName: '',
    representative: '',
    contact: '',
    adminEmail: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 본사(WAYN-Ai) 가입 요청 API 라우트
      // 환경변수 VITE_WAYN_AI_API_URL이 없으면 사용자가 제공한 기본 Cloud Run URL 사용
      const WAYN_AI_URL = import.meta.env.VITE_WAYN_AI_API_URL || 'https://wayn-ai-backend-585555077661.asia-northeast3.run.app';
      
      // 실제 API 통신 (CORS 허용 등 WAYN-Ai 백엔드 설정 필요)
      await axios.post(`${WAYN_AI_URL}/api/tenants/join`, {
        tenantName: formData.hospitalName,
        solutionType: 'DENTi-Ai',
        requesterName: formData.representative,
        email: formData.adminEmail,
        contact: formData.contact
      });

      console.log('Sign Up Request Submitted to WAYN-Ai:', formData);
      mockPubSub.publish('HOSPITAL_SIGNUP_REQUESTED', formData);
      
      alert("가입 신청이 완료되었습니다.\nWAYN-Ai 본사 승인 후, 기재하신 이메일로 '병원 ID'와 초기 접속 안내 메일이 발송됩니다.");
      onClose();
    } catch (error) {
      console.error('Failed to submit signup request:', error);
      alert("본사 서버 연동 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-[#1A365D] mb-6">병원 도입 문의 / 회원가입</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">병원명</label>
            <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required disabled={isLoading} className="w-full px-4 py-2 border rounded-lg focus:ring-[#1A365D] focus:border-[#1A365D]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대표자명</label>
            <input type="text" name="representative" value={formData.representative} onChange={handleChange} required disabled={isLoading} className="w-full px-4 py-2 border rounded-lg focus:ring-[#1A365D] focus:border-[#1A365D]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
            <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required disabled={isLoading} className="w-full px-4 py-2 border rounded-lg focus:ring-[#1A365D] focus:border-[#1A365D]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">관리자 이메일 (필수)</label>
            <input type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} required disabled={isLoading} placeholder="승인 안내를 받을 이메일" className="w-full px-4 py-2 border rounded-lg focus:ring-[#1A365D] focus:border-[#1A365D]" />
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1A365D] text-white font-semibold py-3 rounded-lg hover:bg-[#132847] transition disabled:bg-gray-400"
            >
              {isLoading ? '신청 중...' : '가입 신청하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
