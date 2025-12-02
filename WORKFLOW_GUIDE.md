# 🚀 개발 워크플로우 가이드

## ✅ 현재 설정된 자동 배포

### 1. **프론트엔드 (Vercel)**
- GitHub에 푸시 → **자동 배포** ✅
- Vercel이 `main` 브랜치 변경 감지
- 자동으로 빌드 및 배포

### 2. **백엔드 (Railway)**
- GitHub에 푸시 → **자동 배포** ✅
- Railway가 저장소 변경 감지
- 자동으로 서버 재시작

---

## 📝 개발 워크플로우

### 1️⃣ 코드 수정
로컬에서 파일 수정

### 2️⃣ 변경사항 커밋 및 푸시
```bash
git add .
git commit -m "변경 내용 설명"
git push origin main
```

### 3️⃣ 자동 배포 ✨
- **Vercel**: 프론트엔드 자동 배포 (약 2-3분)
- **Railway**: 백엔드 자동 배포 (약 1-2분)

**별도 작업 불필요!** 🎉

---

## 🔍 배포 상태 확인

### Vercel 배포 확인
1. [Vercel Dashboard](https://vercel.com/dashboard)
2. 프로젝트 선택
3. **Deployments** 탭에서 상태 확인
   - ✅ 초록색 = 배포 완료
   - 🟡 노란색 = 빌드 중
   - ❌ 빨간색 = 배포 실패 (로그 확인)

### Railway 배포 확인
1. [Railway Dashboard](https://railway.app/dashboard)
2. 프로젝트 선택
3. **Deployments** 탭에서 상태 확인
   - ✅ Active = 실행 중
   - 🔄 Deploying = 배포 중

---

## ⚠️ 주의사항

### 환경 변수 변경 시
- **Vercel**: Dashboard → Settings → Environment Variables에서 수동 수정
- **Railway**: Dashboard → Variables에서 수동 수정

### 데이터베이스 파일
- SQLite 파일은 `.gitignore`에 포함되어 있음
- Railway 재배포 시 데이터가 초기화될 수 있음
- 프로덕션 환경에서는 PostgreSQL 사용 권장

---

## 🎯 요약

```
코드 수정 → git push → 자동 배포 완료! ✨
```

**수동 작업:**
- ✅ 코드 수정
- ✅ `git add .`
- ✅ `git commit -m "메시지"`
- ✅ `git push origin main`

**자동 작업:**
- ✅ Vercel 프론트엔드 배포
- ✅ Railway 백엔드 배포

---

## 🆘 문제 발생 시

### 배포 실패
1. 각 플랫폼의 배포 로그 확인
2. 에러 메시지 확인
3. 로컬에서 `npm run build` (프론트엔드) / `npm run server` (백엔드) 테스트

### 자동 배포가 안 될 때
1. GitHub 저장소 확인 (푸시가 제대로 되었는지)
2. 각 플랫폼의 GitHub 연동 상태 확인
3. 필요 시 수동으로 "Redeploy" 실행

