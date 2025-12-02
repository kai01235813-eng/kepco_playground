# Vercel 배포 문제 해결 가이드

## ❌ 포트 번호와 Vercel 배포는 무관합니다!

**중요:** `vite.config.ts`의 `server.port` 설정은 **로컬 개발 서버용**이며, Vercel 빌드 결과물에는 영향을 주지 않습니다.

---

## 🔍 문제 진단

### 1. 최근 추가한 파일들이 커밋되었는지 확인

```bash
git status
```

만약 `RankingPage.tsx`, `AdminPage.tsx` 등이 보이지 않으면:

```bash
git add .
git commit -m "랭킹 페이지 및 관리자 페이지 추가"
git push origin main
```

### 2. Vercel 대시보드 확인

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Deployments** 탭 확인
   - 최신 배포가 실패했는지 확인
   - 빌드 로그 확인

### 3. 빌드 로그 확인

Vercel 대시보드에서:
- 최신 배포 클릭
- **Build Logs** 탭 확인
- 에러 메시지 확인

---

## 🚀 해결 방법

### 방법 1: 강제 재배포 (가장 빠름)

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Git**
3. **Redeploy** 버튼 클릭

### 방법 2: 빈 커밋으로 트리거

```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin main
```

### 방법 3: 수동 배포 확인

```bash
# 1. 로컬에서 빌드 테스트
npm run build

# 2. 빌드 성공하면 GitHub에 푸시
git add .
git commit -m "배포 확인"
git push origin main
```

---

## ✅ 체크리스트

- [ ] 모든 변경 파일이 Git에 추가되었는가?
- [ ] GitHub에 푸시되었는가?
- [ ] Vercel이 최신 커밋을 감지했는가?
- [ ] 빌드가 성공했는가? (로그 확인)
- [ ] 배포가 완료되었는가?

---

## 🔧 자주 발생하는 문제

### 문제 1: 빌드 에러
```
Error: Could not resolve "./config/api"
```
**해결:** `src/config/api.ts` 파일 경로 확인

### 문제 2: 타입 에러
**해결:** `npm run build` 로컬에서 먼저 테스트

### 문제 3: 환경 변수 누락
**해결:** Vercel → Settings → Environment Variables 확인

---

## 📞 추가 도움

문제가 지속되면:
1. Vercel 빌드 로그 전체 복사
2. 에러 메시지 확인
3. GitHub 저장소와 Vercel 프로젝트 연결 확인

