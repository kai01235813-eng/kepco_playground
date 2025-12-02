# Railway에 백엔드 서버 배포하기

## 문제 상황
- 프론트엔드는 Vercel에 배포됨 ✅
- 백엔드는 로컬에서만 실행 중 ❌
- **Vercel 사이트는 로컬 서버에 접근할 수 없음!**

---

## 해결 방법: Railway에 백엔드 배포

### Railway란?
- Node.js 서버를 쉽게 배포할 수 있는 플랫폼
- 무료 플랜 제공
- GitHub 연동 가능

---

## 배포 단계

### 1. Railway 회원가입
1. [Railway.app](https://railway.app) 접속
2. "Login" 클릭 → GitHub로 로그인

### 2. 새 프로젝트 생성
1. Dashboard에서 **"New Project"** 클릭
2. **"Deploy from GitHub repo"** 선택
3. 저장소 선택 (kepco-playground)

### 3. 환경 변수 설정
1. 프로젝트 → **Variables** 탭
2. 다음 환경 변수 추가:
   ```
   PORT=3000
   NODE_ENV=production
   ```

### 4. 배포 설정
Railway가 자동으로 감지하지만, 확인:
- **Root Directory**: `/` (기본값)
- **Start Command**: `node server/index.js`
- **Build Command**: (없음)

### 5. 도메인 확인
1. 배포 완료 후 **Settings** → **Networking**
2. **Generate Domain** 클릭
3. 생성된 URL 확인 (예: `https://xxx.railway.app`)

---

## 프론트엔드 API 주소 변경

### 1. Vercel 환경 변수 설정
1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 추가:
   ```
   VITE_API_BASE=https://xxx.railway.app/api
   ```
   (Railway에서 생성한 도메인으로 변경)

### 2. 프론트엔드 재배포
- Vercel이 자동으로 재배포됨
- 또는 수동으로 **Redeploy**

---

## 주의사항

### SQLite 파일 유지
Railway는 재배포 시 파일이 초기화될 수 있습니다.

**해결 방법:**
1. Railway → **Volumes** 탭
2. `/server` 경로에 볼륨 마운트
3. `data.sqlite` 파일 영구 저장

또는 더 나은 방법:
- PostgreSQL 사용 (Railway에서 무료 제공)
- 원격 데이터베이스 사용

---

## 빠른 체크리스트

- [ ] Railway에 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] 배포 완료 확인
- [ ] 도메인 URL 확인
- [ ] Vercel 환경 변수 `VITE_API_BASE` 설정
- [ ] Vercel 재배포
- [ ] 게시판 테스트

---

## 대안: Render.com 사용

Railway 대신 [Render.com](https://render.com)도 사용 가능:
1. 무료 플랜 제공
2. GitHub 연동
3. 자동 배포

---

## 문제 해결

### 배포 실패 시
- 빌드 로그 확인
- `package.json`에 `engines` 필드 추가:
  ```json
  "engines": {
    "node": "18.x"
  }
  ```

### CORS 에러 시
- `server/index.js`의 CORS 설정 확인
- Vercel 도메인 추가 허용

