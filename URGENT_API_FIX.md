# 🚨 긴급: API 경로 문제 해결

## 문제 발견

콘솔에서 보이는 요청:
```
GET https://kepcoplayground-production.up.railway.app/posts 404
```

**문제**: `/api`가 빠져있음!

---

## 원인

`API_BASE` 환경 변수가 빌드 시점에 적용되지 않았습니다.

---

## ✅ 해결 방법

### 1단계: Vercel 환경 변수 확인

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. 프로젝트 → Settings → Environment Variables
3. `VITE_API_BASE` 확인:
   - 값: `https://kepcoplayground-production.up.railway.app/api`
   - Environment: 모두 체크 (Production, Preview, Development)

### 2단계: 기존 변수 삭제 후 재생성 (필요 시)

만약 계속 안되면:
1. 기존 `VITE_API_BASE` 삭제
2. 새로 추가:
   - Key: `VITE_API_BASE`
   - Value: `https://kepcoplayground-production.up.railway.app/api`
   - Environment: 모두 체크

### 3단계: 강제 재배포

환경 변수 설정 후:
1. Deployments 탭
2. 최신 배포 → ⋯ → **Redeploy**

또는:
```bash
git commit --allow-empty -m "Force redeploy with env vars"
git push origin main
```

### 4단계: 배포 확인

배포 완료 후 (약 2-3분):
1. 브라우저 새로고침 (Ctrl+F5)
2. F12 → Console 확인
3. 다음 로그가 보여야 함:
   ```
   🔗 API_BASE: https://kepcoplayground-production.up.railway.app/api
   ```

---

## 🔍 확인 방법

브라우저 콘솔에서:
```javascript
console.log('API_BASE:', import.meta.env.VITE_API_BASE);
```

**예상 결과:**
```
API_BASE: https://kepcoplayground-production.up.railway.app/api
```

만약 `undefined`가 나오면 환경 변수가 설정되지 않은 것입니다.

---

## ⚠️ 중요

환경 변수는 **빌드 시점**에 적용됩니다!
- 환경 변수 변경 후 **반드시 재배포** 필요
- 단순 저장만으로는 반영 안됨

