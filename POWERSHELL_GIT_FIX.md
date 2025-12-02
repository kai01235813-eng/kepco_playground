# PowerShell에서 Git 인식 문제 해결

CMD에서는 `git` 명령어가 작동하는데 PowerShell에서는 안 되는 경우, PowerShell의 환경 변수가 업데이트되지 않았을 수 있습니다.

## 🔧 해결 방법

### 방법 1: PowerShell 재시작 (가장 간단)

1. **현재 PowerShell 창을 완전히 닫기**
2. **새 PowerShell 창 열기**
3. 프로젝트 폴더로 이동 후 다시 시도:
   ```powershell
   cd "E:\1.개발\2511_바이브코딩(개인학습)\sw_playground"
   git init
   ```

### 방법 2: 환경 변수 수동 새로고침

현재 PowerShell 세션에서:

```powershell
# 현재 세션의 PATH에 Git 경로 추가
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 확인
git --version
```

### 방법 3: Git 전체 경로 사용 (임시 해결)

PowerShell에서 Git 전체 경로를 직접 사용:

```powershell
# 일반적인 Git 설치 경로
& "C:\Program Files\Git\cmd\git.exe" init

# 또는
& "C:\Program Files (x86)\Git\cmd\git.exe" init
```

### 방법 4: Git 경로 찾기 및 PATH 추가

1. **CMD에서 Git 경로 확인**:
   ```cmd
   where git
   ```
   예를 들어 `C:\Program Files\Git\cmd\git.exe` 같은 경로가 나옵니다.

2. **PowerShell에서 해당 경로 추가**:
   ```powershell
   # Git이 있는 디렉터리 경로를 PATH에 추가 (예시)
   $env:Path += ";C:\Program Files\Git\cmd"
   
   # 확인
   git --version
   ```

3. **영구적으로 추가하려면** (관리자 권한 필요):
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\Git\cmd", "User")
   ```
   그 후 PowerShell을 다시 시작합니다.

## 💡 빠른 해결책 (권장)

가장 쉬운 방법은 **CMD를 사용**하는 것입니다:

```cmd
cd /d E:\1.개발\2511_바이브코딩(개인학습)\sw_playground
git init
git add .
git commit -m "Initial commit: KEPCO SW Playground"
```

CMD에서도 Git 작업이 모두 정상적으로 작동합니다!

## 📝 참고사항

- CMD와 PowerShell은 환경 변수를 다르게 로드합니다
- Git 설치 후 CMD는 자동으로 인식되지만, PowerShell은 재시작이 필요할 수 있습니다
- 대부분의 경우 PowerShell을 재시작하면 해결됩니다


