# Promptineer Phase 1 - Chrome Extension Foundation
## Setup & Architecture Guide

---

## 1. FOLDER STRUCTURE

### Complete Directory Layout

```
promptineer-extension/
│
├── public/                           # Static assets & manifest
│   ├── manifest.json                # Chrome Extension Manifest V3
│   ├── icons/
│   │   ├── icon-16.png             # 16x16 extension icon
│   │   ├── icon-32.png             # 32x32 taskbar icon
│   │   ├── icon-48.png             # 48x48 in extension management
│   │   ├── icon-128.png            # 128x128 Chrome Web Store
│   │   └── icon-256.png            # 256x256 high-res
│   ├── popup.html                  # Popup page entry point
│   ├── options.html                # Settings page entry point
│   └── fonts/
│       └── (custom fonts if needed)
│
├── src/                             # Source code
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/
│   │   │   ├── Button.jsx          # Primary, secondary, danger buttons
│   │   │   ├── Input.jsx           # Text input with variants
│   │   │   ├── Select.jsx          # Dropdown select component
│   │   │   ├── Modal.jsx           # Modal dialog wrapper
│   │   │   ├── Card.jsx            # Card container
│   │   │   ├── Badge.jsx           # Status/tag badges
│   │   │   ├── Spinner.jsx         # Loading spinner
│   │   │   ├── Alert.jsx           # Alert/notification component
│   │   │   └── Skeleton.jsx        # Loading skeleton
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx          # App header with navigation
│   │   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   │   ├── Footer.jsx          # App footer
│   │   │   └── MainLayout.jsx      # Main layout wrapper
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx       # Login form component
│   │   │   └── SignupForm.jsx      # Registration form component
│   │   │
│   │   ├── prompt/
│   │   │   ├── PromptCard.jsx      # Individual prompt card
│   │   │   ├── PromptList.jsx      # List of prompts
│   │   │   ├── PromptForm.jsx      # Create/edit prompt form
│   │   │   └── PromptDetail.jsx    # Prompt detail view
│   │   │
│   │   ├── category/
│   │   │   ├── CategoryList.jsx    # Category list component
│   │   │   └── CategoryForm.jsx    # Category form
│   │   │
│   │   └── settings/
│   │       ├── ProfileSettings.jsx # User profile settings
│   │       ├── APIKeySettings.jsx  # API key management
│   │       └── Preferences.jsx     # User preferences
│   │
│   ├── pages/                      # Page-level components
│   │   ├── Popup.jsx               # Main popup page
│   │   ├── Options.jsx             # Settings/options page
│   │   └── Dashboard.jsx           # Dashboard view (popup extended)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js              # Authentication logic
│   │   ├── usePrompts.js           # Prompt CRUD logic
│   │   ├── useCategories.js        # Category management
│   │   ├── useAPI.js               # API communication
│   │   ├── useLocalStorage.js      # Chrome Storage wrapper
│   │   ├── useNotification.js      # Toast notifications
│   │   └── useDebounce.js          # Debounce utility hook
│   │
│   ├── services/                   # Business logic layer
│   │   ├── api.js                  # Axios HTTP client + interceptors
│   │   ├── auth.js                 # JWT token management
│   │   ├── storage.js              # Chrome Storage API wrapper
│   │   ├── messaging.js            # Chrome messaging (background)
│   │   └── validators.js           # Input validation functions
│   │
│   ├── store/                      # State management (Zustand)
│   │   ├── authStore.js            # Auth state + actions
│   │   ├── promptStore.js          # Prompts state + actions
│   │   ├── categoryStore.js        # Categories state + actions
│   │   ├── uiStore.js              # UI state (modals, notifications)
│   │   └── useStore.js             # Central store exports
│   │
│   ├── background/                 # Service Worker (Background Script)
│   │   └── service-worker.js       # Chrome Service Worker
│   │
│   ├── utils/                      # Utility functions
│   │   ├── constants.js            # App-wide constants
│   │   ├── formatters.js           # String/date formatting
│   │   ├── validators.js           # Validation rules
│   │   ├── colors.js               # Tailwind color palette
│   │   └── environment.js          # Environment config
│   │
│   ├── styles/                     # Global styles
│   │   ├── globals.css             # Global Tailwind + custom CSS
│   │   ├── animations.css          # Custom animations
│   │   └── variables.css           # CSS variables
│   │
│   ├── App.jsx                     # Root React component
│   ├── Popup.jsx                   # Popup entry component
│   ├── Options.jsx                 # Options page entry component
│   ├── popup-main.jsx              # Popup React DOM render
│   └── options-main.jsx            # Options React DOM render
│
├── tests/                          # Unit & integration tests
│   ├── __mocks__/
│   │   └── chrome-api.js           # Mock Chrome API
│   ├── hooks/
│   │   └── useAuth.test.js
│   ├── services/
│   │   └── api.test.js
│   └── utils/
│       └── validators.test.js
│
├── config/                         # Configuration files
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config (for Tailwind)
│   └── jest.config.js              # Jest testing config
│
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment (git-ignored)
├── .env.production                 # Production environment
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Locked dependencies
├── README.md                       # Project documentation
└── SETUP.md                        # Setup guide

```

---

## 2. ARCHITECTURE OVERVIEW

### 2.1 Clean Architecture Layers

```
┌─────────────────────────────────────────────────┐
│         UI Layer (React Components)             │  Reusable components, pages
│    (Popup, Options, Dashboard, Auth)            │
├─────────────────────────────────────────────────┤
│       State Management (Zustand Stores)         │  Centralized state
│    (Auth, Prompts, Categories, UI)              │
├─────────────────────────────────────────────────┤
│         Business Logic (Custom Hooks)           │  Domain logic isolated
│    (useAuth, usePrompts, useCategories)         │
├─────────────────────────────────────────────────┤
│       Services Layer (API, Storage, Auth)       │  External integrations
│    (API client, Chrome Storage, Messaging)      │
├─────────────────────────────────────────────────┤
│         Utils & Constants Layer                 │  Helper functions
│    (Formatters, Validators, Constants)          │
└─────────────────────────────────────────────────┘
```

### 2.2 Component Hierarchy

```
App.jsx (Root)
│
├── Popup Page
│   ├── Header (navigation)
│   ├── MainContent
│   │   ├── PromptList → PromptCard
│   │   └── PromptActions (Create, Search, Filter)
│   └── Footer
│
└── Options Page
    ├── Header (navigation)
    ├── Sidebar (settings menu)
    ├── MainContent
    │   ├── Profile Settings
    │   ├── API Key Management
    │   └── Preferences
    └── Footer
```

### 2.3 State Management Flow

```
User Action (Click, Input)
        ↓
React Component
        ↓
Custom Hook (usePrompts, useAuth)
        ↓
Zustand Store (Update State)
        ↓
Service Layer (API call, Storage)
        ↓
Response
        ↓
Store Update + UI Re-render
```

---

## 3. KEY DECISIONS & PATTERNS

### 3.1 Why These Technologies?

| Technology | Purpose | Alternative | Reason |
|-----------|---------|-------------|--------|
| **React** | UI Library | Vue, Svelte | Large ecosystem, Chrome dev tools support |
| **Vite** | Build Tool | Webpack, CRA | Fast HMR, fast builds, extension support |
| **Tailwind CSS** | Styling | Material-UI, Styled | Utility-first, fast development, small bundle |
| **Zustand** | State Mgmt | Redux, Context | Lightweight, minimal boilerplate, hooks-friendly |
| **Axios** | HTTP Client | Fetch API | Interceptors, request cancellation, timeout |
| **Jest** | Testing | Vitest, Mocha | Wide adoption, great docs, Chrome API mocking |

### 3.2 Design Patterns Used

1. **Service Layer Pattern** - Abstraction layer for external integrations
2. **Custom Hooks Pattern** - Business logic encapsulation
3. **Store Pattern (Zustand)** - Centralized state management
4. **Factory Pattern** - Component creation (Button variants, etc.)
5. **Observer Pattern** - Zustand subscriptions for state changes
6. **Dependency Injection** - Services passed through hooks/context

### 3.3 Separation of Concerns

```
✓ Components: Only UI rendering & event handling
✓ Hooks: Business logic & data fetching
✓ Services: External integrations (API, Storage, Chrome APIs)
✓ Store: Centralized state
✓ Utils: Pure functions (formatters, validators)
```

---

## 4. DEPENDENCIES

### 4.1 Production Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "zustand": "^4.4.0",
  "axios": "^1.6.0",
  "clsx": "^2.0.0",
  "dompurify": "^3.0.0",
  "js-cookie": "^3.0.0"
}
```

**Explanations:**
- `react` & `react-dom` - UI library
- `zustand` - Lightweight state management
- `axios` - HTTP client with interceptors
- `clsx` - Conditional className utility
- `dompurify` - XSS protection (sanitize user input)
- `js-cookie` - Cookie management (for auth tokens if needed)

### 4.2 Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.1.0",
  "@vitejs/plugin-react-refresh": "^1.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.4.0",
  "vite": "^5.0.0",
  "vite-plugin-web-extension": "^2.3.0",
  "@types/chrome": "^0.0.246",
  "eslint": "^8.52.0",
  "eslint-config-react-app": "^7.0.1",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.0",
  "jest": "^29.7.0",
  "@babel/preset-react": "^7.22.0",
  "babel-jest": "^29.7.0"
}
```

**Explanations:**
- `vite` & plugins - Build tool & React integration
- `vite-plugin-web-extension` - Chrome Extension Manifest handling
- `tailwindcss`, `postcss`, `autoprefixer` - CSS framework
- `@types/chrome` - TypeScript types for Chrome API
- `eslint` - Code linting
- Testing libraries - Jest & React Testing Library

### 4.3 Complete Dependencies List (package.json format)

```json
{
  "name": "promptineer-extension",
  "version": "1.0.0",
  "description": "Engineer Better Prompts - Chrome Extension",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:prod": "cross-env ENVIRONMENT=production vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "clsx": "^2.0.0",
    "dompurify": "^3.0.0",
    "js-cookie": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.0",
    "@vitejs/plugin-react-refresh": "^1.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0",
    "vite-plugin-web-extension": "^2.3.0",
    "@types/chrome": "^0.0.246",
    "eslint": "^8.52.0",
    "eslint-config-react-app": "^7.0.1",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jest": "^29.7.0",
    "@babel/preset-react": "^7.22.0",
    "babel-jest": "^29.7.0",
    "cross-env": "^7.0.3"
  }
}
```

---

## 5. INSTALLATION COMMANDS

### 5.1 Prerequisites

```bash
# Verify Node.js version (18+)
node --version

# Verify npm version (8+)
npm --version

# If using nvm (recommended)
nvm install 18
nvm use 18
```

### 5.2 Project Setup

```bash
# Step 1: Create project directory
mkdir promptineer-extension
cd promptineer-extension

# Step 2: Initialize npm project
npm init -y

# Step 3: Install production dependencies
npm install react react-dom zustand axios clsx dompurify js-cookie

# Step 4: Install development dependencies
npm install --save-dev \
  vite \
  @vitejs/plugin-react \
  @vitejs/plugin-react-refresh \
  tailwindcss \
  postcss \
  autoprefixer \
  vite-plugin-web-extension \
  @types/chrome \
  eslint \
  eslint-config-react-app \
  @testing-library/react \
  @testing-library/jest-dom \
  jest \
  @babel/preset-react \
  babel-jest \
  cross-env

# Step 5: Initialize Tailwind CSS
npx tailwindcss init -p

# Step 6: Initialize ESLint
npx eslint --init
```

### 5.3 Quick Install (Single Command)

```bash
# Create & setup in one go
mkdir promptineer-extension && cd promptineer-extension && npm init -y && npm install react react-dom zustand axios clsx dompurify js-cookie && npm install --save-dev vite @vitejs/plugin-react @vitejs/plugin-react-refresh tailwindcss postcss autoprefixer vite-plugin-web-extension @types/chrome eslint eslint-config-react-app @testing-library/react @testing-library/jest-dom jest @babel/preset-react babel-jest cross-env && npx tailwindcss init -p
```

### 5.4 Create Folder Structure

```bash
# After installation, create folder structure

mkdir -p src/{components/{common,layout,auth,prompt,category,settings},pages,hooks,services,background,utils,styles,store}
mkdir -p public/icons
mkdir -p tests/{__mocks__,hooks,services,utils}
mkdir -p config

# Create empty files for folder references
touch src/App.jsx
touch src/Popup.jsx
touch src/Options.jsx
touch src/popup-main.jsx
touch src/options-main.jsx
touch src/background/service-worker.js
touch public/manifest.json
touch public/popup.html
touch public/options.html
```

### 5.5 Initial Configuration

```bash
# Create environment files
cp .env.example .env.local
cp .env.example .env.production

# Add to .gitignore
echo "node_modules/" >> .gitignore
echo ".env.local" >> .gitignore
echo "dist/" >> .gitignore
echo "build/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

---

## 6. PROJECT STRUCTURE VERIFICATION

After installation, verify structure:

```bash
tree -L 3 -I 'node_modules'
```

Expected output:
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
│   ├── utils/
│   ├── background/
│   └── styles/
├── public/
│   ├── manifest.json
│   ├── popup.html
│   ├── options.html
│   └── icons/
├── tests/
├── config/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 7. FIRST RUN

```bash
# Start development server
npm run dev

# Expected output:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

---

## 8. NEXT STEPS (After Setup)

1. ✅ Create folder structure
2. ✅ Install dependencies
3. ⏭️ Generate configuration files (vite.config.js, tailwind.config.js, etc.)
4. ⏭️ Generate entry files (popup-main.jsx, options-main.jsx)
5. ⏭️ Generate manifest.json
6. ⏭️ Generate HTML files (popup.html, options.html)
7. ⏭️ Generate root components (App.jsx, Popup.jsx, Options.jsx)
8. ⏭️ Generate shared components (Button, Input, etc.)
9. ⏭️ Generate store (Zustand stores)
10. ⏭️ Generate services (API, auth, storage)
11. ⏭️ Generate custom hooks
12. ⏭️ Generate pages (Popup page, Options page)

---

## Document Version

- **Version:** 1.0
- **Date:** 2026-06-11
- **Status:** AWAITING CONFIRMATION TO PROCEED

**Ready to generate code? Confirm to start with configuration files.**

