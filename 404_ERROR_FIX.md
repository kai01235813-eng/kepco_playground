# 🚨 404 에러 해결

## 문제 원인

Network 탭에서 `/login`, `/signup` 요청이 404로 실패합니다.

이는 **API_BASE URL이 제대로 설정되지 않았거나**, 환경 변수가 반영되지 않았을 가능성이 높습니다.

---

## 🔍 즉시 확인

### 브라우저 콘솔에서 확인

1. F12 → **Console** 탭
2. 다음 출력 확인:
   ```
   🔗 API_BASE: https://xxx.railway.app/api
   ```

**확인 사항:**
- ✅ Railway URL이 나오면: 코드는 정상
- ❌ `undefined` 또는 `localhost:4000/api`가 나오면: **Vercel 환경 변수 미설정**

---

## ✅ 해결 방법

### Vercel 환경 변수 확인/설정

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. `VITE_API_BASE` 확인:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://kepcoplayground-production.up.railway.app/api`
     - (Railway에서 생성한 정확한 URL 확인 필요)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development 모두 체크
5. **Save**

### 중요: 재배포 필수!

환경 변수 변경 후:
1. **Deployments** 탭
2. 최신 배포 → **⋯** → **Redeploy**

또는 빈 커밋으로 트리거:
```bash
git commit --allow-empty -m "Redeploy with environment variables"
git push origin main
```

---

## 🔍 Railway URL 확인

Railway Dashboard에서 정확한 URL 확인:
1. 프로젝트 → **Settings** → **Networking**
2. **Public Domain** 확인
3. Vercel 환경 변수에 정확히 입력:
   ```
   https://[Railway도메인]/api
   ```
   - 마지막에 `/api` 포함 필수!

---

## 📋 확인 체크리스트

- [ ] Railway 도메인 확인
- [ ] Vercel 환경 변수 `VITE_API_BASE` 설정
- [ ] 값이 `https://xxx.railway.app/api` 형식인지 확인
- [ ] Vercel 재배포
- [ ] 브라우저 콘솔에서 API_BASE 확인
- [ ] Network 탭에서 요청 URL 확인

---

## 🆘 여전히 안되면

브라우저 콘솔에서:
```javascript
console.log('API_BASE:', import.meta.env.VITE_API_BASE || 'NOT SET');
```

이 값을 알려주시면 정확히 진단할 수 있습니다!

