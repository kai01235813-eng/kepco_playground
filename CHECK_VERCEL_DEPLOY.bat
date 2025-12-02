@echo off
chcp 65001 >nul
echo ============================================
echo Vercel 배포 확인 및 강제 재배포 스크립트
echo ============================================
echo.

echo [1] Git 상태 확인...
git status
echo.

echo [2] 최근 커밋 확인...
git log --oneline -3
echo.

echo [3] 원격 저장소와 동기화 확인...
git fetch origin
git status
echo.

echo [4] 변경사항이 있다면 커밋 및 푸시...
echo 변경사항이 있는지 확인 중...
git add .
git status
echo.

set /p push="변경사항을 GitHub에 푸시하시겠습니까? (y/n): "
if /i "%push%"=="y" (
    echo.
    set /p commit_msg="커밋 메시지를 입력하세요: "
    git commit -m "!commit_msg!"
    git push origin main
    echo.
    echo ✅ GitHub에 푸시 완료!
    echo.
    echo 📝 다음 단계:
    echo    1. Vercel 대시보드로 이동
    echo    2. 프로젝트 선택
    echo    3. "Deployments" 탭 확인
    echo    4. 최신 배포가 자동으로 시작되는지 확인
    echo    5. 빌드 로그 확인
) else (
    echo 푸시를 건너뜁니다.
)

echo.
echo ============================================
echo 완료!
echo ============================================
pause

