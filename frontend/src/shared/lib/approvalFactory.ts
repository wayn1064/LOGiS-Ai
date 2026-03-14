export type ModuleType = 'SUPPLY' | 'HR' | 'CLINIC' | 'DESK' | 'LAB' | 'CONSULTING' | 'MYOFFICE' | 'DIRECTOR';

export interface ApprovalStep {
  name: string;
  role: string;
}

export const createApprovalChain = (activeModules: ModuleType[]): ApprovalStep[] => {
  const chain: ApprovalStep[] = [];
  
  // Step 1: 항상 최초 발주자(직원)가 시작
  chain.push({ name: '직원 발주', role: 'EMPLOYEE' });

  // Step 2: 진료실(CLINIC) 등 중간 관리자 모듈이 활성화된 경우 (예: 팀장 승인)
  if (activeModules.includes('CLINIC') || activeModules.includes('DESK') || activeModules.includes('LAB')) {
    chain.push({ name: '팀장 승인', role: 'TEAM_LEADER' });
  }

  // Step 3: 실장 승인 (항상 포함으로 간주하거나, 특정 모듈 예: HR이나 DIRECTER가 있을 때)
  chain.push({ name: '실장 승인', role: 'MANAGER' });

  // Step 4: 경영지원실 모듈 활성화 시
  if (activeModules.includes('HR')) {
    chain.push({ name: '경영지원실 승인', role: 'HR_MANAGER' });
  }

  // Step 5: 원장실 모듈 또는 최종 결재 (기본적으로 들어가는 것으로 처리하거나 선택적)
  if (activeModules.includes('DIRECTOR') || activeModules.includes('HR') || activeModules.length >= 3) {
    chain.push({ name: '원장 승인', role: 'DIRECTOR' });
  }

  // Step 6: 외부 유통사 전송 (Virtual Step)
  chain.push({ name: '외부 유통사 전송', role: 'SYSTEM' });

  return chain;
};
