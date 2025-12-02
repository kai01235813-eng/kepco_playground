# HOT 아이디어 TOP3 선발 API 사용 방법

## 방법 1: 브라우저 개발자 도구 사용 (가장 간단)

1. 웹사이트에서 F12 키를 눌러 개발자 도구 열기
2. Console 탭으로 이동
3. 아래 코드를 입력하고 Enter:

```javascript
fetch('http://localhost:4000/api/hot-ideas/select', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.json())
  .then(data => console.log('선발 결과:', data))
  .catch(err => console.error('에러:', err));
```

## 방법 2: PowerShell에서 curl 사용

PowerShell을 열고 다음 명령어 실행:

```powershell
curl -X POST http://localhost:4000/api/hot-ideas/select -H "Content-Type: application/json"
```

## 방법 3: 관리자 페이지에서 버튼 클릭 (추천)

프로젝트에 관리자 페이지를 만들어서 버튼으로 쉽게 호출할 수 있습니다.
관리자 페이지를 만들어드릴까요?

## 방법 4: Postman 사용

1. Postman 앱 열기
2. 새 요청 생성
3. Method: POST 선택
4. URL: `http://localhost:4000/api/hot-ideas/select`
5. Headers에 `Content-Type: application/json` 추가
6. Send 버튼 클릭

## 확인

선발된 HOT 아이디어를 확인하려면:

```javascript
fetch('http://localhost:4000/api/hot-ideas')
  .then(res => res.json())
  .then(data => console.log('현재 주간 HOT 아이디어:', data))
  .catch(err => console.error('에러:', err));
```

