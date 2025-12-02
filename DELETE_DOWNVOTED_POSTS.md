# 반대표를 받은 게시글 삭제하기

## 방법 1: API 엔드포인트 사용 (권장)

### Railway 배포 후 사용

1. **Railway 서버 주소 확인**
   - Railway Dashboard에서 서버 URL 확인
   - 예: `https://kepcoplayground-production.up.railway.app`

2. **API 호출**
   ```bash
   # PowerShell에서
   Invoke-WebRequest -Method DELETE -Uri "https://[Railway서버주소]/api/admin/posts/downvoted"
   ```

   또는 브라우저 개발자 도구 Console에서:
   ```javascript
   fetch('https://[Railway서버주소]/api/admin/posts/downvoted', {
     method: 'DELETE'
   })
   .then(res => res.json())
   .then(data => console.log('삭제 완료:', data));
   ```

## 방법 2: 로컬 스크립트 사용

로컬 데이터베이스에 게시글이 있는 경우:

```bash
cd server
node delete_by_title.js
```

---

## 참고

- 이 API는 **net_score가 -1인 게시글** (반대표 1개를 받은 게시글)을 모두 삭제합니다.
- 게시글과 함께 연관된 투표, 댓글, HOT 아이디어 정보도 함께 삭제됩니다.

