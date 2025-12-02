# 🔍 404 에러 - API URL 확인 방법

## 즉시 확인 (브라우저 콘솔)

F12 → Console 탭에서 다음을 확인하세요:

```
🔗 API_BASE: ???
🔗 VITE_API_BASE env: ???
🔗 Full login URL: ???
🔗 Full signup URL: ???
```

---

## 문제 진단

### 경우 1: `undefined` 또는 `localhost:4000/api`가 보이는 경우
**원인**: Vercel 환경 변수 미설정 또는 재배포 필요

**해결**:
1. Vercel Dashboard → Settings → Environment Variables
2. `VITE_API_BASE` 추가/수정
3. 값: `https://kepcoplayground-production.up.railway.app/api`
4. **재배포 필수!**

### 경우 2: Railway URL은 보이지만 `/api`가 없는 경우
**원인**: 환경 변수 값에 `/api`가 빠짐

**해결**:
- Vercel 환경 변수 값을 `https://xxx.railway.app/api`로 수정
- 재배포

### 경우 3: 올바른 URL이 보이는데 404 발생
**원인**: Railway 서버 라우팅 문제

**확인**:
- Railway 로그에서 서버가 정상 시작되었는지 확인
- `/api/auth/signup` 엔드포인트가 있는지 확인

