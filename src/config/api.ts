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

// 환경 변수가 설정되지 않은 경우 경고 (프로덕션 환경)
if (!import.meta.env.VITE_API_BASE) {
  if (import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.error('❌ VITE_API_BASE 환경 변수가 설정되지 않았습니다!');
    // eslint-disable-next-line no-console
    console.error('Vercel Dashboard → Settings → Environment Variables에서 설정하세요.');
    // eslint-disable-next-line no-console
    console.error('설정 후 반드시 재배포해야 합니다!');
  } else {
    // eslint-disable-next-line no-console
    console.warn('⚠️ 개발 환경: 로컬 서버를 사용합니다.');
  }
}


