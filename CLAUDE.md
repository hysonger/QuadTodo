# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

### Web Build
```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Type check + production build
cd /Users/songer/Projects/QuadTodo && npm run build  # Full build command
```

### Desktop Build (Tauri)
```bash
npm run tauri:dev          # Run desktop app in dev mode
npm run tauri:build        # Build desktop app for current platform
npm run desktop:win        # Build for Windows (cross-compile)
npm run desktop:mac        # Build for macOS Intel
npm run desktop:mac-arm    # Build for macOS Apple Silicon
npm run desktop:linux      # Build for Linux
```

### Build Outputs
Desktop builds output to:
- macOS: `src-tauri/target/release/bundle/macos/*.app` + `src-tauri/target/release/bundle/dmg/*.dmg`
- Windows: `src-tauri/target/release/bundle/msi/*.msi`
- Linux: `src-tauri/target/release/bundle/deb/*.deb`, `src-tauri/target/release/bundle/appimage/*.AppImage`

### Typical Bundle Sizes
- DMG (macOS): ~2-3MB
- MSI (Windows): ~4-5MB
- AppImage (Linux): ~5-6MB

## Architecture

**QuadTodo** is a Vue 3 + TypeScript Eisenhower Matrix (四象限) todo application.

### Tech Stack
- Vue 3 (Composition API, `<script setup>`)
- Pinia for state management
- Tailwind CSS for styling with dark mode support
- vuedraggable for drag-and-drop
- LocalStorage for persistence (API layer pre-wired for future backend)
- **Tauri v2** for desktop app packaging (cross-platform, ~2-5MB bundles)

### Key Architectural Patterns

**Data Model** (`src/types/index.ts`):
- `Todo` items have `isUrgent` and `isImportant` boolean flags determining their quadrant
- Quadrants: q1 (urgent+important), q2 (urgent), q3 (important), q4 (neither)
- `order` field controls sort order within each quadrant

**State Management** (`src/stores/todoStore.ts`):
- Uses Pinia with Composition API pattern
- Computed getters filter todos by quadrant (q1Todos, q2Todos, etc.)
- `reorderTodos()` handles both intra-quadrant sorting and cross-quadrant moves
- Store auto-initializes by calling `fetchTodos()` on creation

**Settings Store** (`src/stores/settingsStore.ts`):
- Manages `isDarkMode` state with persistence to LocalStorage
- `toggleDarkMode()` adds/removes `dark` class on document.documentElement
- Tailwind configured with `darkMode: 'class'` strategy

**API Layer** (`src/api/todoApi.ts`):
- Currently implements LocalStorage persistence
- `STORAGE_KEY = 'quad-todo-items'`
- Pre-wired for HTTP backend: `client.ts` has HTTP client stub, `todoApi.ts` has async interface
- To migrate to backend: implement HTTP calls in `client.ts`, data structure remains unchanged

**Drag and Drop** (`src/components/TodoList.vue`):
- Uses `vuedraggable` with group="todos" to enable cross-quadrant dragging
- `handleChange` emits `reorder` event with new todo order
- Quadrant components update `isUrgent`/`isImportant` flags based on drop target

### Dark Mode Implementation

**Color System** (`tailwind.config.js`):
- Each quadrant has light and dark color variants: `q1`, `q2`, `q3`, `q4` (light) and `q1-dark`, `q2-dark`, etc. (dark)
- Dark colors use deep saturated backgrounds (e.g., q1-dark-bg: `#450a0a`) with lighter text for contrast
- Quadrant colors are preserved in dark mode to maintain visual distinction

**Quadrant Dark Mode Classes** (`src/components/Quadrant.vue`):
- Each quadrant dynamically computes dark mode classes based on its type
- Applied classes: `dark:bg-qX-dark-bg`, `dark:border-qX-dark-border`, `dark:text-qX-dark-text`

### Path Aliases
- `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`)

### Component Hierarchy
```
App.vue
└── QuadrantGrid
    └── Quadrant (x4: q1-q4)
        └── TodoList (vuedraggable)
            └── TodoItem
```

### Desktop Packaging (Tauri)

**Configuration** (`src-tauri/tauri.conf.json`):
- Window size: 1200x800 (min: 800x600)
- Uses system WebView (no bundled Chromium)
- Bundle identifier: `com.quad-todo.app`

**Icon Generation**:
- Place source icon at `src-tauri/icons/icon.png` (1024x1024 PNG)
- Run `npx tauri icon` to generate all platform icons

**Platform-Specific Notes**:
- **macOS**: Creates `.app` bundle + `.dmg` installer
- **Windows**: Creates `.msi` installer (requires WebView2 runtime)
- **Linux**: Creates `.deb`, `.rpm`, and `.AppImage` packages

**Cross-Compilation**:
- Native builds work on host platform
- Cross-compilation requires additional setup (see Tauri docs)
- GitHub Actions recommended for automated multi-platform builds

### Styling Notes
- Quadrant colors defined in `tailwind.config.js` (q1-bg, q2-bg, etc. with dark variants)
- Compact UI: text-sm for todo items, minimal padding
- Custom scrollbar styles in `App.vue` with dark mode variants
- TodoItem editing uses transparent background for seamless inline editing
