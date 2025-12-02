# Railway 배포 정보

## ✅ Railway는 자동 배포됩니다!

### GitHub 푸시 시 자동 배포
- GitHub에 `git push` 하면 **자동으로 재배포**됩니다
- 별도 작업 불필요! ✨

---

## 🔄 배포 시나리오

### 코드 변경 시
```
코드 수정 → git push → Railway 자동 재배포 ✅
```

### 환경 변수 변경 시
- Railway Dashboard → **Variables** 탭에서 수정
- **재배포 불필요!** 즉시 반영됨
- 서버가 자동으로 재시작됨

### 수동 재배포가 필요한 경우
- 배포 실패 시
- 서버가 멈춘 경우
- Railway Dashboard → **Deployments** → **Redeploy** 클릭

---

## 📊 현재 상황

### Vercel (프론트엔드)
- 환경 변수 변경 → **재배포 필요** ⚠️
- 코드 변경 → 자동 배포 ✅

### Railway (백엔드)
- 환경 변수 변경 → **재배포 불필요** ✅ (즉시 반영)
- 코드 변경 → 자동 배포 ✅

---

## 🔍 Railway 상태 확인

1. [Railway Dashboard](https://railway.app/dashboard)
2. 프로젝트 선택
3. **Deployments** 탭 확인:
   - ✅ **Active** = 정상 작동 중
   - 🔄 **Deploying** = 배포 중
   - ❌ **Failed** = 배포 실패 (로그 확인)

---

## ⚠️ 주의사항

### Railway 서버가 멈춘 경우
- 무료 플랜은 일정 시간 비활성 시 자동으로 멈춤
- 요청이 오면 자동으로 다시 시작됨
- 첫 요청이 느릴 수 있음 (Cold Start)

### 수동 재시작이 필요한 경우
- Railway Dashboard → **Deployments** → **Redeploy**

---

## 🎯 요약

**Railway는 GitHub 푸시 시 자동 배포되므로 수동 작업 불필요!**

- ✅ 코드 변경 → `git push` → 자동 배포
- ✅ 환경 변수 변경 → Dashboard에서 수정 → 즉시 반영
- ❌ 수동 재배포 불필요 (특별한 경우 제외)

