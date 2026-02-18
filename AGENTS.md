# AGENTS.md - QuadTodo Development Guide

## Build Commands

### Web Development
```bash
npm run dev           # Start Vite dev server (port 5173)
npm run build         # Type check + production build
npm run preview       # Preview production build
```

### Desktop (Tauri)
```bash
npm run tauri:dev    # Run desktop app in dev mode
npm run tauri:build   # Build desktop app for current platform

# Platform-specific builds (requires icons)
npm run desktop:mac          # macOS Intel
npm run desktop:mac-arm     # macOS Apple Silicon
npm run desktop:win         # Windows
npm run desktop:linux       # Linux
```

### Icon Generation
```bash
npm run icons:generate      # Generate all platform icons from src-tauri/icons/icon.png
```

### Testing
This project does **not** have a test framework configured. Do not add tests unless explicitly requested.

---

## Code Style Guidelines

### General Principles
- Use Vue 3 Composition API with `<script setup lang="ts">`
- Prefer composition functions over mixins
- Keep components small and focused (single responsibility)
- Use TypeScript for all files (`.ts` or `.vue` with `<script setup>`)

### File Organization
```
src/
├── api/           # API layer (currently LocalStorage, pre-wired for HTTP)
├── components/    # Vue components
│   └── common/    # Shared/reusable components
├── stores/        # Pinia stores
├── types/         # TypeScript interfaces/types
└── App.vue        # Root component
```

### Imports

**Order (top to bottom):**
1. Vue core (`vue`)
2. External libraries (`lucide-vue-next`, `pinia`, etc.)
3. Internal types (`@/types`)
4. Internal stores (`@/stores/*`)
5. Internal API (`@/api/*`)
6. Internal components (`@/components/*`)

```typescript
// Good
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Plus, Check, Trash2 } from 'lucide-vue-next'
import type { Todo, QuadrantType } from '@/types'
import { useTodoStore } from '@/stores/todoStore'
import { todoApi } from '@/api/todoApi'
import TodoList from './TodoList.vue'
import IconButton from './common/IconButton.vue'
```

- Use **path alias** `@/` for internal imports (e.g., `@/stores/todoStore`)
- Use **named exports** for types and stores
- Import types with `import type { ... }` to avoid runtime overhead

### Naming Conventions

**Files:**
- Components: `PascalCase.vue` (e.g., `TodoItem.vue`, `QuadrantGrid.vue`)
- Types: `camelCase.ts` (e.g., `todoTypes.ts`) or `index.ts` for barrel exports
- Stores: `camelCase.ts` (e.g., `todoStore.ts`)

**Components:**
- Use descriptive names (e.g., `TodoItem`, not `Item`)
- Suffix with purpose (e.g., `IconButton`, `QuadrantGrid`)

**Variables/Functions:**
- Use `camelCase` for variables and functions
- Use `PascalCase` for components, types, and interfaces
- Use `UPPER_SNAKE_CASE` for constants (rarely needed)

**TypeScript:**
- Use `interface` for public APIs and data models
- Use `type` for unions, primitives, and mapped types

```typescript
// Good
export interface Todo {
  id: string
  content: string
  isUrgent: boolean
}

export type QuadrantType = 'q1' | 'q2' | 'q3' | 'q4'

// Avoid: interface for simple unions
// Use type instead:
export type ButtonVariant = 'default' | 'ghost' | 'danger'
```

### TypeScript Strictness

This project uses strict TypeScript:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Always:
- Define explicit return types for functions (especially in stores/API)
- Use `interface Props` for component props
- Use `defineEmits<{ ... }>()` for typed emits

```typescript
// Good
interface Props {
  todo: Todo
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'delete', id: string): void
}>()

// Good - explicit return type
const getTodosByQuadrant = (type: QuadrantType): Todo[] => {
  // ...
}
```

### Vue Component Patterns

**Props:**
```typescript
// Use interface + defineProps (no withDefaults for optional-only)
interface Props {
  todos: Todo[]
  quadrantType: QuadrantType
}

const props = defineProps<Props>()

// Use withDefaults when there are required props
interface Props {
  variant?: 'default' | 'ghost' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
})
```

**Emits:**
```typescript
// Always use typed emits
const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'delete', id: string): void
}>()
```

**Reactivity:**
- Use `ref()` for primitives and objects
- Use `computed()` for derived state
- Avoid `reactive()` for simple cases (harder to destructure)

```typescript
// Good
const isEditing = ref(false)
const todos = ref<Todo[]>([])

// Avoid for simple cases
// const state = reactive({ isEditing: false, todos: [] })
```

### Error Handling

Follow the pattern used in `todoStore.ts`:

```typescript
const fetchTodos = async () => {
  loading.value = true
  error.value = null
  try {
    todos.value = await todoApi.getAll()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch todos'
    console.error('Failed to fetch todos:', err)
  } finally {
    loading.value = false
  }
}
```

**Rules:**
- Always use `try/catch` for async operations
- Use `err instanceof Error` for proper error message extraction
- Set error state in store for UI feedback
- Re-throw errors after logging (let caller handle if needed)

### Styling (Tailwind CSS)

**Classes:**
- Use Tailwind utility classes in templates
- Dark mode: use `dark:` prefix (e.g., `dark:bg-gray-800`)
- Use `class` binding for dynamic classes

```vue
<!-- Good -->
<div
  class="flex items-center gap-2 px-2 py-1.5 rounded"
  :class="{
    'bg-gray-50 dark:bg-gray-700': todo.isCompleted,
  }"
>
```

**Quadrant Colors:**
Use defined colors from `tailwind.config.js`:
- Q1: `q1-bg`, `q1-border`, `q1-text` (light) / `q1-dark-*` (dark)
- Q2: `q2-bg`, etc.
- Q3: `q3-bg`, etc.
- Q4: `q4-bg`, etc.

**Custom Styles:**
- Put custom CSS in `<style scoped>` (rarely needed)
- Use CSS variables sparingly

### Pinia Store Pattern

Use Composition API style with `defineStore`:

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { todoApi } from '@/api/todoApi'
import type { Todo, CreateTodoRequest } from '@/types'

export const useTodoStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const q1Todos = computed(() => {
    return todos.value
      .filter(t => t.isUrgent && t.isImportant && !t.isCompleted)
      .sort((a, b) => a.order - b.order)
  })

  // Actions
  const fetchTodos = async () => { /* ... */ }

  return {
    todos,
    loading,
    error,
    q1Todos,
    fetchTodos,
  }
})
```

### Drag and Drop

This project uses `vuedraggable` with Vue 3:

```vue
<draggable
  v-model="localTodos"
  group="todos"
  item-key="id"
  class="flex-1 overflow-y-auto"
  @change="handleChange"
>
  <template #item="{ element }">
    <TodoItem :todo="element" />
  </template>
</draggable>
```

- Use `group="todos"` for cross-quadrant dragging
- Emit reorder events to parent for state updates

---

## Project-Specific Notes

### Data Model
- `Todo` items have `isUrgent` and `isImportant` boolean flags
- Quadrants: q1 (urgent+important), q2 (urgent), q3 (important), q4 (neither)
- `order` field controls sort order within each quadrant

### Dark Mode
- Implemented via Tailwind's `darkMode: 'class'`
- Use `settingsStore.isDarkMode` to check state
- Toggle adds/removes `dark` class on `document.documentElement`

### API Layer
- Currently uses LocalStorage (`STORAGE_KEY = 'quad-todo-items'`)
- Pre-wired for HTTP backend (see `src/api/client.ts`)
- All API calls return Promises with artificial delay (100ms) for consistency

### Path Aliases
- `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`)
