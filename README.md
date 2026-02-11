# 🎭 Playwright E2E Test Automation Framework

[![Playwright Tests](https://github.com/danieldf9/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/danieldf9/playwright-e2e-framework/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.42-green.svg)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-grade **End-to-End Test Automation Framework** built with **Playwright** and **TypeScript**, demonstrating industry best practices including Page Object Model, custom fixtures, API testing, cross-browser testing, and CI/CD integration.

---

## 🏗️ Architecture

```
playwright-e2e-framework/
├── src/
│   ├── pages/                    # Page Object Model classes
│   │   ├── BasePage.ts           # Base page with common methods
│   │   ├── LoginPage.ts          # Login page interactions
│   │   ├── HomePage.ts           # Home/feed page interactions
│   │   ├── ArticlePage.ts        # Article CRUD operations
│   │   ├── ProfilePage.ts        # User profile page
│   │   └── SettingsPage.ts       # Settings page
│   ├── fixtures/
│   │   └── test-fixtures.ts      # Custom Playwright fixtures
│   └── utils/
│       ├── api-helpers.ts        # API helper methods
│       └── test-data-generator.ts # Dynamic test data generation
├── tests/
│   ├── auth.setup.ts             # Authentication setup (shared state)
│   ├── e2e/                      # UI E2E test suites
│   │   ├── login.spec.ts         # Login feature tests
│   │   ├── home.spec.ts          # Home page tests
│   │   └── article.spec.ts       # Article management tests
│   └── api/                      # API test suites
│       ├── users.api.ts          # Users API tests
│       └── articles.api.ts       # Articles API tests
├── .github/workflows/
│   └── playwright.yml            # GitHub Actions CI/CD
├── playwright.config.ts          # Playwright configuration
└── package.json
```

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Page Object Model** | Clean separation of test logic and page interactions |
| **Custom Fixtures** | Playwright fixtures for dependency injection |
| **API Testing** | Full REST API test coverage with helper classes |
| **Cross-Browser** | Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari |
| **Authentication** | Shared auth state across tests (setup projects) |
| **Test Tagging** | `@smoke`, `@regression`, `@visual` tag-based execution |
| **CI/CD Pipeline** | GitHub Actions with matrix strategy |
| **Parallel Execution** | Full parallel test execution support |
| **Auto-Retries** | Configurable retries for flaky test handling |
| **Rich Reporting** | HTML, JSON reports + trace, screenshots, videos |
| **Test Data** | Dynamic test data generation with unique IDs |
| **Environment Config** | `.env` based configuration management |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/danieldf9/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install --with-deps
cp .env.example .env
```

### Running Tests

```bash
npm test                    # Run all tests
npm run test:ui             # Interactive UI mode
npm run test:chrome         # Chrome only
npm run test:firefox        # Firefox only
npm run test:safari         # Safari only
npm run test:api            # API tests only
npm run test:smoke          # Smoke tests
npm run test:regression     # Regression tests
npm run test:headed         # Headed mode
npm run report              # View HTML report
```

## 🧪 Test Coverage

### E2E Tests
- **Authentication** — Login, signup, session management
- **Home Page** — Feed switching, tag filtering, pagination
- **Article Management** — Create, read, comment, favorite
- **User Profile** — View profile, edit settings, follow users

### API Tests
- **Users API** — Registration, login, profile updates
- **Articles API** — CRUD operations, comments, favorites, tags

## 📊 Reporting

- **HTML Report**: `playwright-report/` — Interactive test report
- **JSON Report**: `test-results/results.json` — Machine-readable results
- **Traces**: Available on first retry for debugging
- **Screenshots**: Captured on test failure
- **Videos**: Retained on test failure

## 📝 License

This project is licensed under the MIT License.
