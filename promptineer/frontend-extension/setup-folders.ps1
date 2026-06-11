# Promptineer Extension - Folder Structure Setup Script
# Platform: Windows PowerShell
# Purpose: Create complete project folder structure for Phase 1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Promptineer Extension - Setup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Get current directory
$projectRoot = Get-Location

Write-Host "Creating folder structure in: $projectRoot" -ForegroundColor Yellow
Write-Host ""

# Define all required directories
$folders = @(
    # Source directories
    "src",
    "src/components/common",
    "src/components/layout",
    "src/components/auth",
    "src/components/prompt",
    "src/components/category",
    "src/components/settings",
    "src/pages",
    "src/hooks",
    "src/services",
    "src/background",
    "src/utils",
    "src/styles",
    "src/store",
    
    # Public/Assets directories
    "public/icons",
    "public/fonts",
    
    # Tests directories
    "tests/__mocks__",
    "tests/hooks",
    "tests/services",
    "tests/utils",
    
    # Configuration directories
    "config",
    "docs"
)

# Create all folders
foreach ($folder in $folders) {
    $fullPath = Join-Path -Path $projectRoot -ChildPath $folder
    if (-not (Test-Path -Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "✓ Created: $folder" -ForegroundColor Green
    }
    else {
        Write-Host "→ Already exists: $folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Folder structure created!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Display tree structure
Write-Host "Project Structure:" -ForegroundColor Yellow
Write-Host ""
Write-Host "promptineer-extension/" -ForegroundColor Cyan
Write-Host "├── src/" -ForegroundColor White
Write-Host "│   ├── components/      (UI components)" -ForegroundColor Gray
Write-Host "│   │   ├── common/      (Reusable UI)" -ForegroundColor Gray
Write-Host "│   │   ├── layout/      (Page layouts)" -ForegroundColor Gray
Write-Host "│   │   ├── auth/        (Auth components)" -ForegroundColor Gray
Write-Host "│   │   ├── prompt/      (Prompt components)" -ForegroundColor Gray
Write-Host "│   │   ├── category/    (Category components)" -ForegroundColor Gray
Write-Host "│   │   └── settings/    (Settings components)" -ForegroundColor Gray
Write-Host "│   ├── pages/           (Page-level components)" -ForegroundColor Gray
Write-Host "│   ├── hooks/           (Custom React hooks)" -ForegroundColor Gray
Write-Host "│   ├── services/        (Business logic layer)" -ForegroundColor Gray
Write-Host "│   ├── store/           (Zustand state management)" -ForegroundColor Gray
Write-Host "│   ├── background/      (Chrome service worker)" -ForegroundColor Gray
Write-Host "│   ├── utils/           (Utility functions)" -ForegroundColor Gray
Write-Host "│   └── styles/          (Global styles)" -ForegroundColor Gray
Write-Host "├── public/              (Static assets)" -ForegroundColor White
Write-Host "│   ├── icons/           (Extension icons)" -ForegroundColor Gray
Write-Host "│   ├── fonts/           (Custom fonts)" -ForegroundColor Gray
Write-Host "│   ├── manifest.json    (Chrome manifest)" -ForegroundColor Gray
Write-Host "│   ├── popup.html       (Popup page)" -ForegroundColor Gray
Write-Host "│   └── options.html     (Options page)" -ForegroundColor Gray
Write-Host "├── tests/               (Test suites)" -ForegroundColor White
Write-Host "│   ├── __mocks__/       (Mock data)" -ForegroundColor Gray
Write-Host "│   ├── hooks/           (Hook tests)" -ForegroundColor Gray
Write-Host "│   ├── services/        (Service tests)" -ForegroundColor Gray
Write-Host "│   └── utils/           (Utility tests)" -ForegroundColor Gray
Write-Host "├── config/              (Configuration files)" -ForegroundColor White
Write-Host "├── docs/                (Documentation)" -ForegroundColor White
Write-Host "├── package.json         (Dependencies)" -ForegroundColor White
Write-Host "├── vite.config.js       (Vite configuration)" -ForegroundColor White
Write-Host "├── tailwind.config.js   (Tailwind configuration)" -ForegroundColor White
Write-Host "├── .env.example         (Environment template)" -ForegroundColor White
Write-Host "└── .gitignore           (Git ignore rules)" -ForegroundColor White
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. npm init -y" -ForegroundColor Cyan
Write-Host "2. Create package.json with dependencies" -ForegroundColor Cyan
Write-Host "3. npm install" -ForegroundColor Cyan
Write-Host "4. Configure vite.config.js" -ForegroundColor Cyan
Write-Host "5. Configure tailwind.config.js" -ForegroundColor Cyan
Write-Host ""

Write-Host "Ready to generate code files!" -ForegroundColor Green
