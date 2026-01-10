# Cha-Kra: Project Constitution

> Non-negotiable principles and standards for AI-assisted development of the Cha-Kra meditation PWA.

## Non-Negotiable Principles

### Code Quality

- **SHALL** follow requirements precisely and to the letter
- **SHALL** write correct, best practice, DRY, bug-free, fully functional code
- **MUST NOT** leave todos, placeholders, or missing pieces
- **MUST** implement all functionality completely before marking tasks done
- **SHALL** think step-by-step and plan in detailed pseudocode first

### Accessibility First

- **MUST** follow WCAG 2.1 AA guidelines
- **SHALL** implement proper ARIA labels, roles, and properties
- **SHALL** ensure keyboard navigation works properly
- **SHALL** provide proper focus management and visual indicators
- **SHALL** implement prefers-reduced-motion support for all animations
- **MUST** test with assistive technologies in mind

### Performance Standards

- **SHALL** achieve 60fps for all animations
- **MUST** use transform and opacity for GPU-accelerated animations
- **SHALL** implement intersection observers for scroll-triggered features
- **MUST** lazy load routes and heavy components
- **SHALL** minimize bundle size through code splitting
- **MUST** keep micro-interactions under 500ms duration

### Security

- **MUST NOT** introduce security vulnerabilities (XSS, injection, OWASP top 10)
- **SHALL** validate at system boundaries (user input, external APIs)
- **SHALL** trust internal code and framework guarantees
- **MUST NOT** add unnecessary error handling for impossible scenarios

### Simplicity Over Complexity

- **MUST NOT** over-engineer solutions
- **SHALL** make only changes that are clearly necessary
- **MUST NOT** add features, refactors, or "improvements" beyond what was asked
- **SHALL** prefer three similar lines over premature abstraction
- **MUST NOT** create helpers, utilities, or abstractions for one-time operations
- **MUST** delete unused code completely—no backwards-compatibility hacks

## Project Overview

**Application**: Progressive Web App (PWA) for meditation and mindfulness practices
**Framework**: Solid.js (reactive, performant alternative to React)
**Purpose**: Provide offline-first meditation tools with chakra-based theming

### Core Features

- Breathing exercises with visual guidance
- Movement practices with animations
- Mantra meditation with audio support
- Guided meditation sessions
- Tampura musical accompaniment
- White noise generator
- Daily inspiration content
- Settings with dark mode toggle

## Technology Stack

### Frontend

- **Framework**: Solid.js ^1.8.22
  - Reactive signals and effects
  - Fine-grained reactivity (no virtual DOM)
  - `createSignal`, `createEffect`, `createMemo` patterns
- **Routing**: @solidjs/router ^0.13.6
- **Animation**: solid-motionone ^1.0.1
- **Media Queries**: @solid-primitives/media ^2.2.9

### Styling

- **CSS Framework**: Tailwind CSS v4
  - Utility-first with design tokens
  - Dark mode via `@custom-variant dark (&:where(.dark, .dark *))`
  - Custom chakra color palette (7 spiritual chakras)
  - Base font size: 18px for accessibility
- **Theme System**: Class-based (.dark) with localStorage persistence

### TypeScript

- **Configuration**: @tsconfig/strictest ^2.0.8
- **Rules**: Strictest possible type checking
- **Target**: ES2020
- **Module**: ESNext with bundler resolution

### Build & PWA

- **Build Tool**: Vite ^6.0.5
- **PWA**: vite-plugin-pwa ^0.21.1
  - Service workers with Workbox
  - Offline support
  - Installable on mobile/desktop

### Code Quality

- **Formatter**: Prettier ^3.4.2
  - prettier-plugin-sort-imports ^1.8.6
  - prettier-plugin-tailwindcss ^0.6.9

### Dependency Management

- **Version Policy**: Use exact versions (no `^` or `~` prefixes)
  - **WHY**: Prevents unexpected breaking changes and ensures reproducible builds
  - **EXCEPTION**: The Technology Stack documentation above uses `^` for readability
  - **ENFORCEMENT**: package.json SHALL contain exact versions only
- **Lock Files**: package-lock.json **MUST** be committed
  - Required for `npm ci` in CI/CD pipelines
  - Ensures deterministic dependency resolution
- **Engines Field**: **SHALL** specify exact Node.js and npm versions
  - Serves as single source of truth for runtime requirements
  - CI workflows **SHALL** use `node-version-file` instead of hardcoded versions
  - Example: `"engines": { "node": "20.18.1", "npm": "10.9.4" }`
- **Automated Updates**: Dependabot **SHALL** handle dependency updates
  - Weekly automated PRs for patch and minor updates
  - Major version updates **MUST** be reviewed manually
  - Framework packages (Solid.js, Vite, Tailwind) require manual major version updates
- **E2E Dependencies**: e2e package.json **SHALL** include all required runtime dependencies
  - E2E tests run in isolated environment without root node_modules
  - Must include build tools (vite) for preview server
  - Versions **SHOULD** match root package.json for consistency

## Architecture Patterns

### Component Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route-level page components
└── stores/         # Reactive stores for state management
```

### Component Architecture

- **SHALL** use proper TypeScript interfaces for all props
- **SHALL** use Solid.js patterns (signals, effects, memos)
- **SHALL** create compound components for complex UI (e.g., Card.Header, Card.Content)
- **SHALL** use composition over complex prop drilling
- **SHALL** implement proper error boundaries where needed
- **MUST** export components with proper names

### State Management

- **SHALL** use Solid.js createSignal for local state
- **SHALL** use stores (stores/) for shared state
- **SHALL** persist user preferences to localStorage
- **MUST** implement proper reactivity patterns

### Styling Conventions

- **SHALL** use Tailwind utility classes exclusively
- **SHALL** use CSS variables for theme-aware styling
- **SHALL** implement dark mode with .dark class on html element
- **MUST** use cn() or similar for conditional classes
- **SHALL** follow Tailwind spacing scale (4, 8, 12, 16, 24, 32, etc.)
- **MUST** support dark mode through custom variant

### Dark Mode Implementation

```css
/* index.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```typescript
// Toggle implementation
document.documentElement.classList.toggle("dark");
localStorage.setItem("theme", isDark ? "dark" : "light");
```

### Animation Guidelines

- **SHALL** use solid-motionone for motion design
- **SHALL** use appropriate easing curves:
  - ease-out for entrances
  - ease-in for exits
  - spring physics for interactive elements
- **MUST** implement prefers-reduced-motion fallbacks
- **SHALL** keep duration under 500ms for micro-interactions
- **MUST** use transform and opacity for GPU acceleration

### Import Organization

Prettier automatically sorts imports:

1. solid-js
2. @solidjs/\* (router, etc.)
3. @solid-primitives/\*
4. Third-party packages
5. Alias paths (~/)
6. Relative paths (./, ../)

### Legacy File Naming Note

**DEPRECATED**: See "Naming Conventions > File Naming" section above for current standards.

Existing files may not yet follow snake_case convention:

- **Components**: Currently PascalCase (e.g., `Navigation.tsx`, `SplashScreen.tsx`) - ✅ Correct
- **Stores**: Currently camelCase (e.g., `theme.ts`) - ⚠️ Should migrate to `theme_store.ts`
- **Pages**: Currently PascalCase (e.g., `Home.tsx`, `Breathing.tsx`) - ✅ Correct (framework components)

## Development Workflow

### Before Making Changes

1. **MUST** read files before modifying them
2. **SHALL** understand existing code patterns
3. **SHALL** plan changes in pseudocode
4. **MUST** verify changes don't break existing functionality

### Testing Strategy

- **SHALL** manually test all user flows
- **SHALL** test dark mode toggle functionality
- **SHALL** test PWA offline capabilities
- **SHALL** test accessibility with keyboard navigation
- **SHALL** test on mobile viewports

### Git Practices

- **SHALL** write concise, descriptive commit messages
- **SHALL** focus on "why" rather than "what"
- **MUST NOT** include AI mentions in commits
- **SHALL** keep PRs focused and reviewable
- **SHALL** test before committing

### Commit Message Format

```
Brief imperative summary (50 chars max)

Detailed explanation of changes focusing on:
- Why the change was needed
- What problem it solves
- Any trade-offs or considerations
```

## Code Implementation Rules

### TypeScript Standards

- **MUST** use strictest mode (@tsconfig/strictest)
- **MUST NOT** use implicit any
- **SHALL** use proper null checks
- **SHALL** use const assertions where appropriate
- **MUST** provide explicit return types for public APIs
- **SHALL** use type inference for internal variables

### Naming Conventions

#### Code Naming

- **SHALL** use snake_case for all variable names
- **SHALL** use snake_case for all function names
- **SHALL** use PascalCase for component names and type definitions
- **SHALL** use UPPER_SNAKE_CASE for constants
- **MUST** use descriptive names that reflect purpose and intent

#### File Naming

- **SHALL** prefer snake_case for file names
- **EXCEPTION**: Framework components **SHALL** use PascalCase (e.g., `Layout.tsx`, `Navigation.tsx`, `SplashScreen.tsx`)
- **EXCEPTION**: Configuration files **SHALL** follow their ecosystem conventions (e.g., `tsconfig.json`, `vite.config.ts`)
- **SHALL** use snake_case for utility files, helpers, stores, and hooks (e.g., `user_actions.ts`, `theme_store.ts`, `use_media_query.ts`)
- **SHALL** use snake_case for test files (e.g., `home.spec.ts`, `breathing.spec.ts`)
- **SHALL** use lowercase with hyphens for markdown files (e.g., `README.md`, `CLAUDE.md`)

Examples:

```
✅ Good file names:
src/components/Layout.tsx           (component - PascalCase)
src/components/Navigation.tsx       (component - PascalCase)
src/stores/theme_store.ts           (store - snake_case)
src/utils/format_date.ts            (utility - snake_case)
src/hooks/use_dark_mode.ts          (hook - snake_case)
e2e/tests/home.spec.ts              (test - snake_case)
e2e/helpers/user_actions.ts         (helper - snake_case)

❌ Bad file names:
src/utils/formatDate.ts             (should be format_date.ts)
src/hooks/useDarkMode.ts            (should be use_dark_mode.ts)
src/stores/themeStore.ts            (should be theme_store.ts)
e2e/tests/homeSpec.ts               (should be home.spec.ts)
```

### Solid.js Patterns

```typescript
// ✅ Correct: Use signals for reactive state
const [count, setCount] = createSignal(0);

// ✅ Correct: Use effects for side effects
createEffect(() => {
  console.log("Count changed:", count());
});

// ✅ Correct: Use memos for derived state
const doubled = createMemo(() => count() * 2);

// ❌ Wrong: Don't use React patterns
// No useState, useEffect, useMemo in Solid.js
```

### Styling Patterns

```typescript
// ✅ Correct: Tailwind utilities with dark mode
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// ✅ Correct: Conditional classes
<button class={`px-4 py-2 ${isActive() ? 'bg-blue-500' : 'bg-gray-500'}`}>

// ❌ Wrong: Inline styles (avoid unless absolutely necessary)
<div style={{ color: 'red' }}>
```

### Animation Patterns

```typescript
// ✅ Correct: Motion with accessibility
import { Motion } from 'solid-motionone'

<Motion
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  <div>Content</div>
</Motion>

// ✅ Correct: Respect reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReducedMotion ? 0 : 0.3
```

## Chakra Theme System

### Color Palette

The project uses a spiritual chakra-based color system:

- **Root** (Muladhara): Red #FF0000
- **Sacral** (Svadhisthana): Orange #FF7F00
- **Solar** (Manipura): Yellow #FFFF00
- **Heart** (Anahata): Green #00FF00
- **Throat** (Vishuddha): Blue #0000FF
- **Third Eye** (Ajna): Indigo #4B0082
- **Crown** (Sahasrara): Violet #9400D3
- **Yin**: Black (darkness, receptive energy)
- **Yang**: White (light, active energy)

### Usage

```typescript
// Use chakra colors in Tailwind
<div class="bg-chakra-root">Root Chakra</div>
<div class="text-chakra-heart">Heart Chakra</div>
<div class="border-yin dark:border-yang">Duality</div>
```

## Response Protocol

### When Uncertain

- **SHALL** state uncertainty explicitly
- **MUST NOT** guess or make assumptions
- **SHALL** search for latest documentation when needed
- **SHALL** ask for clarification if requirements are ambiguous

### Communication

- **SHALL** be concise and minimize unnecessary prose
- **MUST NOT** use emojis unless explicitly requested
- **SHALL** provide implementation over explanation
- **SHALL** provide examples only when requested
- **SHALL** stay focused on the task at hand

## Knowledge Updates

When working with:

- **Solid.js**: Search for latest reactive patterns and best practices
- **Tailwind CSS v4**: Consult official docs for new features and syntax
- **Animation**: Verify solid-motionone API and accessibility patterns
- **PWA**: Check latest service worker and manifest standards
- **Accessibility**: Reference WCAG 2.1 AA guidelines

## Project-Specific Conventions

### Path Aliases

- **~/** maps to **./src/**
- Use alias imports for cleaner paths: `import { theme } from '~/stores/theme'`

### Browser Support

- Modern browsers with ES2020 support
- Progressive enhancement for older browsers
- Fallbacks for features not universally supported

### Performance Budget

- Initial load: < 100kb (gzipped)
- Time to Interactive: < 3s on 3G
- Lighthouse score: > 90 for all metrics

### Accessibility Requirements

- Keyboard navigation for all interactive elements
- Focus visible on all focusable elements
- Screen reader announcements for dynamic content
- Color contrast ratio ≥ 4.5:1 for normal text
- Touch targets ≥ 44x44px

## File Structure

```
cha-kra/
├── .github/
│   └── workflows/
│       └── test.yml          # CI workflow
├── src/
│   ├── components/           # Reusable components
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   └── SplashScreen.tsx
│   ├── pages/                # Route components
│   │   ├── Home.tsx
│   │   ├── Breathing.tsx
│   │   ├── Movement.tsx
│   │   ├── Mantra.tsx
│   │   ├── Guided.tsx
│   │   ├── Tampura.tsx
│   │   ├── WhiteNoise.tsx
│   │   ├── Inspiration.tsx
│   │   └── Settings.tsx
│   ├── stores/               # State management
│   │   └── theme.ts
│   ├── App.tsx               # Root component with router
│   ├── index.tsx             # Entry point with PWA registration
│   └── index.css             # Global styles & Tailwind
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config (extends @tsconfig/strictest)
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.js         # PostCSS with Tailwind v4
├── vite.config.ts            # Vite build config
└── CLAUDE.md                 # This file

```

## Quick Reference

### Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run format   # Format code with Prettier
```

### Common Patterns

```typescript
// Create a signal
const [value, setValue] = createSignal(initialValue);

// Create an effect
createEffect(() => {
  // Runs when dependencies change
});

// Create a memo
const computed = createMemo(() => expensive(value()));

// Toggle dark mode
const toggleDark = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
};

// Access theme from store
import { theme, setTheme } from "~/stores/theme";
```

---

**Last Updated**: 2026-01-10
**Version**: 1.0
**Maintained By**: AI Development Team
