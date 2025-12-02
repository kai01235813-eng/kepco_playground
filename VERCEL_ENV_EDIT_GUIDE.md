# ✅ Vercel 환경 변수 수정 가이드

## 현재 상태

✅ **Value는 올바릅니다!**
```
https://kepcoplayground-production.up.railway.app/api
```

❌ **문제**: 이미 존재하는 변수를 다시 추가하려고 해서 에러 발생

---

## 해결 방법

### 기존 변수 수정하기

1. **현재 입력한 것 삭제**
   - Value 필드 옆의 **빼기 아이콘(❌)** 클릭
   - 또는 빈 채로 두고 목록으로 이동

2. **위쪽 목록에서 기존 `VITE_API_BASE` 찾기**
   - 환경 변수 목록이 위에 있을 것입니다
   - `VITE_API_BASE` 찾기

3. **편집 버튼 클릭**
   - 오른쪽의 **연필 아이콘(✏️)** 클릭

4. **값 확인/수정**
   - 값이 `https://kepcoplayground-production.up.railway.app/api`인지 확인
   - 다르면 수정

5. **Environment 확인**
   - Production ✅
   - Preview ✅
   - Development ✅
   - 모두 체크되어 있는지 확인

6. **Save 클릭**

---

## ✅ 완료 후

1. **재배포** (필수!)
   - Deployments 탭 → 최신 배포 → **Redeploy**

2. **테스트**
   - 브라우저 새로고침 (Ctrl+F5)
   - 회원가입/로그인 테스트
   - F12 → Console에서 API_BASE 확인

---

## 📋 요약

- ✅ 값은 올바릅니다: `https://kepcoplayground-production.up.railway.app/api`
- ❌ 새로 추가하지 말고 **기존 것을 수정**하세요
- ✅ 수정 후 **재배포** 필수!

