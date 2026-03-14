/**
 * Event-Driven Architecture: Pub/Sub Utility Module
 * DENTi-Ai 프론트엔드 내의 모듈(부서) 간 직접 의존성을 제거하고 이벤트를 통한 통신을 지원합니다.
 */

type EventCallback = (payload: any) => void;

class MockPubSub {
  private listeners: Record<string, EventCallback[]> = {};

  subscribe(eventName: string, callback: EventCallback): () => void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
    };
  }

  publish(eventName: string, payload: any): void {
    console.info(`[Event/API] PUBLISH: ${eventName}`, payload);
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(cb => cb(payload));
    }
  }
}

export const mockPubSub = new MockPubSub();

/**
 * AI Studio 및 외부 기기/통신망 연동을 위한 빈 함수 (Boilerplate)
 */
export const HardwareAPI = {
  // ADT CAPS, KT Telecap 등 보안/출입 통제 연동
  requestDoorOpen: (doorId: string) => {
    console.info('[Event/API] HardwareAPI.requestDoorOpen', { doorId });
  },
  // RFID, BarCode 리더기 스캔 시뮬레이션
  scanBarcode: (code: string) => {
     console.info('[Event/API] HardwareAPI.scanBarcode', { code });
  }
};

export const ExternalNotificationAPI = {
  // 카카오 알림톡/카카오톡 발송
  sendAlimTalk: (phone: string, templateId: string, params: any) => {
    console.info('[Event/API] ExternalNotificationAPI.sendAlimTalk', { phone, templateId, params });
  },
  // 네이버 웍스 / 톡톡 메시지 발송
  sendNaverWorksMessage: (userId: string, message: string) => {
    console.info('[Event/API] ExternalNotificationAPI.sendNaverWorksMessage', { userId, message });
  }
};
