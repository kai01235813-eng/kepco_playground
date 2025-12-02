# GitHub Push 오류 해결

## 문제: "fatal: 'origin' does not appear to be a git repository"

이 오류는 Git remote가 설정되지 않았을 때 발생합니다.

---

## 🔧 해결 방법

PowerShell이나 CMD에서 다음 명령어 실행:

```cmd
cd /d E:\1.개발\2511_바이브코딩(개인학습)\sw_playground

# 1. 기존 remote 확인 (없으면 빈 결과)
git remote -v

# 2. 기존 origin 제거 (있다면)
git remote remove origin

# 3. GitHub 저장소 연결
git remote add origin https://github.com/kai01235813-eng/kepco_playground.git

# 4. 연결 확인
git remote -v

# 5. Push 시도
git push -u origin main
```

---

## ✅ 성공하면

- 코드가 GitHub에 업로드됩니다
- https://github.com/kai01235813-eng/kepco_playground 에서 확인 가능

---

## 🔐 인증 오류 발생 시

`git push` 시 인증이 필요하면:

1. **Username**: `kai01235813-eng`
2. **Password**: GitHub Personal Access Token (비밀번호 아님!)

### Personal Access Token 생성:
- https://github.com/settings/tokens
- "Generate new token (classic)"
- `repo` scope 선택
- 생성된 토큰을 복사하여 비밀번호로 사용

