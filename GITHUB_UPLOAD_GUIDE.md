# 📤 GitHub에 코드 업로드 가이드

이 가이드는 KEPCO SW Playground 프로젝트를 GitHub에 업로드하는 전체 과정을 설명합니다.

## 📋 사전 준비

1. **GitHub 계정** 필요 (없으면 https://github.com 가입)
2. **Git 설치 완료** 확인 (`git --version` 명령어로 확인)

---

## 🚀 Step 1: GitHub에서 새 저장소 생성

1. **GitHub 로그인**
   - https://github.com 접속
   - 로그인

2. **새 저장소 만들기**
   - 우측 상단 **"+"** 버튼 클릭
   - **"New repository"** 선택

3. **저장소 정보 입력**
   - **Repository name**: `kepco-playground` (또는 원하는 이름)
   - **Description**: "KEPCO SW Playground - DX 생태계 플랫폼" (선택사항)
   - **Visibility**: 
     - ☑️ **Private** (비공개 - 추천) 또는
     - ☐ **Public** (공개)
   - ⚠️ **"Initialize this repository with a README"** 체크 해제
   - ⚠️ **"Add .gitignore"** 체크 해제 (이미 프로젝트에 있음)
   - ⚠️ **"Choose a license"** 선택 안 함

4. **"Create repository"** 클릭

5. **저장소 URL 복사**
   - 다음 페이지에서 HTTPS 또는 SSH URL 복사
   - 예: `https://github.com/YOUR_USERNAME/kepco-playground.git`

---

## 💻 Step 2: 프로젝트 폴더에서 Git 초기화 및 업로드

### CMD 또는 PowerShell에서 실행:

```bash
# 1. 프로젝트 폴더로 이동 (이미 있으면 생략)
cd /d E:\1.개발\2511_바이브코딩(개인학습)\sw_playground

# 2. Git 저장소 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋
git commit -m "Initial commit: KEPCO SW Playground"

# 5. GitHub 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 예시: git remote add origin https://github.com/kai01235813-eng/kepco_playground.git

# 6. 브랜치 이름을 main으로 설정 (필요한 경우)
git branch -M main

# 7. 코드를 GitHub에 업로드
git push -u origin main
```

---

## 🔐 Step 3: 인증 문제 해결

### 문제 1: "Authentication failed" 또는 "Access denied" 에러

**해결 방법: GitHub Personal Access Token 사용**

1. **GitHub에서 토큰 생성**:
   - GitHub → 우측 상단 프로필 → **Settings**
   - 왼쪽 메뉴 맨 아래 → **Developer settings**
   - **Personal access tokens** → **Tokens (classic)**
   - **Generate new token** → **Generate new token (classic)** 클릭
   - **Note**: `Vercel Deployment` (설명)
   - **Expiration**: 90 days 또는 No expiration
   - **Scopes**: 최소한 **`repo`** 체크 (전체 저장소 권한)
   - **Generate token** 클릭
   - ⚠️ **토큰을 복사해두세요! (한 번만 보여줍니다)**

2. **토큰으로 Git 설정**:
   ```bash
   # Git에 자격 증명 저장
   git config --global credential.helper wincred
   
   # 다시 push 시도 (Username은 GitHub 사용자명, Password는 복사한 토큰)
   git push -u origin main
   ```

3. **또는 URL에 토큰 포함**:
   ```bash
   # 기존 remote 제거
   git remote remove origin
   
   # 토큰 포함하여 추가 (YOUR_TOKEN을 실제 토큰으로 변경)
   git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   
   # Push
   git push -u origin main
   ```

### 문제 2: "git: 'credential-manager' is not a git command"

**해결 방법**:
```bash
# 다른 자격 증명 관리자 사용
git config --global credential.helper manager-core
# 또는
git config --global credential.helper store
```

---

## ✅ Step 4: 업로드 확인

1. **GitHub 저장소 페이지 새로고침**
   - https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
   - 파일들이 보이면 성공!

2. **로컬에서 확인**:
   ```bash
   git remote -v
   ```
   - origin URL이 보이면 연결 성공

---

## 🔄 이후 코드 업데이트 방법

코드를 수정한 후:

```bash
# 1. 변경된 파일 확인
git status

# 2. 모든 변경사항 추가
git add .

# 3. 커밋 (변경 내용 설명)
git commit -m "변경 내용 설명"

# 4. GitHub에 업로드
git push
```

---

## 🎯 빠른 참조: 한 번에 실행할 명령어

```bash
cd /d E:\1.개발\2511_바이브코딩(개인학습)\sw_playground
git init
git add .
git commit -m "Initial commit: KEPCO SW Playground"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**⚠️ 위 명령어에서 `YOUR_USERNAME`과 `YOUR_REPO_NAME`을 실제 값으로 변경하세요!**

예시:
```bash
git remote add origin https://github.com/kai01235813-eng/kepco_playground.git
```

---

## 🆘 문제 해결

### "fatal: remote origin already exists"
```bash
# 기존 remote 제거 후 다시 추가
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### "error: failed to push some refs"
```bash
# 원격 저장소와 로컬 동기화
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Git이 설치되지 않았다면
- `GIT_SETUP.md` 파일 참고하거나
- https://git-scm.com/download/win 에서 다운로드

---

## 📝 다음 단계

GitHub에 코드가 업로드되면:
1. Vercel로 돌아가기
2. Vercel에서 GitHub 저장소 새로고침 또는 재선택
3. 이제 배포가 가능합니다!


