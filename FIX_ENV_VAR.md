# 🔧 환경 변수 중복 에러 해결

## 문제

"A variable with the name 'VITE_API_BASE' already exists" 에러가 계속 발생합니다.

---

## ✅ 해결 방법 (2가지)

### 방법 1: 기존 변수 삭제 후 재생성 (권장)

1. **환경 변수 목록 찾기**
   - 페이지 위쪽이나 아래쪽에 기존 환경 변수 목록이 있을 것입니다
   - 목록에서 `VITE_API_BASE` 찾기

2. **기존 변수 삭제**
   - `VITE_API_BASE` 오른쪽의 **삭제 아이콘(❌)** 클릭
   - 확인 메시지에서 삭제 확인

3. **새로 추가**
   - Key: `VITE_API_BASE`
   - Value: `https://kepcoplayground-production.up.railway.app/api`
   - Environment: 모두 체크 (Production, Preview, Development)
   - Save

### 방법 2: 기존 변수 수정

1. **목록에서 기존 `VITE_API_BASE` 찾기**
   - 환경 변수 목록에서 찾기

2. **편집 버튼 클릭**
   - 오른쪽의 **연필 아이콘(✏️)** 클릭

3. **값 확인/수정**
   - Value가 `https://kepcoplayground-production.up.railway.app/api`인지 확인
   - 다르면 수정

4. **Environment 모두 체크**
   - Production ✅
   - Preview ✅
   - Development ✅

5. **Save 클릭**

---

## ⚠️ 현재 입력 필드 처리

현재 입력 필드에 있는 것:
- **삭제**: Value 필드 옆의 **삭제 아이콘(❌)** 클릭
- 또는 빈 채로 두고 목록의 기존 변수 수정

---

## 🚀 재배포 필수!

변수 저장 후:
1. **Deployments** 탭으로 이동
2. 최신 배포 → **⋯** → **Redeploy**

또는:
```bash
git commit --allow-empty -m "Force redeploy after env var fix"
git push origin main
```

---

## 🔍 확인 방법

배포 완료 후 (2-3분):
1. 브라우저 새로고침 (Ctrl+F5)
2. F12 → Console
3. 다음 로그 확인:
   ```
   🔗 API_BASE: https://kepcoplayground-production.up.railway.app/api
   ```

만약 여전히 `undefined`가 나오면:
- 환경 변수가 제대로 저장되지 않은 것
- 재배포가 안된 것

---

## 📋 단계별 체크리스트

- [ ] 현재 입력 필드 삭제 또는 비워두기
- [ ] 목록에서 기존 `VITE_API_BASE` 찾기
- [ ] 기존 변수 삭제 또는 수정
- [ ] 값 확인: `https://kepcoplayground-production.up.railway.app/api`
- [ ] 모든 Environment 체크
- [ ] Save 클릭
- [ ] Deployments → Redeploy
- [ ] 2-3분 대기
- [ ] 브라우저에서 테스트

