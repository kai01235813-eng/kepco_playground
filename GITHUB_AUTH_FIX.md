# GitHub 인증 오류 해결

## 오류: "Invalid username or token. Password authentication is not supported"

GitHub는 더 이상 비밀번호 인증을 지원하지 않습니다. Personal Access Token이 필요합니다.

---

## 🔑 해결 방법 1: Personal Access Token 생성 및 사용

### Step 1: Personal Access Token 생성

1. **GitHub 토큰 페이지 접속**:
   - https://github.com/settings/tokens
   - 또는 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **토큰 생성**:
   - **"Generate new token"** → **"Generate new token (classic)"** 클릭
   - **Note**: `Vercel Deployment` (설명)
   - **Expiration**: 90 days 또는 No expiration
   - **Scopes**: 최소한 **`repo`** 체크 (필수!)
   - **"Generate token"** 클릭

3. ⚠️ **토큰 복사** (한 번만 보여줌! 복사해두세요)

### Step 2: URL에 토큰 포함하여 Push

PowerShell에서:

```powershell
# 1. 기존 remote 제거
git remote remove origin

# 2. 토큰 포함하여 remote 추가 (YOUR_TOKEN을 실제 토큰으로 변경)
git remote add origin https://YOUR_TOKEN@github.com/kai01235813-eng/kepco_playground.git

# 3. Push 시도
git push -u origin main
```

**예시**:
```powershell
git remote add origin https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/kai01235813-eng/kepco_playground.git
```

---

## 🔑 해결 방법 2: Git Credential Manager 사용 (권장)

### Step 1: Personal Access Token 생성 (위와 동일)

### Step 2: 일반 URL로 설정하고 Push 시 토큰 입력

```powershell
# 1. 일반 URL로 remote 설정
git remote remove origin
git remote add origin https://github.com/kai01235813-eng/kepco_playground.git

# 2. Push 시도
git push -u origin main
```

**입력 요청 시**:
- **Username**: `kai01235813-eng`
- **Password**: Personal Access Token (복사한 토큰)

### Step 3: 자격 증명 저장 (선택)

```powershell
# Windows 자격 증명 관리자 사용
git config --global credential.helper wincred

# 또는 manager-core 사용
git config --global credential.helper manager-core
```

---

## 🔑 해결 방법 3: SSH 사용 (고급)

1. SSH 키 생성 (아직 없다면):
   ```powershell
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. 공개 키를 GitHub에 추가:
   - https://github.com/settings/keys
   - "New SSH key" 클릭
   - `C:\Users\YourUsername\.ssh\id_ed25519.pub` 파일 내용 복사하여 추가

3. SSH URL로 변경:
   ```powershell
   git remote set-url origin git@github.com:kai01235813-eng/kepco_playground.git
   git push -u origin main
   ```

---

## ✅ 추천: 방법 1 (URL에 토큰 포함)

가장 빠르고 확실한 방법입니다:

```powershell
# 토큰 생성 후 (예: ghp_xxxxxxxxxxxx)
git remote remove origin
git remote add origin https://ghp_YOUR_TOKEN_HERE@github.com/kai01235813-eng/kepco_playground.git
git push -u origin main
```

---

## 📝 보안 참고사항

⚠️ **중요**: URL에 토큰을 포함하면 `.git/config` 파일에 평문으로 저장됩니다. 공유하지 마세요!

토큰이 노출되면:
1. GitHub → Settings → Developer settings → Personal access tokens
2. 해당 토큰 삭제
3. 새 토큰 생성

---

## 🎯 빠른 실행 순서

1. https://github.com/settings/tokens 에서 토큰 생성
2. 토큰 복사 (예: `ghp_xxxxxxxxxxxxxxxxxxxx`)
3. PowerShell에서:
   ```powershell
   git remote remove origin
   git remote add origin https://ghp_YOUR_TOKEN@github.com/kai01235813-eng/kepco_playground.git
   git push -u origin main
   ```

---

## ✅ 성공 확인

- 명령어가 성공적으로 완료되면
- https://github.com/kai01235813-eng/kepco_playground 에서 파일 확인
- 파일들이 보이면 성공!

