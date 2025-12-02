# 🚀 배포 가이드: GitHub + Vercel

이 가이드는 KEPCO SW Playground 프로젝트를 GitHub와 Vercel에 배포하는 방법을 설명합니다.

## 📋 사전 준비

1. **GitHub 계정**이 있어야 합니다.
2. **Vercel 계정**이 있어야 합니다 (GitHub로 가입 가능).

---

## 1️⃣ GitHub 저장소 생성 및 코드 업로드

### Step 1: GitHub에 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **"+"** 클릭 → **"New repository"** 선택
3. 저장소 설정:
   - Repository name: `kepco-sw-playground` (또는 원하는 이름)
   - Description: "KEPCO SW Playground - DX 생태계 플랫폼"
   - Visibility: **Private** (또는 Public)
   - **"Initialize this repository with a README"** 체크 해제
4. **"Create repository"** 클릭

### Step 2: 로컬에서 Git 초기화 및 푸시

프로젝트 폴더에서 다음 명령어 실행:

```bash
# Git 초기화 (이미 초기화되어 있으면 생략)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: KEPCO SW Playground"

# GitHub 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH 사용 시:
# git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 브랜치 이름을 main으로 변경 (필요한 경우)
git branch -M main

# 코드 푸시
git push -u origin main
```

**참고**: 만약 인증 오류가 발생하면:
- GitHub Personal Access Token 필요 (Settings → Developer settings → Personal access tokens)
- 또는 SSH 키 설정 필요

---

## 2️⃣ Vercel에 배포

### Step 1: Vercel 계정 생성/로그인

1. [Vercel](https://vercel.com) 접속
2. **"Sign Up"** 클릭 → **"Continue with GitHub"** 선택
3. GitHub 권한 승인

### Step 2: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 섹션에서 방금 만든 GitHub 저장소 선택
3. **"Import"** 클릭

### Step 3: 프로젝트 설정

1. **Project Name**: `kepco-sw-playground` (또는 원하는 이름)
2. **Framework Preset**: **Vite** (자동 감지됨)
3. **Root Directory**: `./` (기본값)
4. **Build and Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 4: 환경 변수 설정 (중요!)

**Environment Variables** 섹션에서 다음 변수 추가:

```
VITE_API_BASE = https://your-backend-api.vercel.app/api
```

**참고**: 
- 백엔드 API URL은 실제 배포된 백엔드 주소로 변경해야 합니다.
- 초기에는 백엔드가 배포되지 않았으므로 임시로 로컬 주소를 넣거나, 백엔드 배포 후 추가하세요.

### Step 5: 배포 시작

1. **"Deploy"** 버튼 클릭
2. 빌드 완료까지 대기 (약 2-3분)
3. 배포 완료 후 제공되는 URL로 접속 확인

---

## 3️⃣ 백엔드 배포 (선택 사항)

현재 백엔드는 별도 서버가 필요합니다. 옵션:

### 옵션 A: Vercel Serverless Functions (제한적)

- SQLite는 서버리스 환경에서 권장되지 않음 (읽기 전용으로만 가능)
- PostgreSQL/MongoDB 등으로 변경 권장

### 옵션 B: Railway/Render/Fly.io

1. **Railway** (추천):
   - [Railway](https://railway.app) 가입
   - GitHub 저장소 연결
   - Node.js 프로젝트로 인식
   - 환경 변수 설정 (PORT 등)
   - 배포 완료 후 제공된 URL을 `VITE_API_BASE`에 설정

2. **Render**:
   - [Render](https://render.com) 가입
   - Web Service 생성
   - GitHub 저장소 연결
   - Build Command: `npm install`
   - Start Command: `node server/index.js`

### 옵션 C: 자체 서버

- VPS (AWS, DigitalOcean, 등)에 Node.js 설치
- PM2 등으로 프로세스 관리
- Nginx로 리버스 프록시 설정

---

## 4️⃣ CORS 설정

백엔드가 배포되면 Vercel 도메인을 허용해야 합니다.

`server/index.js` 파일에서:

```javascript
// 현재: 모든 오리진 허용 (개발용)
app.use(cors());

// 프로덕션: 특정 도메인만 허용 (보안 강화)
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173' // 로컬 개발용
  ]
}));
```

---

## 5️⃣ 환경 변수 업데이트

Vercel 대시보드에서:

1. **Settings** → **Environment Variables**
2. `VITE_API_BASE`를 실제 백엔드 API URL로 업데이트
3. **"Redeploy"** 클릭

---

## 6️⃣ 자동 배포 설정

### GitHub에 푸시하면 자동 배포

- Vercel은 기본적으로 GitHub의 `main` 브랜치에 푸시할 때마다 자동 배포합니다.
- Pull Request 생성 시 Preview 배포도 자동으로 생성됩니다.

### 커스텀 도메인 연결

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 원하는 도메인 입력
3. DNS 설정 가이드 따라하기

---

## ✅ 배포 완료 체크리스트

- [ ] GitHub 저장소 생성 및 코드 푸시 완료
- [ ] Vercel 프로젝트 생성 및 프론트엔드 배포 완료
- [ ] 백엔드 API 배포 완료 (Railway/Render 등)
- [ ] 환경 변수 `VITE_API_BASE` 설정 완료
- [ ] CORS 설정 완료
- [ ] 실제 도메인에서 테스트 완료

---

## 🔧 문제 해결

### 빌드 실패

- `npm run build` 로컬에서 실행하여 에러 확인
- Vercel 로그 확인 (Deployments → 해당 배포 → Logs)

### API 연결 실패

- 브라우저 개발자 도구 (F12) → Network 탭에서 에러 확인
- CORS 에러인지 확인
- `VITE_API_BASE` 환경 변수가 올바른지 확인

### 백엔드 연결 문제

- 백엔드 서버가 실행 중인지 확인
- 방화벽 설정 확인
- 환경 변수 확인

---

## 📞 추가 도움이 필요하면

- [Vercel 문서](https://vercel.com/docs)
- [Railway 문서](https://docs.railway.app)
- [GitHub 문서](https://docs.github.com)


