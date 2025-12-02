# 🚨 Railway 배포 실패 해결

## 문제 원인

**Healthcheck failed!** 
- Railway가 서버 상태 확인(healthcheck)에 실패
- 서버가 시작되었는지 확인할 수 없음

---

## ✅ 해결 방법

### 1. Healthcheck 엔드포인트 추가 (완료)

서버에 다음 엔드포인트가 추가되었습니다:
- `GET /` - 기본 healthcheck
- `GET /health` - 명시적 healthcheck

### 2. Railway 설정 업데이트 (완료)

`railway.json` 파일 수정:
- `healthcheckPath`: `/health`
- `healthcheckTimeout`: 300초 (데이터베이스 초기화 시간 확보)

---

## 🚀 배포

```bash
git add .
git commit -m "Add healthcheck endpoints for Railway"
git push origin main
```

---

## 🔍 Railway에서 확인

배포 후:
1. Railway Dashboard → **Deployments** 탭
2. 최신 배포 상태 확인:
   - ✅ **Active** = 성공
   - ❌ **Failed** = 실패 (로그 확인)

### 로그 확인

Railway Dashboard → **Logs** 탭에서 확인:
```
Anonymous board API server running on http://localhost:4000
```

이 메시지가 보이면 서버가 정상 시작된 것입니다.

---

## ⚠️ 추가 문제가 있으면

### 데이터베이스 초기화 시간 부족
- SQLite 파일 생성에 시간이 걸릴 수 있음
- Healthcheck timeout을 300초로 증가시킴

### 포트 문제
- Railway가 자동으로 PORT 환경 변수 설정
- 코드에서 `process.env.PORT` 사용 중 ✅

---

## 📋 체크리스트

- [x] Healthcheck 엔드포인트 추가
- [x] railway.json 업데이트
- [ ] GitHub에 푸시
- [ ] Railway 배포 확인
- [ ] 로그 확인

