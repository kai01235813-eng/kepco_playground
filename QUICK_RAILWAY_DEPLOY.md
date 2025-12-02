# 🚀 Railway 빠른 배포 가이드

## ⚡ 5분 안에 백엔드 배포하기

### 1단계: Railway 가입 및 프로젝트 생성 (2분)

1. [railway.app](https://railway.app) 접속
2. "Login" 클릭 → **GitHub로 로그인**
3. Dashboard에서 **"New Project"** 클릭
4. **"Deploy from GitHub repo"** 선택
5. `sw_playground` 저장소 선택

### 2단계: 배포 설정 (1분)

Railway가 자동으로 감지하지만 확인:
- **Root Directory**: `/` (기본값 유지)
- **Build Command**: (비워두기)
- **Start Command**: `node server/index.js`

### 3단계: 도메인 확인 (1분)

1. 배포 완료 대기 (약 1-2분)
2. 프로젝트 → **Settings** → **Networking**
3. **Generate Domain** 클릭
4. 생성된 URL 복사 (예: `https://xxx.railway.app`)

### 4단계: Vercel 환경 변수 설정 (1분)

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. **Add New** 클릭:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://xxx.railway.app/api` (Railway에서 복사한 URL)
   - **Environment**: Production, Preview, Development 모두 선택
5. **Save** 클릭

### 5단계: Vercel 재배포

1. Vercel Dashboard → **Deployments** 탭
2. 최신 배포의 **⋯** 메뉴 → **Redeploy**

또는 GitHub에 빈 커밋 푸시:
```bash
git commit --allow-empty -m "Update API base URL"
git push origin main
```

---

## ✅ 완료!

이제 Vercel 사이트에서 게시판이 작동합니다!

---

## 🔍 확인 방법

1. Vercel 사이트 접속
2. 게시판 글 작성 테스트
3. 브라우저 개발자 도구(F12) → Network 탭 확인
   - API 요청이 Railway URL로 가는지 확인

---

## ⚠️ 문제 해결

### 배포 실패 시
- Railway → **Deployments** → **Logs** 확인
- 에러 메시지 확인

### CORS 에러 시
- `server/index.js`의 CORS 설정 확인 (이미 모든 오리진 허용 설정됨)

### 데이터베이스 문제
- Railway 재배포 시 SQLite 파일이 초기화될 수 있음
- 나중에 PostgreSQL로 업그레이드 권장

