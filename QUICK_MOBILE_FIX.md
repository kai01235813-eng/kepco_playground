# 🚨 핸드폰 로그인 문제 빠른 해결

## 문제 원인

핸드폰에서 회원가입/로그인이 안되는 이유:
- **Vercel 환경 변수 `VITE_API_BASE`가 설정되지 않았거나**
- **재배포가 안되어서 반영되지 않았을 가능성**

---

## ✅ 해결 방법 (2단계)

### 1단계: Vercel 환경 변수 확인/설정

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. `VITE_API_BASE` 변수 확인:
   - **없다면** → **Add New** 클릭
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://xxx.railway.app/api` (Railway에서 생성한 URL)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development **모두 체크**
   - **Save**

### 2단계: 재배포 (중요!)

**환경 변수는 재배포해야 반영됩니다!**

1. **Deployments** 탭
2. 최신 배포의 **⋯** → **Redeploy**

또는 GitHub에 푸시:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 🔍 확인 방법

### 브라우저 콘솔에서 확인

1. 핸드폰 Chrome에서 사이트 접속
2. 메뉴 → **개발자 도구** (또는 `chrome://inspect`)
3. **Console** 탭에서 확인:
   ```
   🔗 API_BASE: https://xxx.railway.app/api
   ```
   
   만약 `localhost:4000`이 보이면 환경 변수가 제대로 설정되지 않은 것입니다!

### 네트워크 요청 확인

1. F12 → **Network** 탭
2. 로그인 시도
3. `/auth/login` 요청 확인:
   - **Request URL**이 Railway URL이어야 함
   - `localhost`가 아니어야 함

---

## ⚠️ 중요

- 환경 변수 변경 후 **반드시 재배포 필요!**
- 빌드 시점에 환경 변수가 적용되므로 재배포하지 않으면 반영 안됨

