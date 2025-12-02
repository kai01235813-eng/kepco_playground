# 🔧 Vercel 환경 변수 수정 가이드

## 문제

- **에러**: "A variable with the name 'VITE_API_BASE' already exists"
- **현재 값**: `kepcoplayground-production.up.railway.ap` (잘못됨)
  - 끝이 잘림
  - `/api` 없음
  - `https://` 없음

---

## ✅ 해결 방법

### 기존 환경 변수 수정하기

**새로 추가하지 말고 기존 것을 수정하세요!**

1. **환경 변수 목록에서 찾기**
   - Vercel Dashboard → Settings → Environment Variables
   - 목록에서 `VITE_API_BASE` 찾기

2. **편집 버튼 클릭**
   - `VITE_API_BASE` 오른쪽에 **연필 아이콘 (✏️)** 클릭

3. **올바른 값으로 수정**
   ```
   https://kepcoplayground-production.up.railway.app/api
   ```
   
   **확인 사항:**
   - ✅ `https://`로 시작
   - ✅ Railway 도메인: `kepcoplayground-production.up.railway.app`
   - ✅ 마지막에 `/api` 포함

4. **Environment 선택**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
   - (모두 체크!)

5. **Save** 클릭

---

## 🚀 재배포 필수!

환경 변수 수정 후:

1. **Deployments** 탭으로 이동
2. 최신 배포 → **⋯** → **Redeploy**
   - 또는 빈 커밋으로 트리거:
   ```bash
   git commit --allow-empty -m "Redeploy with corrected env vars"
   git push origin main
   ```

---

## 🔍 Railway 도메인 확인

Railway Dashboard에서 정확한 도메인 확인:
1. Railway → 프로젝트 → **Settings** → **Networking**
2. **Public Domain** 확인
3. 전체 URL: `https://[도메인]/api`

---

## ✅ 체크리스트

- [ ] 기존 `VITE_API_BASE` 찾기
- [ ] 편집 버튼 클릭
- [ ] 값 수정: `https://kepcoplayground-production.up.railway.app/api`
- [ ] 모든 Environment 체크
- [ ] Save
- [ ] Vercel 재배포
- [ ] 브라우저에서 테스트

