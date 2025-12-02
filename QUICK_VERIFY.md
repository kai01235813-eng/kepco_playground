# 🔍 빠른 확인 방법

## 브라우저 콘솔에서 즉시 확인

F12 → Console 탭에서 다음 코드 실행:

```javascript
console.log('환경 변수:', import.meta.env.VITE_API_BASE);
console.log('API_BASE:', import.meta.env.VITE_API_BASE || 'http://localhost:4000/api');
```

**결과에 따라:**

### ✅ 정상인 경우
```
환경 변수: https://kepcoplayground-production.up.railway.app/api
API_BASE: https://kepcoplayground-production.up.railway.app/api
```
→ 환경 변수는 정상. 다른 문제일 수 있음 (Railway 서버 확인 필요)

### ❌ 문제인 경우
```
환경 변수: undefined
API_BASE: http://localhost:4000/api
```
→ **환경 변수가 설정되지 않았거나 재배포 필요!**

---

## 즉시 해결

환경 변수가 `undefined`면:
1. Vercel Dashboard → Settings → Environment Variables
2. `VITE_API_BASE` 수정/확인
3. **재배포 필수!**
4. 브라우저 새로고침 (Ctrl+F5)

