# Git 설치 가이드 (Windows)

## 방법 1: Git 공식 웹사이트에서 다운로드 (추천)

1. **Git 공식 웹사이트 접속**
   - https://git-scm.com/download/win
   - 또는 https://github.com/git-for-windows/git/releases

2. **다운로드 및 설치**
   - 자동으로 다운로드 시작 (64-bit Git for Windows Setup)
   - 다운로드한 `.exe` 파일 실행
   - 설치 과정에서 기본 설정 사용 (Next 계속 클릭)
   - **"Git from the command line and also from 3rd-party software"** 옵션 선택 (중요!)

3. **설치 확인**
   - PowerShell 또는 Command Prompt를 **새로 열기** (중요!)
   - 다음 명령어 실행:
   ```bash
   git --version
   ```
   - 버전 정보가 표시되면 설치 성공!

---

## 방법 2: Winget 사용 (Windows 10/11)

PowerShell을 **관리자 권한**으로 실행한 후:

```powershell
winget install --id Git.Git -e --source winget
```

설치 후 PowerShell을 새로 열고 확인:
```bash
git --version
```

---

## 방법 3: Chocolatey 사용 (Chocolatey가 설치되어 있는 경우)

관리자 권한 PowerShell에서:

```powershell
choco install git
```

---

## 설치 후 설정

Git이 설치되면 다음 명령어로 사용자 정보 설정:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

예시:
```bash
git config --global user.name "홍길동"
git config --global user.email "hong@kepco.co.kr"
```

---

## 주의사항

⚠️ **중요**: Git 설치 후에는 **PowerShell이나 Command Prompt를 완전히 닫았다가 다시 열어야** 합니다. 그래야 새로 설치된 Git을 인식할 수 있습니다.

---

## 설치 확인 후 프로젝트에 Git 적용

Git이 정상적으로 설치되면 프로젝트 폴더에서:

```bash
git init
git add .
git commit -m "Initial commit: KEPCO SW Playground"
```

이제 정상적으로 작동할 것입니다!

