@echo off
echo ========================================
echo GitHub Upload with Token
echo ========================================
echo.

cd /d "%~dp0"

echo Please enter your GitHub Personal Access Token:
echo (Get it from: https://github.com/settings/tokens)
echo.
set /p GITHUB_TOKEN="Token: "

if "%GITHUB_TOKEN%"=="" (
    echo ERROR: Token is required!
    pause
    exit /b 1
)

echo.
echo [1/4] Removing old remote...
git remote remove origin >nul 2>&1

echo [2/4] Adding remote with token...
git remote add origin https://%GITHUB_TOKEN%@github.com/kai01235813-eng/kepco_playground.git

echo [3/4] Pushing to GitHub...
git branch -M main >nul 2>&1
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo Please check:
    echo 1. Token is valid
    echo 2. Token has 'repo' scope
    echo 3. Internet connection is working
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Code uploaded to GitHub!
echo ========================================
echo.
echo Repository: https://github.com/kai01235813-eng/kepco_playground
echo.
pause

