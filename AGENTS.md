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
- **State Management**: Redux Toolkit & `react-redux`
- **API Client**: `fetch` (wrapped in `apiClient`)
- **PWA**: `vite-plugin-pwa` for offline support and "Add to Home Screen" capability.
- **Native Wrapper**: **Ionic Capacitor** for Android/iOS native builds.

---

### 3. Core Development Practices

#### **A. UIkit React Wrappers**
Instead of using raw HTML and UIkit classes, we use specialized React wrappers located in `src/components/uikit/`.
- **`forwardRef`**: Every component must use `forwardRef` to allow integration with libraries like `react-hook-form`.
- **`useUIKit` Hook**: Components that require UIkit's JavaScript logic (e.g., `Grid`, `Navbar`, `Sticky`) must use the custom `useUIKit` hook to manage the lifecycle (initialization and `$destroy`) of the UIkit instance.
    - **Event Handling**: When listening for UIkit events (e.g., `show`, `hide`), use `useEffect` with the `instance` or `ref` provided by `useUIKit` to ensure proper cleanup and React-state synchronization.
- **Prop Logic**: Components should map UIkit's class-based options (like `uk-button-primary` or `uk-form-width-medium`) to clean React props (`variant="primary"`, `formWidth="medium"`).
- **State Synchronization**: When syncing React state with complex UIkit instances (e.g., `Slider`), avoid re-initializing the component (which happens if the `index` prop changes frequently). Instead, use `useEffect` to call programmatic methods like `instance.show(index)` only when the internal UIkit index differs from the React state.
- **Handling Cloned Elements**: Components like `Slider` with `infinite: true` clone DOM elements. To robustly identify items in event listeners (like `itemshow`), use `data-index` attributes on the items. Clones will carry these attributes, allowing you to accurately map them back to your data.

#### **B. Animation & Motion Design**
- **Spring Physics**: We use Framer Motion to create a "tactile" feel. Transitions (especially for validation messages) should use `type: 'spring'` with high stiffness and damping for a snappy, physical response.
- **Layout Transitions**: Use the `layout` prop on `motion` components. This ensures that when elements appear or disappear (like error messages or expanded card details), the surrounding UI smoothly adjusts rather than jumping instantly.
- **AnimatePresence**: Always wrap conditional elements (like `FormMessage` or expanded details) in `AnimatePresence` to enable smooth exit animations.
- **Detail Expansion**: For expandable cards, combine `layout` on the wrapper and `AnimatePresence` for the content to create a "tactile" expansion effect.

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
- **IETF Tags**: Use full IETF BCP 47 language tags (e.g., `en-US`, `pl-PL`) for resources and backend communication. This is strictly required for compatibility with backend `Accept-Language` headers and user preferences.
- Support both English (`en-US`) and Polish (`pl-PL`).

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

#### **G. Data Presentation Layouts**
- **Cards Over Tables**: Avoid using "soulless" tabular views for complex business entities (like Sales or Purchases). Instead, use rich, interactive card-based layouts.
- **Progressive Disclosure**: Use expandable cards to keep the UI clean. Show high-level info (ID, Status, Date, Total) on the card surface and detailed item lists or payment instructions within an expandable section.
- **Progressive Image Loading**: For media-heavy views (like galleries), use a progressive approach. Load lightweight thumbnails (`thumb-xs`) initially and upgrade to higher-resolution versions (`thumb-md`) only when an item becomes active or is swiped into view.

#### **H. Backend Error Handling**
To ensure a consistent user experience, especially with localized messages, we follow a standardized approach for handling API failures:
- **`StatusResponseDto`**: The backend returns this DTO for most failures. It contains a `message` field with a localized error description and a `status` string for machine-readable error codes.
- **Priority of Messages**: Components must prioritize the `message` field from the API error response when displaying errors to the user.
- **I18n Fallbacks**: Always provide a generic fallback message using `t('auth.errors.generic')` or a domain-specific key (e.g., `t('ads.notFound')`) in case the backend does not provide a message or the request fails at the network level.
- **Global vs. Local Handling**:
    - **401 (Unauthorized)**: Handled globally by `apiClient`, which clears the token and redirects to the login page.
    - **403 (Forbidden)**: Handled locally by components. The `apiClient` throws the response body, allowing components to display specific reasons (e.g., "XYZ role required").

#### **I. Authentication & Session Management**
- **Unified Initialization**: The application must bootstrap using the `/api/session/init` endpoint. This call should include all necessary `decorators` (e.g., `accessToken`, `userProfile`, `featureFlags`) as query parameters to retrieve the essential application state in a single network round-trip.
- **Graceful Identity Fallbacks**: When a user is authenticated but lacks an explicit avatar, use `GeometricAvatar`. This ensures a visually rich and unique representation for every user.
- **Async Context Strategy**: Components relying on `AuthContext` must account for its initial `loading` state. Ensure that critical UI elements (like the Navbar or protected routes) wait for the session to initialize to prevent flickering or incorrect "Guest" state flashes.

#### **J. Progressive Web App (PWA)**
- **Auto-Update**: The app is configured with `registerType: 'autoUpdate'`. This ensures that when a new version is deployed, the service worker will automatically update and the app will refresh to the latest version on the next visit (or immediately if possible).
- **Offline First**: PWA assets (HTML, JS, CSS, and core SVGs) are cached for offline use.
- **Manifest**: The `manifest` is defined in `vite.config.ts`. It MUST include `display: 'standalone'` and `start_url: '/'` to be considered installable by Chrome. It should include both SVG and PNG icons (192x192 and 512x512) for full platform compatibility.

#### **K. Native App (Capacitor)**
- **Web-to-Native Workflow**: Capacitor wraps the web build (`dist/`) into a native WebView.
    - **VCS Strategy**: Unlike `node_modules`, the `android` and `ios` directories **MUST NOT** be added to the root `.gitignore`. They contain the native project structure, configurations, and assets (icons, splashes) that are part of your source code. Capacitor provides its own `.gitignore` inside these folders to handle local build artifacts.
    - **CI/CD Build**: Since the native folders are committed, CI/CD platforms like GitHub Actions can build APKs/IPAs directly by setting up the appropriate environments (JDK for Android, Xcode for iOS) and running `./gradlew` or `xcodebuild`. Note: Capacitor 8+ requires JDK 21.
    - Use `npm run cap:sync` to sync web changes to native projects after a build.
    - Use `npm run cap:open:android` to open the native project in Android Studio/IntelliJ.
- **Status Bar**: Use `@capacitor/status-bar` to manage the status bar appearance. For light themes, ensure the background is set to `#ffffff`, `overlaysWebView` is set to `false`, and style is set to `Style.Light` (dark icons) for better visibility. Note that in Capacitor's `StatusBar` API, `Style.Light` corresponds to dark content for light backgrounds, while `Style.Dark` corresponds to light content for dark backgrounds.
- **Vibe Preservation**: Since Capacitor uses the system WebView, all UIkit styles, CSS Modules, and Framer Motion animations are preserved without modification.
- **Native APIs**: When access to native features (Biometrics, Camera, etc.) is needed, use official Capacitor plugins. Always check for platform availability (`Capacitor.isNativePlatform()`) before calling native-only code to maintain web compatibility.
- **Deep Linking**: Handle deep links within the application to provide a seamless transition from external sources or notifications to specific content within the app.

#### **L. UIkit Dialogs & Stacking**
- **Prefer UIkit over Native**: Always use `UIkit.modal.confirm` and `UIkit.modal.alert` instead of browser `confirm()` and `alert()`. UIkit dialogs offer better visual consistency and don't block the main thread.
- **Stacking Support**: When opening a dialog on top of another modal (e.g., a confirmation inside a purchase flow), always use the `{ stack: true }` option. This ensures proper layering and event handling in SPA and mobile environments.

#### **M. Global State Management (Redux)**
- **Domain State**: Use Redux (via Redux Toolkit) for complex, long-running business processes that must persist across page navigation (e.g., active purchases, shopping baskets).
- **Global UI Components**: State that controls high-level UI elements rendered at the root (like the `PurchaseModal` in `App.tsx`) must be managed via Redux.
- **LocalStorage Sync**: Persist critical global state to `localStorage` to ensure continuity after page refreshes or app restarts. Re-hydrate this state during store initialization.

#### **N. Focused Navbar & Navigation Context**
- **Focused Mode**: Use the "focused" navbar mode for detail pages to declutter the UI. This mode replaces the logo/main menu with a back button and a slot for page-specific content (e.g., ad titles, breadcrumbs).
- **`useNavbarMode` Hook**: Activate focused mode using this hook. It should be called at the top of the page component.
- **`NavbarPortal`**: Use this component to "teleport" custom content into the navbar's focused slot.
- **Context Preservation**:
    - **Passing State**: When linking to a details page, always pass the current URL (including search params) in the `state.from` property: `<Link to="..." state={{ from: location.pathname + location.search }}>`.
    - **Smart Back Button**: The `useNavbarMode` hook automatically detects this state and configures the navbar's back button to return the user to their exact previous context (preserving filters, sorting, and pagination).
    - **Auth Redirects**: Ensure that authentication redirects (e.g., to the login page) preserve and pass along this `from` state so that the user can return to their original context after logging in.
---

### 4. Code Structure Standards
The project follows a modular, business-oriented directory structure to ensure scalability and maintainability.

#### **A. Shared & Global Resources**
Code that is reusable across the entire application remains in top-level directories under `src/`:
- **`src/components/uikit/`**: React wrappers for UIkit components. These should be pure, not depend on global state or context, and not involve any extra dependencies (e.g., `motion/react`).
- **`src/components/`**: Custom, universal React components that are not UIKit wrappers or are extending the look and feel of the UIkit wrappers.
    - **`SmartPagination.tsx`**: A standardized component for paginated lists that handles large page counts with ellipses (`...`).
- **`src/pages/`**: High-level layouts and error pages.
- **`src/hooks/`**: Global reusable hooks (e.g., `useUIKit`, `useMergeRefs`).
- **`src/store/`**: Global Redux store configuration and slices for domain-wide state.
- **`src/context/`**: Global application state (e.g., `AuthContext`).
- **`src/utils/`**, **`src/types/`**: Shared helper functions and TypeScript definitions.
- **`src/styles/`**: Global SASS variables and theme overrides.

#### **B. Business-Oriented Modules**
Logic specific to a particular business domain (e.g., Ads, Profile, Auth) is encapsulated within its own directory under `src/` (e.g., `src/ads/`). Each module mirrors a simplified project structure:
- **`src/[module]/pages/`**: High-level layouts and form orchestration specific to the domain.
- **`src/[module]/components/`**: Components used exclusively within this module.
- **`src/[module]/services/`**: API clients and business logic for the module. Services should use `apiClient` and typed DTOs from `src/types/api.ts`.
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
6. **Standardize Common Patterns**: Reuse standardized components (like `SmartPagination`) and logic (like `useUIKit` event patterns) across all modules to maintain a unified user experience.
7. **Avoid "Soulless" Tables**: Favor rich, card-based interfaces for complex business objects to provide a more engaging and interactive user experience.
8. **Meaningful Test Naming**: Test cases should describe the feature or behavior being validated. Avoid redundant or temporary-sounding phrases like "without crashing".
9. **Optimize for Bandwidth**: Use progressive image loading for galleries to ensure fast initial loads and reduced data usage.
10. **Robustness in Clones**: Always use stable identifiers (like `data-index`) when working with UI libraries that clone DOM elements for infinite scrolling or looping.
11. **JSDOM Compatibility**: Be aware of JSDOM limitations (e.g., lack of `DOMMatrix`, `IntersectionObserver`). Use appropriate polyfills in `src/vitest-setup.ts` to ensure UIkit's layout logic works correctly during testing.
12. **Prioritize Backend Messages**: Always display the localized `message` returned by the API (via `StatusResponseDto`).
13. **Global Continuity**: Long-running or critical business processes (like payments) must use global Redux state and be rendered at the root (`App.tsx`) to ensure they are not interrupted by user navigation.
14. **Strict IETF Tags**: Always use full IETF BCP 47 language tags (`en-US`, `pl-PL`) in both code and tests to ensure backend compatibility.
15. **Layering Excellence**: Use UIkit modal stacking (`{ stack: true }`) and localized button labels to maintain a professional, high-quality user interface in complex flows.
16. **Robust Portal Targeting**: When teleporting content into elements that appear dynamically (e.g., during animations), use `MutationObserver` to ensure the portal target is detected as soon as it mounts.
17. **Preserve Navigation Context**: When navigating to detail pages, pass the current location (including filters/pagination) in the router's `state`. Use this state to implement "smart" back buttons that return users to their exact previous context.
18. **Focused UI for Depth**: Use "focused" UI modes (like the Focused Navbar) to remove clutter and emphasize core content when users are deep in a specific task or viewing details.
