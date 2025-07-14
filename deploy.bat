@echo off
echo Deploying modern theme fixes to GitHub...
cd /d "e:\sahil-datascience.github.io"

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Fix modern theme styling and website functionality"

echo Pushing to GitHub...
git push origin main

echo.
echo Done! Your website will be updated in 1-2 minutes.
pause
