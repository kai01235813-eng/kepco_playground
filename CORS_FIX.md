# 🔧 CORS 에러 해결

## 발견된 문제

1. **이중 슬래시 문제**: URL에 `//posts` (이중 슬래시)
2. **CORS 에러**: Railway 서버에서 CORS 헤더가 제대로 설정되지 않음

---

## ✅ 해결 방법

### 1. API_BASE URL 정규화 (완료)
- URL 끝의 슬래시 자동 제거
- 이중 슬래시 방지

### 2. CORS 설정 강화 (완료)
- 모든 오리진 허용 (`origin: '*'`)
- 필요한 메서드 허용
- 명시적 헤더 설정

---

## 🚀 배포 필요

코드 수정 후 **반드시 배포:**

```bash
git add .
git commit -m "Fix CORS and double slash issue"
git push origin main
```

이렇게 하면:
- ✅ Vercel: 프론트엔드 자동 배포
- ✅ Railway: 백엔드 자동 배포

---

## 🔍 확인 방법

배포 후:
1. 브라우저 콘솔에서 CORS 에러가 사라졌는지 확인
2. Network 탭에서 요청이 성공하는지 확인 (Status 200)
3. 회원가입/로그인 테스트

---

## ⚠️ 참고

Railway 서버가 재배포되면:
- CORS 설정이 새로 적용됨
- 모든 Vercel 도메인에서 접근 가능
- 이중 슬래시 문제 해결

