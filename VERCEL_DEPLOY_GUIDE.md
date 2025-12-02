# 🚀 Vercel 배포 완벽 가이드

## 📋 현재 화면 설정 방법

### Step 1: Framework Preset 설정
1. **"Framework Preset"** 드롭다운 클릭
2. **"Vite"** 선택 (또는 "Other" 그대로 두어도 vercel.json이 있으면 자동 감지됨)

### Step 2: Build and Output Settings 확인
1. **"Build and Output Settings"** 클릭하여 확장
2. 다음 값들이 자동으로 설정되어 있는지 확인:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (기본값)
   
   ✅ 이미 `vercel.json` 파일이 있으므로 자동으로 감지될 것입니다!

### Step 3: Environment Variables 설정 (중요!)
1. **"Environment Variables"** 클릭하여 확장
2. **"Add"** 또는 **"+"** 버튼 클릭
3. 다음 환경 변수 추가:

   **Key**: `VITE_API_BASE`
   
   **Value**: 
   - 초기 배포: `http://localhost:4000/api` (임시)
   - 백엔드 배포 후: `https://your-backend-api.railway.app/api` (실제 백엔드 URL)

4. **"Save"** 클릭

### Step 4: 배포 시작
1. 모든 설정 확인
2. 하단의 **"Deploy"** 버튼 클릭
3. 빌드 진행 상황 확인 (약 2-3분 소요)

---

## ✅ 배포 완료 후

배포가 완료되면:
1. Vercel이 자동으로 URL 제공 (예: `https://kepco-playground.vercel.app`)
2. 해당 URL로 접속하여 사이트 확인
3. 문제가 있으면 Vercel 대시보드 → **Deployments** → 해당 배포 → **Logs** 확인

---

## 🔧 백엔드 배포 (별도 필요)

현재 배포는 **프론트엔드만** 배포됩니다. 백엔드 API는 별도로 배포해야 합니다.

### 백엔드 배포 옵션:

#### 옵션 1: Railway (추천 - 가장 쉬움)
1. [Railway](https://railway.app) 접속 및 GitHub 로그인
2. **"New Project"** → **"Deploy from GitHub repo"** 선택
3. 저장소 선택
4. **"Settings"** → **"Root Directory"**를 `server`로 설정
5. **"Start Command"**: `node index.js` 설정
6. **"Deploy"** 클릭
7. 배포 완료 후 제공된 URL을 `VITE_API_BASE`에 설정

#### 옵션 2: Render
1. [Render](https://render.com) 접속
2. **"New"** → **"Web Service"** 선택
3. GitHub 저장소 연결
4. 설정:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. **"Create Web Service"** 클릭

#### 옵션 3: Fly.io
1. [Fly.io](https://fly.io) 접속
2. Fly CLI 설치 및 로그인
3. 프로젝트 초기화 및 배포

---

## 🔄 환경 변수 업데이트

백엔드 배포 후:

1. Vercel 대시보드 → 프로젝트 → **"Settings"** → **"Environment Variables"**
2. `VITE_API_BASE` 값 업데이트:
   - 새 값: `https://your-backend-api.railway.app/api`
3. **"Redeploy"** 클릭 (또는 Git에 push하면 자동 재배포)

---

## ⚠️ 중요 참고사항

### 1. SQLite 데이터베이스 문제
- Vercel Serverless Functions에서는 SQLite 사용이 제한적입니다
- Railway/Render 등에서는 SQLite 사용 가능
- 프로덕션에서는 PostgreSQL/MongoDB 권장

### 2. CORS 설정
백엔드가 배포되면 `server/index.js`에서 CORS 설정 필요:

```javascript
// 개발 환경
app.use(cors());

// 프로덕션 (Vercel 도메인 추가)
app.use(cors({
  origin: [
    'https://kepco-playground.vercel.app',  // 실제 Vercel URL
    'https://kepco-playground.vercel.app',  // 커스텀 도메인 (있는 경우)
    'http://localhost:5173'                 // 로컬 개발용
  ]
}));
```

### 3. 자동 배포
- GitHub의 `main` 브랜치에 push하면 자동으로 재배포됩니다
- Pull Request 생성 시 Preview 배포도 자동 생성됩니다

---

## 🐛 문제 해결

### 빌드 실패
1. Vercel → **Deployments** → 해당 배포 → **Logs** 확인
2. 로컬에서 `npm run build` 실행하여 에러 확인
3. `vercel.json` 파일 확인

### 환경 변수 적용 안 됨
- 환경 변수 추가 후 **Redeploy** 필요
- 환경 변수 이름이 `VITE_`로 시작하는지 확인

### API 연결 실패
- 브라우저 개발자 도구 (F12) → **Network** 탭에서 에러 확인
- CORS 에러인지 확인
- `VITE_API_BASE` 환경 변수가 올바른지 확인

---

## 📝 체크리스트

배포 전:
- [ ] `vercel.json` 파일이 프로젝트 루트에 있음
- [ ] `package.json`에 `build` 스크립트가 있음
- [ ] `.gitignore`에 `node_modules`, `dist` 등이 포함됨
- [ ] GitHub에 코드가 push되어 있음

배포 시:
- [ ] Framework Preset: **Vite** 선택
- [ ] Build Command: `npm run build` 확인
- [ ] Output Directory: `dist` 확인
- [ ] Environment Variables: `VITE_API_BASE` 설정

배포 후:
- [ ] 사이트 접속 확인
- [ ] 브라우저 콘솔에서 에러 확인
- [ ] 백엔드 배포 계획 (Railway/Render 등)

---

## 🎉 완료!

배포가 성공하면 Vercel이 제공하는 URL로 사이트에 접속할 수 있습니다!

추가 질문이나 문제가 있으면 알려주세요.


