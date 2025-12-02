# KEPCO SW Playground

한전 직원들을 위한 자발적인 SW 개발 참여와 아이디어 발굴을 촉진하는 비공식 DX 생태계 플랫폼입니다.

## 🌟 주요 기능

- **Dashboard**: 실시간 아이디어 현황, 코인 시세, 최신 기여 피드
- **Playground**: 개발자들이 만든 웹/앱 프로젝트 체험
- **아이디어 Zone**: 익명 아이디어 제안 및 투표 시스템
- **보상시스템**: KEP코인 보상 로드맵 및 시스템 설명
- **지식 공유**: 개발 가이드 및 Q&A 게시판
- **집단 지성**: 거버넌스 투표 및 투명한 회계 장부
- **토크노믹스**: KEP코인 토크노믹스 대시보드

## 🛠️ 기술 스택

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 로컬 개발 환경 설정

1. 저장소 클론
```bash
git clone <repository-url>
cd sw_playground
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
# 프론트엔드 (터미널 1)
npm run dev

# 백엔드 (터미널 2)
npm run server
```

4. 브라우저에서 접속
- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:4000

## 🚀 배포

### Vercel 배포 (프론트엔드)

1. Vercel에 GitHub 저장소 연결
2. 빌드 설정:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 백엔드 배포 옵션

백엔드 API는 별도 서버가 필요합니다:
- Vercel Serverless Functions (제한적)
- Railway, Render, Fly.io 등의 서비스
- 자체 서버

## 📝 환경 변수

`.env` 파일을 생성하여 다음 변수 설정:

```
VITE_API_BASE=http://localhost:4000/api
```

프로덕션에서는 백엔드 API URL로 변경해야 합니다.

## 📄 라이선스

프라이빗 프로젝트 (KEPCO 내부 사용)


