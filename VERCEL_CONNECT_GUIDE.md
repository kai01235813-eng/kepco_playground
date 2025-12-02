# 🚀 Vercel과 GitHub 연동 및 배포 가이드

## 📋 사전 준비

✅ GitHub에 코드가 업로드되어 있어야 합니다.
✅ 저장소: https://github.com/kai01235813-eng/kepco_playground

---

## Step 1: Vercel 계정 생성/로그인

1. **Vercel 접속**: https://vercel.com
2. **"Sign Up"** 또는 **"Log In"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 권한 승인

---

## Step 2: 프로젝트 Import

1. **Vercel 대시보드**에서 **"Add New..."** 버튼 클릭
2. **"Project"** 선택
3. **"Import Git Repository"** 섹션에서:
   - GitHub 저장소 목록 확인
   - **`kai01235813-eng/kepco_playground`** 선택
   - 또는 검색창에 `kepco_playground` 입력하여 찾기
4. **"Import"** 버튼 클릭

---

## Step 3: 프로젝트 설정

### 1. Project Name
- 기본값: `kepco-playground` (변경 가능)

### 2. Framework Preset
- **"Vite"** 선택 (자동 감지될 수 있음)
- 만약 "Other"로 되어 있다면 "Vite"로 변경

### 3. Root Directory
- 기본값: `./` (그대로 두기)
- 만약 서브폴더에 있다면 해당 경로 입력

### 4. Build and Output Settings (확장)
- **"Build and Output Settings"** 클릭하여 펼치기
- 확인/설정:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Install Command**: `npm install` (기본값)

### 5. Environment Variables (중요!)
- **"Environment Variables"** 클릭하여 펼치기
- **"Add"** 또는 **"+"** 버튼 클릭
- 환경 변수 추가:
  ```
  Key: VITE_API_BASE
  Value: http://localhost:4000/api  (임시, 백엔드 배포 후 업데이트)
  ```
- Environment: **Production**, **Preview**, **Development** 모두 선택
- **"Save"** 클릭

---

## Step 4: 배포 시작

1. 모든 설정 확인
2. 하단의 **"Deploy"** 버튼 클릭
3. 빌드 진행 상황 확인 (약 2-3분 소요)

---

## Step 5: 배포 완료 확인

1. **배포 성공 시**:
   - Vercel이 자동으로 URL 제공 (예: `https://kepco-playground.vercel.app`)
   - 해당 URL로 접속하여 사이트 확인

2. **문제 발생 시**:
   - Vercel 대시보드 → **Deployments** 탭
   - 실패한 배포 클릭
   - **"Logs"** 탭에서 에러 확인

---

## 🔄 자동 배포 설정

✅ **기본적으로 활성화됨**:
- GitHub의 `main` 브랜치에 push하면 자동 재배포
- Pull Request 생성 시 Preview 배포 자동 생성

---

## ⚙️ 추가 설정 (배포 후)

### 1. 환경 변수 업데이트

백엔드 API를 배포한 후:

1. Vercel 대시보드 → 프로젝트 선택
2. **"Settings"** 탭 → **"Environment Variables"**
3. `VITE_API_BASE` 클릭하여 편집
4. Value를 실제 백엔드 API URL로 변경:
   ```
   https://your-backend-api.railway.app/api
   ```
5. **"Save"** 클릭
6. **"Deployments"** 탭 → **"Redeploy"** 클릭

### 2. 커스텀 도메인 연결 (선택사항)

1. **Settings** → **Domains**
2. 원하는 도메인 입력
3. DNS 설정 가이드 따라하기

---

## 🐛 문제 해결

### 빌드 실패

**확인 사항**:
1. Vercel → Deployments → 해당 배포 → Logs 확인
2. 로컬에서 테스트:
   ```bash
   npm install
   npm run build
   ```
3. `package.json`에 `build` 스크립트가 있는지 확인

### 환경 변수 적용 안 됨

- 환경 변수 추가 후 **Redeploy** 필요
- 변수 이름이 `VITE_`로 시작하는지 확인

### API 연결 실패

1. 브라우저 개발자 도구 (F12) → Network 탭 확인
2. `VITE_API_BASE` 환경 변수가 올바른지 확인
3. CORS 에러인지 확인 (백엔드 설정 필요)

---

## 📝 체크리스트

배포 전:
- [ ] GitHub에 코드 업로드 완료
- [ ] Vercel 계정 생성/로그인 완료
- [ ] GitHub 저장소 Import 완료

배포 설정:
- [ ] Framework Preset: **Vite**
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables: `VITE_API_BASE` 설정

배포 후:
- [ ] 사이트 접속 확인
- [ ] 브라우저 콘솔에서 에러 확인
- [ ] 백엔드 배포 계획

---

## 🎉 완료!

배포가 성공하면 Vercel이 제공하는 URL로 사이트에 접속할 수 있습니다!

예시 URL: `https://kepco-playground-xxxxx.vercel.app`

---

## 🔗 유용한 링크

- [Vercel 대시보드](https://vercel.com/dashboard)
- [Vercel 문서](https://vercel.com/docs)
- [GitHub 저장소](https://github.com/kai01235813-eng/kepco_playground)

