Write-Host "Pushing modern theme fixes to GitHub..." -ForegroundColor Green
Set-Location "e:\sahil-datascience.github.io"
git add .
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
git push origin main
Write-Host "Done!" -ForegroundColor Green
Read-Host "Press Enter to continue"
