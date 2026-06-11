# Promptineer - Monorepo

Welcome to **Promptineer** - A universal AI prompt engineering platform delivered as a Chrome extension.

## 📁 Project Structure

```
promptineer/
│
├── frontend-extension/          # Chrome Extension (React + Vite)
│   ├── src/                     # React components, services, stores
│   ├── public/                  # Static assets & manifest.json
│   ├── package.json             # Dependencies & scripts
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS theme
│   ├── .env.example             # Environment template
│   └── setup-folders.ps1        # Build setup script
│
├── backend/                     # Backend API (Coming Soon - Phase 2)
│   └── README.md                # Backend documentation
│
├── docs/                        # Project Documentation
│   ├── phase_0_architecture.md  # System design & architecture
│   ├── phase_1_setup_guide.md   # Phase 1 implementation guide
│   └── installation_guide.md    # Setup & installation steps
│
├── assets/                      # Project assets (logos, screenshots, etc.)
│
├── README.md                    # Project overview & features
│
└── LICENSE                      # MIT License
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Chrome/Chromium browser

### Installation

1. **Navigate to frontend extension:**
   ```bash
   cd promptineer/frontend-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Load extension in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `promptineer/frontend-extension/dist` directory

For detailed setup instructions, see [Installation Guide](promptineer/docs/installation_guide.md)

## 📚 Documentation

- **[Phase 0: Architecture](promptineer/docs/phase_0_architecture.md)** - System design, database schema, API architecture
- **[Phase 1: Setup Guide](promptineer/docs/phase_1_setup_guide.md)** - Frontend implementation walkthrough
- **[Installation Guide](promptineer/docs/installation_guide.md)** - Detailed setup instructions

## ✨ Features

See [Promptineer Features](promptineer/README.md) for complete feature list

### Highlights
- 🎯 Prompt Optimization for multiple AI models
- 🖼️ Image to Prompt generation
- 📱 Social Media Content Generator
- 🔐 Secure prompt storage & management
- 🌓 Dark mode support

## 🏗️ Architecture

### Phase 0 ✅ (Complete)
- System architecture design
- Database schema planning
- API specification
- Security architecture

### Phase 1 ✅ (Complete)
- Chrome Extension foundation (React + Vite)
- State management (Zustand)
- Service layer (API, Auth, Storage)
- UI components (Tailwind CSS)
- Message passing system

### Phase 2 🚧 (Coming)
- Backend API implementation (FastAPI/Python)
- Database integration (MongoDB)
- Authentication system
- Content scripts & page integration

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **Zustand 4.4** - State management
- **Tailwind CSS 3.4** - Styling
- **Axios 1.6** - HTTP client
- **Chrome Extension Manifest V3** - Extension framework

### Backend (Phase 2)
- FastAPI (Python)
- MongoDB
- JWT Authentication
- Docker & Kubernetes

## 📦 Available Scripts

From `promptineer/frontend-extension/`:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:prod   # Production build with optimizations
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run test         # Run Jest tests
npm run test:watch   # Watch mode testing
```

## 🔒 Security

- JWT-based authentication
- Chrome Storage API for secure token storage
- Input validation & XSS prevention
- CORS headers configuration
- Rate limiting

See [Security Architecture](promptineer/docs/phase_0_architecture.md#security-architecture) for details

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details

## 👥 Contributing

Contributions are welcome! Please read the documentation and follow the established code structure.

## 📞 Support

For issues, questions, or suggestions, please open an issue or refer to the documentation.

---

**Made with ❤️ for AI prompt engineers**
