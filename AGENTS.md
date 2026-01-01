# AGENTS.md

This file serves as a comprehensive guide for AI agents and developers working on the **Gimlee Web UI** project. It summarizes the project's goals, technical stack, and the specific engineering practices and "preached" principles followed during development.

---

### 1. Project Overview: Gimlee
**Gimlee** is a decentralized, peer-to-peer (P2P) cryptocurrency marketplace.
- **Goal**: Connect buyers and sellers directly for exchanging goods and services using crypto.
- **Core Innovation**: Trustless, non-custodial payment verification. Sellers provide a **viewing key** (read-only), allowing the platform to verify payments on the blockchain without ever taking custody of funds.
- **Current Focus**: Integration with **PirateChain (ARRR)**, with plans for Monero (XMR) and Firo (FIRO).
- **Vision**: A community-driven, secure, and transparent economy that eliminates financial intermediaries.

---

### 2. Technical Stack
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **UI Framework**: UIkit 3
- **Animations**: Framer Motion (`motion/react`)
- **Forms**: React Hook Form
- **I18n**: react-i18next
- **API Client**: Axios (wrapped in `apiClient`)

---

### 3. Core Development Practices

#### **A. UIkit React Wrappers**
Instead of using raw HTML and UIkit classes, we use specialized React wrappers located in `src/components/uikit/`.
- **`forwardRef`**: Every component must use `forwardRef` to allow integration with libraries like `react-hook-form`.
- **`useUIKit` Hook**: Components that require UIkit's JavaScript logic (e.g., `Grid`, `Navbar`, `Sticky`) must use the custom `useUIKit` hook to manage the lifecycle (initialization and `$destroy`) of the UIkit instance.
- **Prop Logic**: Components should map UIkit's class-based options (like `uk-button-primary` or `uk-form-width-medium`) to clean React props (`variant="primary"`, `formWidth="medium"`).

#### **B. Animation & Motion Design**
- **Spring Physics**: We use Framer Motion to create a "tactile" feel. Transitions (especially for validation messages) should use `type: 'spring'` with high stiffness and damping for a snappy, physical response.
- **Layout Transitions**: Use the `layout` prop on `motion` components within forms. This ensures that when an error message appears, the elements below it smoothly "push down" rather than jumping instantly.
- **AnimatePresence**: Always wrap conditional elements like `FormMessage` in `AnimatePresence` to enable smooth exit animations.

#### **C. Form & Validation Philosophy**
Our forms prioritize a "friendly" user experience over immediate error shouting:
- **Focus-Aware UX**:
    - **Don't Punish Typing**: Do not show the red "danger" status (`uk-form-danger`) while a user is actively focused on a field.
    - **Trigger on Blur**: Apply the "danger" status only after the user moves away from the field (`onBlur`).
    - **Helpful Guidance**: Show requirements (e.g., password rules) as `info` messages (using `uk-text-primary`) when a field is focused, even if the current input is valid.
- **Smart Debouncing**:
    - **Instant**: Local validation like Regex, password matching, and length checks should be immediate.
    - **Debounced (500ms)**: API-heavy checks (like checking if a username or email is available) must be debounced to reduce server load.
- **Submit Button**: The submit button should remain `disabled` until `react-hook-form`'s `isValid` state is true.

#### **D. Internationalization (I18n)**
- No hardcoded text in components. All strings must be extracted to `src/i18n.ts`.
- Support both English (`en`) and Polish (`pl`).

#### **E. Storybook-Driven Development**
- Every UIkit component wrapper must have a corresponding `.stories.tsx` file.
- Stories should demonstrate not just the basic component, but complex states like "Animated Validation" or "Focus-aware behavior" to ensure UI consistency.

#### **F. SASS & Styling Strategy**
- **No Inline Styles**: Avoid `style={{ ... }}`. Use UIkit utility classes or SASS.
- **Component Styles (CSS Modules)**:
    - Use CSS Modules for component-specific styles.
    - Name the file `[ComponentName].module.scss` and co-locate it with the component (e.g., `src/ads/pages/AdDetailsPage.module.scss`).
    - Import directly into the component: `import styles from "./[ComponentName].module.scss"`.
    - This ensures class names are scoped (shortened/hashed in production) and maintenance is localized.
- **Global Overrides**:
    - Global UIkit variable overrides go in `src/styles/uikit-variables.scss`.
    - Global theme customizations go in `src/styles/main.scss`.
- **Extend, Don't Redefine**: Use existing UIkit variables (e.g., `$global-muted-background`) and classes (e.g., `uk-object-cover`) whenever possible.
---

### 4. Code Structure Standards
The project follows a modular, business-oriented directory structure to ensure scalability and maintainability.

#### **A. Shared & Global Resources**
Code that is reusable across the entire application remains in top-level directories under `src/`:
- **`src/components/uikit/`**: React wrappers for UIkit components. These should be pure, not depend on global state or context, and not involve any extra dependencies (e.g., `motion/react`).
- **`src/components/`**: Custom, universal React components that are not UIKit wrappers or are extending the look and feel of the UIkit wrappers.
- **`src/pages/`**: High-level layouts and error pages.
- **`src/hooks/`**: Global reusable hooks (e.g., `useUIKit`, `useMergeRefs`).
- **`src/context/`**: Global application state (e.g., `AuthContext`).
- **`src/utils/`**, **`src/types/`**: Shared helper functions and TypeScript definitions.
- **`src/styles/`**: Global SASS variables and theme overrides.

#### **B. Business-Oriented Modules**
Logic specific to a particular business domain (e.g., Ads, Profile, Auth) is encapsulated within its own directory under `src/` (e.g., `src/ads/`). Each module mirrors a simplified project structure:
- **`src/[module]/pages/`**: High-level layouts and form orchestration specific to the domain.
- **`src/[module]/components/`**: Components used exclusively within this module.
- **`src/[module]/services/`**: API clients and business logic for the module.
- **`src/[module]/context/`**, **`src/[module]/hooks/`**: State and logic scoped to the module.
- **`src/[module]/utils/`**, **`src/[module]/types/`**: Helpers and types relevant only to this domain.

#### **C. Component Layout**
Every component (whether shared or module-specific) follows the same pattern:
- **`[ComponentName].tsx`**: The main React component.
- **`[ComponentName].stories.tsx`**: Storybook documentation and visual testing.
- **`[ComponentName].module.scss`**: Scoped CSS Module (if specific styling is required).

---

### 5. Summary of Preached Principles
1. **Never break the "Spring"**: UI changes should feel physical and smooth.
2. **Be helpful, not aggressive**: Use info messages and primary colors for guidance; save red danger colors for when the user has finished interacting with a field.
3. **Types Matter**: Use TypeScript interfaces for all component props and API payloads.
4. **Lifecycle Management**: Always clean up UIkit JS instances to prevent memory leaks in the SPA.
5. **Keep API Docs Current**: Supplement Controllers with example `.http` files and ensure they are updated alongside any controller modifications.
