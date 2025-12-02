@echo off
echo ========================================
echo KEPCO SW Playground - GitHub Upload
echo ========================================
echo.

REM 프로젝트 폴더로 이동
cd /d "%~dp0"

echo [1/6] Checking Git installation...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git first: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo Git is installed!
echo.

echo [2/6] Initializing Git repository...
if exist .git (
    echo Git repository already exists.
) else (
    git init
    echo Git repository initialized.
)
echo.

echo [3/6] Adding all files...
git add .
echo Files added.
echo.

echo [4/6] Committing changes...
git commit -m "Initial commit: KEPCO SW Playground" || (
    echo ERROR: Commit failed. Make sure you have configured Git user name and email:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)
echo Commit created.
echo.

echo [5/6] Adding remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/kai01235813-eng/kepco_playground.git
echo Remote repository added.
echo.

echo [6/6] Pushing to GitHub...
echo.
echo WARNING: You may be prompted for GitHub credentials.
echo - Username: kai01235813-eng
echo - Password: GitHub Personal Access Token (not your GitHub password!)
echo.
echo If you don't have a Personal Access Token:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. Select 'repo' scope
echo 4. Copy the token and use it as password
echo.
pause
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Possible solutions:
    echo 1. Make sure you have a Personal Access Token
    echo 2. Check your internet connection
    echo 3. Try: git push -u origin main
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
echo Next step: Go to Vercel and deploy!
echo.
pause

