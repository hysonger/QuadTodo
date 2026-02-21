# AGENTS.md - QuadTodo Development Guide

## Build Commands

### Web
```bash
npm run dev           # Start Vite dev server (port 5173)
npm run build         # Type check + production build
npm run preview       # Preview production build
```

### Desktop (Tauri)
```bash
npm run tauri:dev     # Run desktop app in dev mode
npm run tauri:build   # Build desktop app for current platform

# Platform-specific builds
npm run desktop:mac        # macOS Intel
npm run desktop:mac-arm    # macOS Apple Silicon
npm run desktop:win         # Windows
npm run desktop:linux       # Linux
```

### Icons
```bash
npm run icons:generate      # Generate all platform icons from src-tauri/icons/icon.png
```

### Testing
No test framework configured. Do not add tests unless explicitly requested.

---

## Code Style Guidelines

### General Principles
- Use Vue 3 Composition API with `<script setup lang="ts">`
- Keep components small and focused (single responsibility)
- Use TypeScript for all files

### File Organization
```
src/
├── api/           # API layer (LocalStorage, pre-wired for HTTP)
├── components/    # Vue components
│   └── common/    # Shared components
├── stores/        # Pinia stores
├── types/         # TypeScript interfaces/types
└── App.vue        # Root component
```

### Imports Order
1. Vue core (`vue`)
2. External libraries (`lucide-vue-next`, `pinia`, etc.)
3. Internal types (`@/types`)
4. Internal stores (`@/stores/*`)
5. Internal API (`@/api/*`)
6. Internal components (`@/components/*`)

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Plus, Trash2 } from 'lucide-vue-next'
import type { Todo, QuadrantType } from '@/types'
import { useTodoStore } from '@/stores/todoStore'
import { todoApi } from '@/api/todoApi'
import TodoList from './TodoList.vue'
```
- Use `@/` path alias for internal imports
- Use `import type { ... }` for types

### Naming Conventions
- Files: `PascalCase.vue`, `camelCase.ts`
- Components: `TodoItem`, `QuadrantGrid` (descriptive)
- Variables/Functions: `camelCase`
- Types/Interfaces: `PascalCase`
- TypeScript: `interface` for data models, `type` for unions

### TypeScript Strictness
- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- Always define explicit return types for functions
- Use `interface Props` for component props

```typescript
interface Props {
  todo: Todo
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'delete', id: string): void
}>()

const getTodosByQuadrant = (type: QuadrantType): Todo[] => { /* ... */ }
```

### Vue Patterns
- Use `ref()` for primitives/objects, `computed()` for derived state
- Avoid `reactive()` for simple cases

```typescript
const isEditing = ref(false)
const todos = ref<Todo[]>([])
```

### Error Handling
```typescript
const fetchTodos = async () => {
  loading.value = true
  error.value = null
  try {
    todos.value = await todoApi.getAll()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch'
    console.error('Failed to fetch todos:', err)
  } finally {
    loading.value = false
  }
}
```

### Styling (Tailwind CSS)
- Use Tailwind utility classes in templates
- Dark mode: `dark:` prefix (e.g., `dark:bg-gray-800`)
- Quadrant colors: `q1-bg`, `q2-bg`, `q3-bg`, `q4-bg` (from tailwind.config.js)

```vue
<div class="flex items-center gap-2" :class="{ 'bg-gray-50 dark:bg-gray-700': done }">
```

### Pinia Store Pattern
```typescript
export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const q1Todos = computed(() => todos.value.filter(t => t.isUrgent && t.isImportant))

  const fetchTodos = async () => { /* ... */ }

  return { todos, loading, error, q1Todos, fetchTodos }
})
```

### Drag and Drop (vuedraggable)
```vue
<draggable v-model="localTodos" group="todos" item-key="id" @change="handleChange">
  <template #item="{ element }">
    <TodoItem :todo="element" />
  </template>
</draggable>
```
- Use `group="todos"` for cross-quadrant dragging

---

## Project Notes

### Data Model
- `Todo`: `isUrgent`, `isImportant`, `order` fields
- Quadrants: q1 (urgent+important), q2 (urgent), q3 (important), q4 (neither)

### Dark Mode
- Uses Tailwind's `darkMode: 'class'`
- Check `settingsStore.isDarkMode`

### API Layer
- LocalStorage with key `'quad-todo-items'`
- Pre-wired for HTTP backend (`src/api/client.ts`)
- All API calls have 100ms artificial delay

### Path Aliases
`@/` maps to `src/` (in vite.config.ts and tsconfig.json)
