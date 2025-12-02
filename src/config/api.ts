// API Base URL 설정
// 환경 변수 VITE_API_BASE가 설정되어 있으면 사용, 없으면 로컬 개발 서버 사용
// URL 끝의 슬래시 제거하여 이중 슬래시 방지
const rawApiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
export const API_BASE = rawApiBase.replace(/\/+$/, ''); // 끝의 슬래시 제거

// 디버깅: API URL 확인
// eslint-disable-next-line no-console
console.log('🔗 API_BASE:', API_BASE);
// eslint-disable-next-line no-console
console.log('🔗 VITE_API_BASE env:', import.meta.env.VITE_API_BASE);


