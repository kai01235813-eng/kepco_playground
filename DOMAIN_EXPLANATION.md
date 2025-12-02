# 🌐 도메인 이름 차이 설명

## 도메인 이름은 문제가 아닙니다!

### GitHub 저장소
- `kai01235813-eng/kepco_playground`

### Vercel 도메인
- `kepco-playground.vercel.app`

**이것은 정상입니다!** Vercel이 자동으로 생성하는 도메인 이름입니다.

---

## ✅ 404 에러의 실제 원인

도메인 이름 차이가 아니라:
1. **Vercel 환경 변수가 제대로 설정되지 않음**
2. **재배포가 안되어 환경 변수가 반영되지 않음**
3. **API_BASE가 제대로 읽히지 않음**

---

## 🔍 확인 방법

### 브라우저 콘솔에서 확인

F12 → Console 탭:
```javascript
console.log('API_BASE:', import.meta.env.VITE_API_BASE);
```

**확인 사항:**
- ✅ `https://kepcoplayground-production.up.railway.app/api`가 나오면 → 정상
- ❌ `undefined` 또는 `localhost:4000/api`가 나오면 → 환경 변수 문제

---

## ✅ 해결 방법

1. **Vercel 환경 변수 확인**
   - `VITE_API_BASE` = `https://kepcoplayground-production.up.railway.app/api`
   
2. **모든 Environment 체크**
   - Production ✅
   - Preview ✅
   - Development ✅

3. **재배포 필수!**
   - Deployments → Redeploy

4. **브라우저에서 확인**
   - F12 → Console
   - API_BASE 값 확인

---

## 📝 요약

- 도메인 이름 차이는 **정상**입니다
- 문제는 **환경 변수 설정 및 재배포**입니다
- 브라우저 콘솔에서 API_BASE 값 확인하세요

