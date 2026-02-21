## 1. Type Definitions

- [x] 1.1 Add `isNew?: boolean` field to `Todo` type in `src/types/index.ts`

## 2. TodoItem Component

- [x] 2.1 Add `isNew` prop to TodoItem component interface
- [x] 2.2 Add `onMounted` hook to auto-enter edit mode when `isNew` is true
- [x] 2.3 Ensure `nextTick` is used before focusing input element
- [x] 2.4 Clear `isNew` flag after entering edit mode (optional, for cleanup)

## 3. TodoList Component

- [x] 3.1 Pass `isNew` flag to TodoItem when rendering newly created todos
- [x] 3.2 Track newly created todo ID to determine which item should auto-focus

## 4. Quadrant Component

- [x] 4.1 Track last created todo ID in component state
- [x] 4.2 Pass `isNew` prop to TodoList for the newly created todo

## 5. Store Integration

- [x] 5.1 Modify `addTodo` action to return the created todo with `isNew: true`
- [x] 5.2 Ensure `createNext` flow preserves quadrant context for new todo

## 6. Testing

- [x] 6.1 Test: Click add button → new todo enters edit mode with focus
- [x] 6.2 Test: Press Enter on existing todo → new todo enters edit mode with focus
- [x] 6.3 Test: Empty todo loses focus → todo is deleted
- [x] 6.4 Test: Whitespace-only todo loses focus → todo is deleted
- [x] 6.5 Test: Todo with content loses focus → todo is saved and remains
- [x] 6.6 Test: Drag and drop still works correctly
- [x] 6.7 Test: Dark mode styling preserved

## 7. Verification

- [x] 7.1 Run `npm run build` to verify no TypeScript errors
- [x] 7.2 Run desktop build `npm run tauri:build` to verify no issues
