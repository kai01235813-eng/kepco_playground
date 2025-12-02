// API Base URL 설정
// 환경 변수 VITE_API_BASE가 설정되어 있으면 사용, 없으면 로컬 개발 서버 사용
// URL 끝의 슬래시 제거하여 이중 슬래시 방지
const rawApiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
export const API_BASE = rawApiBase.replace(/\/+$/, ''); // 끝의 슬래시 제거

// 디버깅: API URL 확인 (프로덕션에서도 표시)
// eslint-disable-next-line no-console
console.log('🔗 API_BASE:', API_BASE);
// eslint-disable-next-line no-console
console.log('🔗 VITE_API_BASE env:', import.meta.env.VITE_API_BASE);
// eslint-disable-next-line no-console
console.log('🔗 Full login URL:', `${API_BASE}/auth/login`);
// eslint-disable-next-line no-console
console.log('🔗 Full signup URL:', `${API_BASE}/auth/signup`);

// 환경 변수가 설정되지 않은 경우 경고
if (!import.meta.env.VITE_API_BASE && import.meta.env.PROD) {
  // eslint-disable-next-line no-console
  console.warn('⚠️ VITE_API_BASE 환경 변수가 설정되지 않았습니다! Vercel Dashboard에서 설정하세요.');
}


