# 🚀 빠른 GitHub 업로드 가이드

GitHub 저장소: **https://github.com/kai01235813-eng/kepco_playground**

## 방법 1: 배치 파일 사용 (가장 쉬움)

1. 프로젝트 폴더에서 `UPLOAD_TO_GITHUB.bat` 파일을 **더블클릭**
2. 화면의 지시사항 따르기
3. GitHub Personal Access Token 입력 (비밀번호 대신)

---

## 방법 2: CMD에서 직접 실행

프로젝트 폴더에서 CMD를 열고 다음 명령어를 순서대로 실행:

```cmd
cd /d E:\1.개발\2511_바이브코딩(개인학습)\sw_playground

git init

git add .

git commit -m "Initial commit: KEPCO SW Playground"

git remote add origin https://github.com/kai01235813-eng/kepco_playground.git

git branch -M main

git push -u origin main
```

---

## 🔐 GitHub 인증 (Personal Access Token 필요)

`git push` 실행 시 인증이 필요합니다:

### Token 생성 방법:
1. **GitHub 접속**: https://github.com/settings/tokens
2. **"Generate new token"** → **"Generate new token (classic)"** 클릭
3. 설정:
   - **Note**: `Vercel Deployment`
   - **Expiration**: 90 days 또는 No expiration
   - **Scopes**: **`repo`** 체크 (전체 저장소 권한)
4. **"Generate token"** 클릭
5. ⚠️ **토큰을 복사** (한 번만 보여줍니다!)

### Push 시 사용:
- **Username**: `kai01235813-eng`
- **Password**: 복사한 토큰 (GitHub 비밀번호 아님!)

---

## ✅ 확인

업로드 성공 후:
- https://github.com/kai01235813-eng/kepco_playground 접속
- 파일들이 보이면 성공!

---

## 🔄 이후 업데이트

코드를 수정한 후:

```cmd
git add .
git commit -m "변경 내용 설명"
git push
```

---

## 🆘 문제 해결

### "remote origin already exists"
```cmd
git remote remove origin
git remote add origin https://github.com/kai01235813-eng/kepco_playground.git
```

### "Authentication failed"
- Personal Access Token을 사용하는지 확인
- GitHub 비밀번호가 아닌 토큰을 사용해야 합니다

### "git: command not found"
- Git이 설치되어 있는지 확인
- CMD를 다시 시작


