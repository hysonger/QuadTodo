# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Type check + production build
cd /Users/songer/Projects/QuadTodo && npm run build  # Full build command
```

## Architecture

**QuadTodo** is a Vue 3 + TypeScript Eisenhower Matrix (四象限) todo application.

### Tech Stack
- Vue 3 (Composition API, `<script setup>`)
- Pinia for state management
- Tailwind CSS for styling
- vuedraggable for drag-and-drop
- LocalStorage for persistence (API layer pre-wired for future backend)

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

**API Layer** (`src/api/todoApi.ts`):
- Currently implements LocalStorage persistence
- `STORAGE_KEY = 'quad-todo-items'`
- Pre-wired for HTTP backend: `client.ts` has HTTP client stub, `todoApi.ts` has async interface
- To migrate to backend: implement HTTP calls in `client.ts`, data structure remains unchanged

**Drag and Drop** (`src/components/TodoList.vue`):
- Uses `vuedraggable` with group="todos" to enable cross-quadrant dragging
- `handleChange` emits `reorder` event with new todo order
- Quadrant components update `isUrgent`/`isImportant` flags based on drop target

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

### Styling Notes
- Quadrant colors defined in `tailwind.config.js` (q1-bg, q2-bg, etc.)
- Compact UI: text-sm for todo items, minimal padding
- Custom scrollbar styles in `App.vue`
