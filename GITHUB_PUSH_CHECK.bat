@echo off
echo ========================================
echo GitHub Push 확인 및 재시도
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 현재 상태 확인...
git status
echo.

echo [2/4] 최근 커밋 확인...
git log --oneline -3
echo.

echo [3/4] 변경된 파일 확인...
git diff HEAD~1 --name-only
echo.

echo [4/4] GitHub에 푸시...
echo.
echo 다음 명령어를 실행합니다:
echo   git add -A
echo   git commit -m "Fix: Correct all import paths for config/api"
echo   git push origin main
echo.
pause

git add -A
git commit -m "Fix: Correct all import paths for config/api"
git push origin main

echo.
echo ========================================
echo 완료!
echo ========================================
echo.
echo GitHub 저장소에서 확인:
echo https://github.com/kai01235813-eng/kepco_playground
echo.
echo 다음 파일들이 수정되었는지 확인하세요:
echo - src/components/ActivityFeed.tsx (line 3)
echo - src/components/HotIdeasSection.tsx (line 4)
echo - src/components/SimpleLogin.tsx (line 3)
echo.
echo 모두 "from '../config/api'"를 사용해야 합니다.
echo.
pause

