Write-Host "Pushing modern theme fixes to GitHub..." -ForegroundColor Green
Set-Location "e:\sahil-datascience.github.io"

Write-Host "Staging files..." -ForegroundColor Yellow
git add .

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Fix modern theme styling, responsive design, and website functionality

- Enhanced SCSS compilation with proper import order
- Fixed masthead positioning and navigation visibility  
- Added comprehensive modern theme components and layouts
- Improved responsive design for mobile devices
- Added collapsible sidebar and floating action buttons
- Enhanced typography and color scheme consistency
- Added dark mode support with proper theme transitions
- Created modern archive and page layouts
- Fixed body padding to accommodate fixed header
- Added comprehensive documentation in MODERN_THEME_GUIDE.md"

Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
git push origin main

Write-Host "Successfully pushed all changes!" -ForegroundColor Green
Write-Host "Your website will be updated in 1-2 minutes on GitHub Pages." -ForegroundColor Cyan
Read-Host "Press Enter to continue"
