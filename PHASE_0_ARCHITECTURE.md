# Promptineer Phase 0 - Complete System Architecture

## 1. System Overview

Promptineer is a Chrome Extension that integrates with a FastAPI backend and MongoDB Atlas, enabling users to manage, organize, and execute custom prompts efficiently.

**Core Components:**
- **Frontend:** React + Vite + Tailwind CSS (Chrome Extension UI)
- **Backend:** FastAPI + Python (REST API)
- **Database:** MongoDB Atlas (Data persistence)
- **Infrastructure:** GitHub for version control

---

## 2. Complete System Architecture

### 2.1 High-Level Architecture Diagram (Conceptual)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           CHROME EXTENSION (React + Vite)               │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │ Popup UI  │ Sidebar  │ Options Page  │ Content JS  │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  │              ↓                                           │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │    Service Worker / Background Script             │ │   │
│  │  │    (Message Routing & Local Storage)              │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                       ↓ HTTPS                                    │
└─────────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Routes  │ Auth Middleware  │ Business Logic       │   │
│  │  Controllers │ Error Handling   │ Rate Limiting        │   │
│  └──────────────────────────────────────────────────────────┘   │
│              ↓                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │    Database Layer (MongoDB Connection Pool)             │   │
│  │    Repository Pattern / ORM Layer                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                        ↓ Atlas Protocol
┌─────────────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud Database)                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  users  │  prompts  │  prompt_executions  │  categories  │   │
│  │  audit_logs  │  api_keys  │  settings                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

1. **User Action** → Chrome Extension UI
2. **Message Passing** → Service Worker (background script)
3. **API Call** → FastAPI Backend (HTTPS with auth token)
4. **Business Logic** → Controllers/Services
5. **Database Operation** → MongoDB Atlas
6. **Response** → Back through API to Extension
7. **UI Update** → React re-renders with new state

### 2.3 Key Integration Points

- **Chrome Extension ↔ Backend:** REST API (HTTPS)
- **Authentication:** JWT tokens + secure storage in Extension
- **Real-time Updates:** Polling or WebSocket (optional Phase 1)
- **Local Cache:** Chrome Storage API for offline capability

---

## 3. Frontend Architecture (Chrome Extension)

### 3.1 Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loading.jsx
│   │   ├── prompts/
│   │   │   ├── PromptList.jsx
│   │   │   ├── PromptCard.jsx
│   │   │   ├── PromptForm.jsx
│   │   │   └── PromptDetail.jsx
│   │   ├── categories/
│   │   │   ├── CategoryList.jsx
│   │   │   └── CategoryForm.jsx
│   │   └── auth/
│   │       ├── LoginForm.jsx
│   │       └── SignupForm.jsx
│   ├── pages/
│   │   ├── Popup.jsx
│   │   ├── Options.jsx
│   │   ├── Sidebar.jsx
│   │   └── Dashboard.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── usePrompts.js
│   │   ├── useAPI.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   ├── api.js (HTTP client)
│   │   ├── auth.js (JWT management)
│   │   ├── storage.js (Chrome Storage API)
│   │   └── messaging.js (Chrome Messaging)
│   ├── store/ (Zustand or Context API)
│   │   ├── authStore.js
│   │   ├── promptStore.js
│   │   └── uiStore.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   │   └── tailwind.css
│   ├── background/
│   │   └── service-worker.js
│   └── App.jsx
├── public/
│   ├── manifest.json
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon32.png
│   │   ├── icon128.png
│   │   └── icon256.png
│   ├── popup.html
│   ├── options.html
│   └── sidebar.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── .env.example
```

### 3.2 Component Architecture

**UI Layers:**
- **Popup (148x600px):** Quick access to recent prompts, quick execute
- **Options Page:** Full settings, profile management, API key management
- **Sidebar (300px):** Full prompt library, categories, search
- **Content Script:** Inject quick-access buttons into web pages

### 3.3 State Management

**Zustand Store Structure:**
- `authStore`: `{ user, token, isAuthenticated, login(), logout() }`
- `promptStore`: `{ prompts, selectedPrompt, filters, add(), update(), delete() }`
- `uiStore`: `{ sidebarOpen, modalOpen, notifications }`

### 3.4 Service Layer

- **api.js:** Axios instance with interceptors for auth tokens
- **auth.js:** JWT token management (save, retrieve, refresh, clear)
- **storage.js:** Chrome Storage API wrapper for sync/local storage
- **messaging.js:** Background script communication

### 3.5 Extension Manifest V3 Structure

```json
{
  "manifest_version": 3,
  "name": "Promptineer",
  "description": "Prompt management and execution extension",
  "version": "1.0.0",
  "permissions": [
    "storage",
    "scripting",
    "activeTab",
    "clipboardWrite"
  ],
  "host_permissions": [
    "https://*/",
    "http://*/"
  ],
  "background": {
    "service_worker": "service-worker.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icons": { ... }
  },
  "options_page": "options.html",
  "content_scripts": [ ... ],
  "web_accessible_resources": [ ... ]
}
```

---

## 4. Backend Architecture (FastAPI + Python)

### 4.1 Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py (environment variables)
│   │   ├── security.py (JWT, password hashing)
│   │   └── exceptions.py (custom exceptions)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── prompt.py
│   │   ├── category.py
│   │   ├── api_key.py
│   │   └── audit_log.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py (Pydantic request/response models)
│   │   ├── prompt.py
│   │   ├── category.py
│   │   └── common.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py
│   │   │   ├── endpoints/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── prompts.py
│   │   │   │   ├── categories.py
│   │   │   │   └── api_keys.py
│   │   │   └── dependencies.py
│   ├── crud/
│   │   ├── __init__.py
│   │   ├── base.py (generic CRUD operations)
│   │   ├── user.py
│   │   ├── prompt.py
│   │   ├── category.py
│   │   └── api_key.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── prompt.py
│   │   └── email.py (future)
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth.py (JWT verification)
│   │   ├── error_handler.py
│   │   ├── logging.py
│   │   └── rate_limiter.py
│   ├── database/
│   │   ├── __init__.py
│   │   ├── connection.py (MongoDB connection pool)
│   │   ├── session.py
│   │   └── dependencies.py
│   └── utils/
│       ├── __init__.py
│       ├── validators.py
│       ├── formatters.py
│       └── constants.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_prompts.py
│   └── test_integration.py
├── requirements.txt
├── .env.example
├── docker/
│   └── Dockerfile
├── scripts/
│   └── init_db.py
└── README.md
```

### 4.2 Layered Architecture

```
┌─────────────────────────────────────────┐
│       API Routes & Controllers          │  (Endpoints)
│  (request parsing, response formatting) │
├─────────────────────────────────────────┤
│    Business Logic & Services Layer      │  (Domain Logic)
│  (auth, prompt execution, validation)   │
├─────────────────────────────────────────┤
│    CRUD Layer & Repository Pattern      │  (Data Access)
│  (database operations abstraction)      │
├─────────────────────────────────────────┤
│       MongoDB Connection & Models       │  (Persistence)
│  (connection pool, schema mapping)      │
└─────────────────────────────────────────┘
```

### 4.3 Key Components

**Core Modules:**
- **auth.py:** JWT generation/validation, password hashing (bcrypt)
- **user.py:** User registration, profile management
- **prompt.py:** CRUD for prompts, execution logic
- **category.py:** Category management, organization
- **api_key.py:** API key generation and management for extension auth

**Middleware Stack:**
1. CORS middleware (allow extension origin)
2. Authentication middleware (JWT verification)
3. Rate limiting middleware (per user, per IP)
4. Error handling middleware (structured error responses)
5. Logging middleware (audit trail)

### 4.4 API Endpoint Structure

```
/api/v1/
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /refresh
│   └── POST /logout
├── /users
│   ├── GET /{id}
│   ├── PUT /{id}
│   ├── DELETE /{id}
│   └── GET /{id}/prompts
├── /prompts
│   ├── GET (list with filters, pagination)
│   ├── POST (create)
│   ├── GET /{id}
│   ├── PUT /{id}
│   ├── DELETE /{id}
│   └── POST /{id}/execute
├── /categories
│   ├── GET
│   ├── POST
│   ├── PUT /{id}
│   └── DELETE /{id}
└── /api-keys
    ├── GET
    ├── POST (generate)
    └── DELETE /{id}
```

---

## 5. MongoDB Schema Design

### 5.1 Collections Overview

#### **users** Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  username: String (unique, indexed),
  password_hash: String,
  first_name: String,
  last_name: String,
  avatar_url: String,
  subscription_tier: String (free, pro, enterprise),
  is_verified: Boolean,
  is_active: Boolean,
  created_at: DateTime,
  updated_at: DateTime,
  last_login: DateTime,
  preferences: {
    theme: String (light, dark),
    language: String,
    notifications_enabled: Boolean
  }
}
```

#### **prompts** Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (indexed, foreign key),
  title: String (indexed),
  description: String,
  content: String,
  category_id: ObjectId (indexed),
  tags: [String] (indexed),
  visibility: String (private, shared, public),
  variables: [
    {
      name: String,
      type: String (text, number, checkbox),
      required: Boolean,
      default_value: String
    }
  ],
  execution_count: Integer,
  created_at: DateTime,
  updated_at: DateTime,
  last_executed: DateTime,
  pinned: Boolean,
  color_tag: String
}
```

#### **categories** Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (indexed),
  name: String,
  description: String,
  icon: String,
  color: String,
  order: Integer,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### **prompt_executions** Collection (Audit Trail)
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (indexed),
  prompt_id: ObjectId (indexed),
  input_variables: Map,
  output: String,
  execution_time_ms: Integer,
  status: String (success, error),
  error_message: String,
  executed_at: DateTime,
  ttl_index: DateTime (30 days expiration)
}
```

#### **api_keys** Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (indexed),
  key_hash: String (indexed),
  name: String,
  permissions: [String],
  last_used: DateTime,
  created_at: DateTime,
  expires_at: DateTime,
  is_active: Boolean
}
```

#### **audit_logs** Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (indexed),
  action: String (create, update, delete, execute, login),
  resource_type: String (prompt, category, user),
  resource_id: ObjectId,
  changes: Map,
  ip_address: String,
  user_agent: String,
  timestamp: DateTime (TTL index, 90 days)
}
```

### 5.2 Indexes Strategy

**Indexes to Create:**
```
users:
  - { email: 1 } - UNIQUE
  - { username: 1 } - UNIQUE
  - { created_at: -1 }

prompts:
  - { user_id: 1, created_at: -1 }
  - { title: "text", description: "text" } - Full-text search
  - { category_id: 1 }
  - { tags: 1 }
  - { visibility: 1 }

categories:
  - { user_id: 1, order: 1 }

prompt_executions:
  - { user_id: 1, executed_at: -1 }
  - { prompt_id: 1, executed_at: -1 }
  - { executed_at: 1, expireAfterSeconds: 2592000 } - TTL index (30 days)

api_keys:
  - { user_id: 1 }
  - { key_hash: 1 } - UNIQUE

audit_logs:
  - { user_id: 1, timestamp: -1 }
  - { action: 1, timestamp: -1 }
  - { timestamp: 1, expireAfterSeconds: 7776000 } - TTL index (90 days)
```

### 5.3 Data Validation

- **Email:** Valid email format + unique
- **Password:** Min 8 chars, special characters
- **Prompt Content:** Max 50KB
- **Category per User:** Max 100
- **Prompts per User:** Max 10,000 (free tier), 50,000 (pro)
- **API Keys per User:** Max 10

---

## 6. API Architecture

### 6.1 Request/Response Pattern

**Standard Request:**
```json
{
  "data": { ... payload ... }
}
```

**Standard Success Response (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-06-11T10:30:00Z"
}
```

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed",
    "details": [ ... ]
  },
  "timestamp": "2026-06-11T10:30:00Z"
}
```

### 6.2 Authentication Flow

```
1. Extension → POST /api/v1/auth/register
   ↓ returns JWT token
2. Extension stores token in chrome.storage.sync
3. Extension → GET /api/v1/users/{id}
   Header: Authorization: Bearer {JWT}
   ↓ Middleware validates JWT
4. Backend → MongoDB query
   ↓ returns data
5. Extension → updates Zustand store
```

### 6.3 Rate Limiting Strategy

- **Per IP:** 1000 requests/hour
- **Per User:** 5000 requests/hour
- **Prompt Execution:** 100 executions/hour per user
- **API Key Operations:** 500/hour per key

### 6.4 Error Codes

```
200 OK
201 Created
400 Bad Request (INVALID_INPUT, VALIDATION_FAILED)
401 Unauthorized (TOKEN_EXPIRED, INVALID_CREDENTIALS)
403 Forbidden (INSUFFICIENT_PERMISSIONS)
404 Not Found (RESOURCE_NOT_FOUND)
409 Conflict (DUPLICATE_ENTRY, ALREADY_EXISTS)
429 Too Many Requests (RATE_LIMIT_EXCEEDED)
500 Internal Server Error (SERVER_ERROR, DATABASE_ERROR)
```

### 6.5 Pagination & Filtering

```
GET /api/v1/prompts?
  page=1&
  limit=20&
  category_id=xxx&
  tags=python,ai&
  sort=-created_at&
  search=text

Response:
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## 7. Folder Structure (Complete)

```
promptineer/
├── frontend/                  # Chrome Extension (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── backend/                   # FastAPI + Python
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   ├── docker/
│   ├── .env.example
│   └── README.md
├── docs/                      # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── SETUP_GUIDE.md
│   └── DEPLOYMENT.md
├── .github/
│   ├── workflows/             # CI/CD pipelines
│   │   ├── frontend-test.yml
│   │   ├── backend-test.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

---

## 8. Security Architecture

### 8.1 Authentication & Authorization

**Authentication:**
- JWT (JSON Web Token) with HS256 algorithm
- Token expiry: 24 hours
- Refresh token: 30 days (stored securely in Extension)
- Password hashing: bcrypt (salt rounds: 12)

**Authorization:**
- Role-based access control (RBAC): user, admin, enterprise
- Resource ownership verification (user can only access their prompts)
- API Key scoping (limited permissions per key)

### 8.2 Data Protection

**In Transit:**
- HTTPS/TLS 1.3 for all communication
- Certificate pinning (optional for Phase 1+)
- CORS properly configured (only allow extension origin)

**At Rest:**
- MongoDB encryption at rest (Atlas default)
- Sensitive fields encrypted (passwords, API keys, API responses)
- Encryption algorithm: AES-256-GCM

**In Extension:**
- Tokens stored in `chrome.storage.sync` (encrypted by Chrome)
- Never store in localStorage (vulnerable to XSS)
- Service Worker validates all messages

### 8.3 Input Validation & Sanitization

- All inputs validated using Pydantic schemas
- SQL injection prevention (using MongoDB - no SQL)
- XSS prevention: DOMPurify in React components
- CSRF protection: SameSite cookie attribute (if cookies used)

### 8.4 Security Best Practices

```
✓ No sensitive data in URLs
✓ No API keys in frontend code (use backend proxy)
✓ Rate limiting on all endpoints
✓ Audit logging for sensitive operations
✓ HTTPS enforced
✓ CORS whitelist strict
✓ Content Security Policy (CSP) headers
✓ X-Frame-Options: DENY
✓ X-Content-Type-Options: nosniff
✓ Regular security audits
```

### 8.5 Environment Variables (Sensitive)

**Backend (.env):**
```
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/promptineer
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ENVIRONMENT=production
FRONTEND_ORIGIN=chrome-extension://extension-id
```

**Frontend (.env):**
```
VITE_API_BASE_URL=https://api.promptineer.com/api/v1
VITE_ENV=production
```

---

## 9. Scalability Plan

### 9.1 Current Phase (Phase 0 - MVP)

**Load Capacity:**
- 1,000 concurrent users
- 10,000 requests/second
- Single FastAPI instance
- MongoDB Atlas shared cluster

### 9.2 Phase 1+ Scaling Strategy

**Horizontal Scaling:**
```
Load Balancer (ALB/NLB)
    ↓
├─ FastAPI Instance 1
├─ FastAPI Instance 2
├─ FastAPI Instance 3
└─ ...N instances

Managed by: Docker + Kubernetes or AWS ECS
```

**Caching Layer:**
- Redis cache for:
  - User authentication tokens
  - Frequently accessed prompts
  - API response caching (5 min TTL)
- Cache invalidation strategy on update

**Database Optimization:**
- MongoDB Atlas auto-scaling
- Read replicas for analytics queries
- Sharding strategy: by `user_id` when data > 100GB

**Background Jobs:**
- Celery + Redis for async tasks
  - Email notifications
  - Audit log cleanup
  - Data backup

**CDN & Static Assets:**
- Cloudflare or AWS CloudFront for extension assets
- Minimize round-trip time for resource downloads

### 9.3 Performance Metrics

**Target SLAs:**
- API response time: < 200ms (p95)
- Database query time: < 50ms (p95)
- Extension load time: < 2 seconds
- Uptime: 99.9%

**Monitoring:**
- DataDog or New Relic for APM
- CloudWatch for infrastructure metrics
- Custom dashboards for business metrics

### 9.4 Database Scalability

**Sharding Strategy (for millions of users):**
```
Shard Key: user_id
Reason: Ensures even distribution, isolates user data
Range: [0-XXXXXXXX]

Example:
Shard 1: user_id 0-25%
Shard 2: user_id 25-50%
Shard 3: user_id 50-75%
Shard 4: user_id 75-100%
```

---

## 10. Git Branch Strategy (GitHub Flow)

### 10.1 Branch Structure

```
Main Branches:
├── main          # Production-ready code (protected)
├── develop       # Integration branch for features
└── staging       # Pre-production testing

Feature/Fix Branches (from develop):
├── feature/user-auth
├── feature/prompt-management
├── feature/category-system
├── bugfix/login-issue
├── hotfix/security-patch (from main)
└── release/v1.0.0

Naming Convention: {type}/{description}
Types: feature, bugfix, hotfix, release, docs, chore, refactor
```

### 10.2 Workflow

```
1. Developer creates feature branch from develop
   git checkout develop
   git pull origin develop
   git checkout -b feature/user-auth

2. Implement changes, commit with clear messages
   git commit -m "feat(auth): add JWT token generation"

3. Push branch and create Pull Request to develop
   git push origin feature/user-auth

4. Code review + automated tests
   - Frontend tests: Jest, React Testing Library
   - Backend tests: pytest with 80%+ coverage
   - Integration tests
   - Linting: ESLint, Black, flake8

5. Merge to develop after approval
   git merge --no-ff feature/user-auth

6. Prepare release: develop → staging (test)
7. Merge staging → main (production)
   git tag v1.0.0
   git push origin main --tags

8. Deploy: CI/CD pipeline triggered
```

### 10.3 Commit Message Convention

```
{type}({scope}): {subject}

{body}

{footer}

Examples:
feat(auth): add JWT token refresh mechanism
fix(prompts): resolve race condition in execution
docs(setup): add MongoDB Atlas configuration guide
refactor(api): simplify error handling middleware
test(user): add comprehensive unit tests
chore(deps): update dependencies to latest versions
```

### 10.4 PR Review Checklist

- [ ] Code follows project style guide
- [ ] Tests added/updated (80%+ coverage)
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Performance considered
- [ ] Accessibility reviewed
- [ ] Security implications checked
- [ ] Database migrations (if applicable)

### 10.5 Protection Rules

```
main branch:
✓ Require pull request reviews (2+ reviewers)
✓ Require status checks to pass (CI/CD)
✓ Require branches to be up to date
✓ Include administrators (enforced for all)
✓ Dismiss stale reviews

develop branch:
✓ Require pull request reviews (1+ reviewer)
✓ Require status checks to pass
```

### 10.6 CI/CD Pipeline (GitHub Actions)

```yaml
Frontend Tests:
  - Install dependencies
  - Run linting (ESLint)
  - Run unit tests (Jest)
  - Build extension (Vite)
  - Check bundle size

Backend Tests:
  - Install dependencies
  - Run linting (Black, flake8)
  - Run unit tests (pytest)
  - Run integration tests
  - Check code coverage (80%+)

Integration Tests:
  - Build Docker images
  - Spin up test environment
  - Run E2E tests
  - Performance tests

Deployment (on main):
  - Deploy backend to AWS/GCP
  - Deploy extension to Chrome Web Store
  - Database migrations (if needed)
  - Health checks
```

---

## 11. Development Environment Setup (Phase 0)

### 11.1 Prerequisites

```
Frontend:
- Node.js 18+
- npm 8+ or yarn

Backend:
- Python 3.9+
- pip
- virtualenv

Database:
- MongoDB Atlas (cloud) - create free tier cluster
- MongoDB Compass (GUI - optional)

Version Control:
- Git 2.30+
- GitHub account
```

### 11.2 Local Setup Commands

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Testing
cd frontend && npm test
cd backend && pytest
```

---

## 12. Success Criteria for Phase 0

✓ Complete architecture documentation
✓ Database schema finalized
✓ API contract defined (OpenAPI/Swagger spec)
✓ Security review passed
✓ Folder structure ready for development
✓ Development environment setup documented
✓ CI/CD pipeline configured
✓ Team alignment on architecture
✓ Tech debt assessment completed

---

## 13. Next Steps (Phase 1 - Implementation)

1. Set up GitHub repository with branch protection
2. Initialize frontend and backend projects
3. Create development environment
4. Implement authentication system
5. Build core prompt CRUD operations
6. Create MongoDB collections and indexes
7. Implement API endpoints
8. Add comprehensive testing
9. Set up CI/CD pipelines
10. Deploy to staging environment

---

## Document Version

- **Version:** 1.0
- **Date:** 2026-06-11
- **Status:** AWAITING APPROVAL
- **Author:** Lead Software Architect

