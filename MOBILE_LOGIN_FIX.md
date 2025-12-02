# 🔧 핸드폰 로그인 문제 해결

## 문제 진단

핸드폰에서 회원가입/로그인이 안되는 주요 원인:

1. **환경 변수 미설정**: `VITE_API_BASE`가 Vercel에 설정되지 않음
2. **API URL 오류**: 여전히 `localhost:4000`을 참조하고 있음
3. **Railway 서버 연결 문제**: Railway 서버가 정상 작동하지 않음

---

## ✅ 해결 방법

### 1단계: Vercel 환경 변수 확인

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **Settings** → **Environment Variables**
3. `VITE_API_BASE` 변수가 있는지 확인
4. 값이 Railway URL인지 확인 (예: `https://xxx.railway.app/api`)

**없다면 추가:**
- **Key**: `VITE_API_BASE`
- **Value**: `https://xxx.railway.app/api` (Railway에서 생성한 도메인)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development 모두 선택
- **Save** 클릭

### 2단계: Vercel 재배포

환경 변수 추가 후 **반드시 재배포 필요:**

1. **Deployments** 탭
2. 최신 배포의 **⋯** 메뉴 → **Redeploy**

또는 빈 커밋으로 트리거:
```bash
git commit --allow-empty -m "Redeploy with environment variables"
git push origin main
```

### 3단계: Railway 서버 확인

1. [Railway Dashboard](https://railway.app/dashboard)
2. 프로젝트 선택
3. **Deployments** 탭에서 서버가 **Active** 상태인지 확인
4. **Logs** 탭에서 에러가 없는지 확인

### 4단계: API 테스트

브라우저 개발자 도구에서:
1. F12 → **Console** 탭
2. 다음 코드 실행:
```javascript
console.log('API_BASE:', import.meta.env.VITE_API_BASE);
fetch(import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' + '/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({employeeId: 'test', password: 'test'})
}).then(r => r.json()).then(console.log).catch(console.error);
```

---

## 🔍 디버깅

### 핸드폰에서 에러 확인
1. Chrome에서 사이트 접속
2. 메뉴 → **개발자 도구** (또는 `chrome://inspect`)
3. **Console** 탭에서 에러 확인

### 네트워크 요청 확인
1. F12 → **Network** 탭
2. 로그인 시도
3. `/auth/login` 요청 확인
   - **Status**: 200이어야 함
   - **Request URL**: Railway URL이어야 함 (localhost가 아님)

---

## ⚠️ 주의사항

### 환경 변수 변경 후
- **반드시 재배포 필요!**
- 환경 변수는 빌드 시점에 적용되므로 재배포하지 않으면 반영되지 않음

### Railway 서버 URL
- Railway에서 생성한 도메인 사용
- 마지막에 `/api` 추가 필수
- 예: `https://xxx.railway.app/api`

---

## 🚨 자주 발생하는 에러

### CORS 에러
```
Access to fetch at 'https://xxx.railway.app/api/auth/login' from origin 'https://xxx.vercel.app' has been blocked by CORS policy
```
**해결**: Railway 서버의 CORS 설정 확인 (이미 모든 오리진 허용 설정됨)

### 404 에러
```
Failed to fetch
```
**해결**: 
- Railway URL이 올바른지 확인
- `/api` 경로가 포함되었는지 확인

### 환경 변수 미적용
**해결**: Vercel 재배포 필수!

