# 서버 재시작 및 Vercel 배포 가이드

## ⚠️ 중요: 로컬 서버와 Vercel은 별개입니다

### 현재 프로젝트 구조

1. **프론트엔드 (Vercel 배포)**
   - Vite + React
   - Vercel에 배포됨
   - GitHub에 푸시하면 자동 배포

2. **백엔드 서버 (로컬 개발용)**
   - Express + SQLite
   - 로컬에서만 실행 (`npm run server`)
   - **현재 Vercel에 배포되지 않음**

---

## 🔄 로컬 서버 재시작 방법

### 1. 서버 중지
- 터미널에서 `Ctrl + C` 누르기

### 2. 서버 재시작
```bash
npm run server
```

또는

```bash
node server/index.js
```

---

## 📤 Vercel에 반영하는 방법

**로컬 서버를 재시작해도 Vercel에는 자동으로 반영되지 않습니다!**

Vercel에 반영하려면:

### 1. 변경사항 커밋 및 푸시
```bash
git add .
git commit -m "서버 코드 수정"
git push origin main
```

### 2. Vercel 자동 배포
- GitHub에 푸시하면 Vercel이 자동으로 감지
- 프론트엔드 코드만 빌드하여 배포

---

## ⚠️ 현재 문제점

**백엔드 서버는 Vercel에 배포되지 않습니다!**

현재 상황:
- 프론트엔드: Vercel에 배포됨 ✅
- 백엔드 API: 로컬에서만 실행됨 ❌

### 해결 방법 옵션

#### 옵션 1: Vercel Serverless Functions로 백엔드 배포
- `server/index.js`를 Vercel Functions로 변환
- 복잡하지만 무료로 사용 가능

#### 옵션 2: 별도 서버 호스팅
- Railway, Render, Heroku 등에 백엔드 배포
- 별도 도메인/포트 사용

#### 옵션 3: 현재 상태 유지
- 로컬에서만 백엔드 실행
- 개발/테스트용으로만 사용

---

## 🚀 빠른 서버 재시작 (로컬)

```bash
# 1. 서버 중지 (Ctrl + C)

# 2. 서버 재시작
npm run server
```

**이것만으로는 Vercel에 반영되지 않습니다!**

Vercel에 반영하려면 GitHub에 푸시해야 합니다.

