# 🔧 환경 변수 수정 단계별 가이드

## 문제

에러: "A variable with the name 'VITE_API_BASE' already exists"

이것은 **기존 변수를 수정**해야 한다는 의미입니다.

---

## ✅ 해결 방법

### 방법 1: 기존 변수 찾아서 수정 (권장)

1. **현재 입력 필드 초기화**
   - Key와 Value 필드를 **비워두기**
   - 또는 "Add Another" 위쪽의 목록에서 기존 변수 찾기

2. **목록에서 기존 `VITE_API_BASE` 찾기**
   - 환경 변수 목록에서 `VITE_API_BASE` 찾기
   - (아마도 위쪽에 있을 것입니다)

3. **편집 아이콘 클릭**
   - `VITE_API_BASE` 오른쪽의 **연필 아이콘(✏️)** 클릭

4. **값 확인/수정**
   ```
   https://kepcoplayground-production.up.railway.app/api
   ```

5. **Environment 모두 체크**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. **Save** 클릭

---

### 방법 2: 기존 변수 삭제 후 재추가

1. **기존 변수 삭제**
   - 목록에서 `VITE_API_BASE` 찾기
   - 오른쪽의 **삭제 아이콘(❌)** 클릭
   - 확인

2. **새로 추가**
   - Key: `VITE_API_BASE`
   - Value: `https://kepcoplayground-production.up.railway.app/api`
   - Environment: 모두 체크
   - Save

---

## 🚀 재배포 (필수!)

환경 변수 저장 후:
1. **Deployments** 탭으로 이동
2. 최신 배포 → **⋯** → **Redeploy**

또는 빈 커밋:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 🔍 배포 완료 후 확인

배포 완료 후 (2-3분):
1. 브라우저 새로고침 (Ctrl+F5)
2. F12 → Console 확인
3. 다음이 보여야 함:
   ```
   🔗 API_BASE: https://kepcoplayground-production.up.railway.app/api
   ```

만약 여전히 `undefined`가 보이면:
- Vercel에서 환경 변수가 제대로 저장되었는지 확인
- 재배포가 완료되었는지 확인

