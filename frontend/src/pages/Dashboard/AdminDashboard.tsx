import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  BarChart4, 
  Stethoscope, 
  CalendarCheck, 
  Wrench, 
  Box, 
  MessageCircle, 
  UserCircle 
} from 'lucide-react';
import { mockPubSub } from '../../shared/lib/mockPubSub';

// 권한 시뮬레이션: 현재 로그인한 사용자의 Role
const currentUserRole = 'admin';

interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  route: string;
  allowedRoles: string[];
  statusSummary: string;
  showOrderTest?: boolean;
  // 각 부서별 고유 8색 테마
  theme: {
    iconColor: string;
    hoverBorder: string;
    hoverBg: string; // group-hover:bg-... 형태로 적용될 부드러운 배경색
    badgeBg: string;
    badgeText: string;
  }
}

const departments: Department[] = [
  {
    id: 'director',
    name: '원장실',
    description: '병원 전체 관제 및 결재',
    icon: <Crown className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/director',
    allowedRoles: ['admin', 'director'],
    statusSummary: '결재 대기 3건',
    theme: {
      iconColor: 'text-[#1E3A8A]', // Blue-900
      hoverBorder: 'hover:border-[#1E3A8A]',
      hoverBg: 'group-hover:bg-blue-50/50',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-[#1E3A8A]',
    }
  },
  {
    id: 'management',
    name: '경영지원실',
    description: '인사, 노무, 세무, 회계',
    icon: <BarChart4 className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/management',
    allowedRoles: ['admin', 'management'],
    statusSummary: '신규 입사자 1명',
    theme: {
      iconColor: 'text-[#047857]', // Emerald-700
      hoverBorder: 'hover:border-[#047857]',
      hoverBg: 'group-hover:bg-emerald-50/50',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-[#047857]',
    }
  },
  {
    id: 'clinic',
    name: '진료실',
    description: '전자 차트, 처방, 진료 이력',
    icon: <Stethoscope className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/clinic',
    allowedRoles: ['admin', 'director', 'doctor', 'hygienist'],
    statusSummary: '대기 환자 5명',
    theme: {
      iconColor: 'text-[#0891B2]', // Cyan-600
      hoverBorder: 'hover:border-[#0891B2]',
      hoverBg: 'group-hover:bg-cyan-50/50',
      badgeBg: 'bg-cyan-100',
      badgeText: 'text-[#0891B2]',
    }
  },
  {
    id: 'desk',
    name: '데스크',
    description: '환자 접수, 예약, 수납, 고객 관리',
    icon: <CalendarCheck className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/desk',
    allowedRoles: ['admin', 'desk_staff'],
    statusSummary: '금일 예약 32건',
    theme: {
      iconColor: 'text-[#D97706]', // Amber-600
      hoverBorder: 'hover:border-[#D97706]',
      hoverBg: 'group-hover:bg-amber-50/50',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-[#D97706]',
    }
  },
  {
    id: 'lab',
    name: '기공실',
    description: '기공물 제작 의탁 및 관리',
    icon: <Wrench className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/lab',
    allowedRoles: ['admin', 'technician'],
    statusSummary: '제작 완료 2건',
    theme: {
      iconColor: 'text-[#4F46E5]', // Indigo-600
      hoverBorder: 'hover:border-[#4F46E5]',
      hoverBg: 'group-hover:bg-indigo-50/50',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-[#4F46E5]',
    }
  },
  {
    id: 'supply',
    name: '중앙공급실',
    description: '기구 멸균, 재고 관리',
    icon: <Box className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/supply',
    allowedRoles: ['admin', 'staff'],
    statusSummary: '재고 부족 5품목',
    showOrderTest: true,
    theme: {
      iconColor: 'text-[#16A34A]', // Green-600
      hoverBorder: 'hover:border-[#16A34A]',
      hoverBg: 'group-hover:bg-green-50/50',
      badgeBg: 'bg-green-100',
      badgeText: 'text-[#16A34A]',
    }
  },
  {
    id: 'consulting',
    name: '상담실',
    description: '치료 계획 및 상담',
    icon: <MessageCircle className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/consulting',
    allowedRoles: ['admin', 'consultant'],
    statusSummary: '상담 예정 4건',
    theme: {
      iconColor: 'text-[#DB2777]', // Pink-600
      hoverBorder: 'hover:border-[#DB2777]',
      hoverBg: 'group-hover:bg-pink-50/50',
      badgeBg: 'bg-pink-100',
      badgeText: 'text-[#DB2777]',
    }
  },
  {
    id: 'myoffice',
    name: '마이오피스',
    description: '개인 업무 및 커뮤니티',
    icon: <UserCircle className="w-10 h-10 mb-5 transition-colors duration-300" />,
    route: '/myoffice',
    allowedRoles: ['admin', 'director', 'doctor', 'hygienist', 'staff', 'technician', 'consultant', 'desk_staff'],
    statusSummary: '새 메시지 2건',
    theme: {
      iconColor: 'text-[#7C3AED]', // Violet-600
      hoverBorder: 'hover:border-[#7C3AED]',
      hoverBg: 'group-hover:bg-violet-50/50',
      badgeBg: 'bg-violet-100',
      badgeText: 'text-[#7C3AED]',
    }
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = mockPubSub.subscribe('APPROVAL_REQUESTED', (payload) => {
      setToastMessage(`[결재 알림] ${payload.department}에서 '${payload.item}' 발주 결재가 요청되었습니다.`);
      setTimeout(() => setToastMessage(null), 4000);
    });
    return () => unsubscribe();
  }, []);



  const handleCardClick = (dept: Department) => {
    // 임시: 모든 부서 접근 허용 처리 (모바일/웹 공용)
    console.info(`[Router] Navigating to ${dept.route}`);
    navigate(dept.route);
  };

  const handleTempOrder = (e: React.MouseEvent, deptName: string) => {
    e.stopPropagation();
    mockPubSub.publish('APPROVAL_REQUESTED', {
      department: deptName,
      item: '임시 테스트 소모품 세트',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans relative selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 flex flex-col items-center justify-between text-center md:flex-row md:text-left gap-3">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-[2.5rem] font-bold text-[#1A365D] tracking-tight leading-tight">
              DENTi-Ai 치과(병)의원 업무자동화시스템
            </h1>
            <p className="text-lg text-[#6B7280] font-medium tracking-wide">
              복잡하고 할일많은 업무를 자동화하자.. 통합 인공지능 솔루션
            </p>
          </div>
          <button
            onClick={() => {
               localStorage.removeItem('isAuthenticated');
               window.location.reload();
            }}
            className="mt-4 md:mt-0 px-4 py-2 border border-[#1A365D] text-[#1A365D] rounded-lg hover:bg-[#1A365D] hover:text-white transition-colors duration-200 font-semibold"
          >
            로그아웃
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const hasAccess = dept.allowedRoles.includes(currentUserRole);
            
            return (
              <div 
                key={dept.id}
                onClick={() => handleCardClick(dept)}
                className={`group flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 transition-all duration-300 ease-out relative overflow-hidden
                  ${hasAccess 
                    ? `hover:-translate-y-2 hover:shadow-lg cursor-pointer border-b-4 border-b-transparent ${dept.theme.hoverBorder} ${dept.theme.hoverBg}` 
                    : 'opacity-50 cursor-not-allowed bg-gray-50'}`}
              >
                <div className="flex-1 flex flex-col">
                  {/* Clone element to inject the specific dynamic color class to the icon */}
                  {React.cloneElement(dept.icon as React.ReactElement<{className?: string}>, { className: `${(dept.icon as React.ReactElement<{className?: string}>).props.className || ''} text-[#6B7280] group-hover:${dept.theme.iconColor}` })}
                  <h2 className="text-xl font-bold text-[#1E293B] mb-3 transition-colors">{dept.name}</h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-6 font-medium">{dept.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100 z-10 relative">
                  <span className={`text-[0.85rem] font-bold px-3 py-1.5 rounded-full tracking-wide ${dept.theme.badgeBg} ${dept.theme.badgeText}`}>
                    {dept.statusSummary}
                  </span>
                  {dept.showOrderTest && hasAccess && (
                    <button 
                      onClick={(e) => handleTempOrder(e, dept.name)}
                      className="text-[0.8rem] font-semibold bg-[#1A365D] text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors duration-200 active:scale-95 shadow-sm"
                    >
                      임시 발주 테스트
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 bg-[#1E293B] text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
          <span className="font-medium text-sm md:text-base whitespace-nowrap">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
