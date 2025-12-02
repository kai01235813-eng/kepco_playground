@echo off
chcp 65001 >nul
echo ============================================
echo CORS 에러 해결을 위한 긴급 배포
echo ============================================
echo.

echo [1] 변경사항 확인...
git status
echo.

echo [2] 변경사항 추가...
git add server/index.js src/config/api.ts src/components/SimpleLogin.tsx
echo.

echo [3] 커밋...
git commit -m "Fix CORS preflight and improve error handling"
echo.

echo [4] GitHub에 푸시...
git push origin main
echo.

echo ============================================
echo ✅ 배포 완료!
echo ============================================
echo.
echo 📝 다음 단계:
echo    1. Railway Dashboard 확인 (서버 재배포 확인)
echo    2. Vercel Dashboard 확인 (프론트엔드 재배포 확인)
echo    3. 약 2-3분 대기 후 테스트
echo.
pause

