# 🔍 회원가입 문제 디버깅

## 문제 진단 단계

### 1단계: 브라우저 콘솔에서 API URL 확인

1. Vercel 사이트 접속
2. F12 → **Console** 탭 열기
3. 다음 코드 실행:
```javascript
console.log('API_BASE:', import.meta.env.VITE_API_BASE || 'http://localhost:4000/api');
```

**확인 사항:**
- ✅ Railway URL이 나오면: 환경 변수 정상
- ❌ `undefined` 또는 `localhost:4000`이 나오면: 환경 변수 미설정

---

### 2단계: 네트워크 요청 확인

1. F12 → **Network** 탭
2. 회원가입 시도
3. `/auth/signup` 요청 확인:
   - **Request URL**: Railway URL이어야 함
   - **Status**: 
     - `200` = 성공 (서버 문제 아님)
     - `404` = API URL 오류
     - `500` = 서버 에러
     - `CORS error` = CORS 설정 문제
     - `Failed to fetch` = 서버 연결 실패

---

### 3단계: Vercel 환경 변수 확인

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. `VITE_API_BASE` 확인:
   - **있으면**: 값이 올바른지 확인 (Railway URL + `/api`)
   - **없으면**: 추가 필요

---

### 4단계: Railway 서버 확인

1. [Railway Dashboard](https://railway.app/dashboard)
2. 프로젝트 선택
3. **Deployments** → 상태가 **Active**인지 확인
4. **Logs** 탭 → 에러 메시지 확인

---

## 🔧 해결 방법

### 방법 1: 환경 변수 설정 및 재배포

1. Vercel → Settings → Environment Variables
2. `VITE_API_BASE` 추가/수정:
   - Value: `https://xxx.railway.app/api`
3. **반드시 재배포!** (Deployments → Redeploy)

### 방법 2: Railway 서버 테스트

브라우저에서 직접 테스트:
```
https://xxx.railway.app/api/auth/signup
```
- CORS 에러 나오면: 정상 (브라우저에서 직접 접근 불가)
- 404 나오면: URL 확인
- 연결 안되면: Railway 서버 문제

---

## 📋 체크리스트

- [ ] 브라우저 콘솔에서 API URL 확인
- [ ] Network 탭에서 요청 URL 확인
- [ ] Vercel 환경 변수 확인
- [ ] Vercel 재배포 확인
- [ ] Railway 서버 상태 확인
- [ ] Railway 로그 확인

---

## 💡 빠른 확인 방법

브라우저 콘솔에서:
```javascript
// API URL 확인
console.log('🔗 API:', import.meta.env.VITE_API_BASE || 'http://localhost:4000/api');

// 테스트 요청
fetch((import.meta.env.VITE_API_BASE || 'http://localhost:4000/api') + '/auth/signup', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({employeeId: 'test', password: 'test', name: 'test'})
})
  .then(r => r.json().then(d => ({status: r.status, data: d})))
  .then(console.log)
  .catch(e => console.error('❌ 에러:', e));
```

이 결과를 알려주시면 정확히 진단할 수 있습니다!

