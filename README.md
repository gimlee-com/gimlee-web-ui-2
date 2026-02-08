<div align="center">
  <img src="public/gimlee.svg" alt="Gimlee Logo" width="120" height="120" />
  <h1>Gimlee Web UI</h1>
  <p><strong>A nice marketplace.</strong></p>

  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
  [![UIkit](https://img.shields.io/badge/UIkit-3-blueviolet.svg)](https://getuikit.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 🌟 Project Overview

**Gimlee** is a marketplace designed to connect buyers and sellers directly for exchanging goods and services. 

Unlike traditional platforms, Gimlee focuses on **trustless, non-custodial payment verification**. Sellers provide a read-only viewing key, allowing the platform to verify payments on the blockchain without ever taking custody of funds. This ensures maximum security and privacy for all participants.

### 🚀 Key Features

- **Non-Custodial Payments**: Trustless verification via viewing keys (PirateChain ARRR, YCash).
- **User Spaces**: Personalized public profile pages to showcase ads and build reputation.
- **Rich Interaction**: Interactive, card-based layouts for sales, purchases, and ad browsing.
- **Real-time Communication**: Integrated public chat with typing indicators and live updates via SSE.
- **Multi-lingual Support**: Full support for English (`en-US`) and Polish (`pl-PL`).
- **Responsive & Native**: PWA-ready with high-performance mobile experience via Ionic Capacitor.
- **Themeable**: Multiple themes including Light, Dark, Dark Unicorn, and Iron Age.

---

## 🛠 Technical Stack

Gimlee is built with the following stack:

- **Framework**: [React 19](https://react.dev/) (TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [UIkit 3](https://getuikit.com/) with custom React wrappers
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (`motion/react`)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Internationalization**: [i18next](https://www.i18next.com/)
- **PWA**: `vite-plugin-pwa`
- **Native Wrapper**: [Ionic Capacitor](https://capacitorjs.com/) (Android/iOS)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 22.0.0
- **npm**: >= 10.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/gimlee-web-ui.git
   cd gimlee-web-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

- `npm run dev`: Start the development server with HMR.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check code quality.
- `npm run test`: Run the test suite once (CI-friendly).
- `npm run test:watch`: Run the test suite in interactive watch mode.
- `npm run test:coverage`: Run tests and generate coverage report.
- `npm run preview`: Preview the production build locally.
- `npm run storybook`: Start Storybook for component development.
- `npm run build-storybook`: Build Storybook for production.

---

## 📱 Mobile & PWA

Gimlee is designed to be a first-class mobile experience.

### PWA Support
The application is configured as a Progressive Web App. It supports offline assets and "Add to Home Screen" functionality.

### Native Build (Capacitor)
To build and run the native Android/iOS application:

1. Build the web project:
   ```bash
   npm run build
   ```

2. Sync with native projects:
   ```bash
   npm run cap:sync
   ```

3. Open in Android Studio:
   ```bash
   npm run cap:open:android
   ```

---

## 🏗 Project Structure

The project follows a modular, business-oriented directory structure:

- `src/components/`: Universal React components and UIkit wrappers.
- `src/hooks/`, `src/store/`, `src/context/`: Global state and logic.
- `src/styles/`: Global SASS variables and theme definitions.
- `src/[module]/`: Business-specific modules (e.g., `ads`, `sales`, `profile`, `spaces`).
    - `pages/`: Domain-specific layouts and orchestrators.
    - `components/`: Components used exclusively within the module.
    - `services/`: API clients and business logic.
- `public/`: Static assets (icons, manifest, etc.).

---

## Development guidelines

Refer to [AGENTS.md](AGENTS.md) for development guidelines.

## 📄 License

xD