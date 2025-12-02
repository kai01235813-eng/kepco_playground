# 🔍 CORS 에러 지속 문제 해결

## 현재 상황

GitHub에 배포했는데도 CORS 에러가 계속 발생합니다.

---

## 🔍 확인해야 할 것들

### 1. Railway 배포 상태 확인

1. [Railway Dashboard](https://railway.app/dashboard) 접속
2. 프로젝트 선택
3. **Deployments** 탭 확인:
   - 최신 배포가 **성공**했는지 확인
   - **Logs** 탭에서 서버가 정상 시작되었는지 확인

### 2. Railway 서버 재시작

Railway Dashboard에서:
- **Deployments** → 최신 배포 → **Redeploy** 클릭
- 또는 **Settings** → **Restart Service** 클릭

### 3. CORS 헤더 확인

브라우저 콘솔에서 테스트:
```javascript
// Railway 서버 직접 테스트
fetch('https://kepcoplayground-production.up.railway.app/api/auth/signup', {
  method: 'OPTIONS', // CORS preflight
  headers: {
    'Origin': window.location.origin,
    'Access-Control-Request-Method': 'POST'
  }
})
.then(r => {
  console.log('CORS Headers:', {
    'access-control-allow-origin': r.headers.get('access-control-allow-origin'),
    'access-control-allow-methods': r.headers.get('access-control-allow-methods'),
    status: r.status
  });
})
.catch(e => console.error('CORS Test Error:', e));
```

### 4. 서버 로그 확인

Railway Dashboard → **Logs** 탭에서:
- 서버가 정상 시작되었는지 확인
- CORS 관련 에러가 있는지 확인
- `/api/auth/signup` 요청이 들어오는지 확인

---

## 🔧 해결 방법

### 방법 1: Railway 서버 수동 재시작

1. Railway Dashboard 접속
2. 프로젝트 → **Deployments**
3. 최신 배포 → **Redeploy**

### 방법 2: 코드 재확인 및 강제 재배포

서버 코드에 OPTIONS 요청 핸들러 추가:

```javascript
// OPTIONS 요청 처리 (CORS preflight)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
```

---

## 📋 확인 체크리스트

- [ ] Railway 최신 배포가 성공했는가?
- [ ] Railway 로그에서 서버가 정상 시작되었는가?
- [ ] CORS 헤더가 응답에 포함되는가?
- [ ] API URL이 올바른가? (이중 슬래시 없음)
- [ ] Railway 서버를 수동으로 재시작했는가?

---

## 🆘 여전히 안되면

1. Railway 로그 전체 복사
2. Network 탭에서 `/auth/signup` 요청의 **Response Headers** 확인
3. `Access-Control-Allow-Origin` 헤더가 있는지 확인

