# Promptineer Extension - Installation & Setup Guide

## Prerequisites

Ensure you have the following installed:

```bash
# Check Node.js version (requires 18+)
node --version
# Expected: v18.x.x or higher

# Check npm version (requires 8+)
npm --version
# Expected: 8.x.x or higher
```

If you need to install Node.js, download from: https://nodejs.org/

---

## Installation Steps

### Step 1: Create Folder Structure

Navigate to your project directory and run the PowerShell script:

```powershell
# Navigate to project root
cd path\to\promptineer-extension

# Run the folder creation script
.\setup-folders.ps1
```

**Expected Output:**
```
✓ Created: src
✓ Created: src/components/common
✓ Created: src/components/layout
... (all folders created)

Folder structure created!
Project Structure: (tree view shown)
```

---

### Step 2: Install Dependencies

From the project root directory, run:

```bash
npm install
```

This will install all dependencies from `package.json`:

**Installation Time:** 2-5 minutes (depending on internet speed)

**Expected Output:**
```
added XXX packages in XXXs
```

**What gets installed:**
- ✓ React 18.2.0
- ✓ Zustand 4.4.1
- ✓ Vite 5.0.8
- ✓ Tailwind CSS 3.4.0
- ✓ Jest & Testing utilities
- ✓ ESLint & Prettier
- ✓ All 18 dev dependencies

---

### Step 3: Environment Setup

Copy the environment template:

```bash
# Create local environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration (optional for development):

```bash
# Windows: use your preferred editor or PowerShell
notepad .env.local

# Or with VS Code
code .env.local
```

**Recommended defaults for development:**
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ENV=development
VITE_DEBUG=true
```

---

### Step 4: Verify Installation

Run the following commands to verify everything is set up correctly:

```bash
# Check Node modules are installed
node --version
npm --version

# List installed packages
npm list react zustand vite

# Show available npm scripts
npm run
```

---

## Available npm Scripts

After installation, you can use these commands:

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build with production environment
npm run build:prod

# Preview production build locally
npm preview

# Run ESLint to check code quality
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Run tests with coverage report
npm run test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Generate coverage report only
npm run test:coverage

# Type checking (if TypeScript added later)
npm run type-check
```

---

## Project Structure After Installation

Your project should look like this:

```
promptineer-extension/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── prompt/
│   │   ├── category/
│   │   └── settings/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── background/
│   ├── utils/
│   └── styles/
├── public/
│   ├── icons/
│   ├── fonts/
│   ├── manifest.json
│   ├── popup.html
│   └── options.html
├── tests/
│   ├── __mocks__/
│   ├── hooks/
│   ├── services/
│   └── utils/
├── config/
├── node_modules/          (created by npm install)
├── package.json           (dependencies list)
├── package-lock.json      (dependency lock file)
├── .gitignore             (git ignore rules)
├── .env.example           (env template)
├── .env.local             (your local config - git-ignored)
├── vite.config.js         (build configuration - next)
├── tailwind.config.js     (tailwind configuration - next)
└── postcss.config.js      (postcss configuration - next)
```

---

## Troubleshooting

### Issue: Command not found (npm, node)

**Solution:**
- Restart terminal/PowerShell after installing Node.js
- Verify installation: `node --version`
- Add to PATH if needed

### Issue: Permission denied running setup script

**Solution:**
```powershell
# Allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: npm install fails with network error

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Retry installation
npm install

# If still failing, try different registry
npm config set registry https://registry.npmjs.org/
npm install
```

### Issue: Disk space error

**Solution:**
```bash
# Check available disk space
df -h

# Node modules can be large. Ensure at least 1GB free space.
# If needed, delete node_modules and reinstall:
rm -r node_modules
npm install
```

---

## Next Steps

Once installation is complete:

1. ✅ Folder structure created
2. ✅ Dependencies installed
3. ⏭️ **Generate vite.config.js** - Build tool configuration
4. ⏭️ Generate tailwind.config.js - CSS framework setup
5. ⏭️ Generate manifest.json - Chrome Extension manifest
6. ⏭️ Generate HTML entry points (popup.html, options.html)
7. ⏭️ Generate React root components
8. ⏭️ Generate UI components
9. ⏭️ Generate state management
10. ⏭️ Generate services layer

---

## Quick Start Command Sequence

For a quick setup, run these commands in sequence:

```powershell
# 1. Navigate to project
cd path\to\promptineer-extension

# 2. Create folders
.\setup-folders.ps1

# 3. Install dependencies
npm install

# 4. Setup environment
Copy-Item .env.example .env.local

# 5. Verify installation
npm --version
node --version
npm list react

# 6. Ready for next phase!
Write-Host "Installation complete! Ready to generate config files."
```

---

## Important Notes

- **Do not commit `node_modules/`** - It's in `.gitignore`
- **Do not commit `.env.local`** - It's in `.gitignore`
- **Always commit `package-lock.json`** - Ensures consistent installs
- **Node version:** Use v18 or higher for best compatibility
- **npm version:** Use v8 or higher

---

## Documentation Links

- Vite: https://vitejs.dev/guide/
- React: https://react.dev/learn
- Tailwind CSS: https://tailwindcss.com/docs
- Zustand: https://github.com/pmndrs/zustand
- Jest: https://jestjs.io/docs/getting-started
- Chrome Extension: https://developer.chrome.com/docs/extensions/

---

**Version:** 1.0  
**Date:** 2026-06-11  
**Status:** Ready for Setup
