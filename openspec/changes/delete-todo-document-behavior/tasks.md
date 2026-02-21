## 1. Store Layer Changes

- [x] 1.1 Modify `deleteTodo` in `src/stores/todoStore.ts` to check if todo has document before deletion
- [x] 1.2 Add automatic document deletion when todo is deleted
- [x] 1.3 Add error handling for document deletion failures

## 2. UI Component Changes

- [x] 2.1 Update delete confirmation dialog in `src/components/QuadrantGrid.vue` to remove "keep document" option
- [x] 2.2 Simplify dialog to single confirm button with warning text
- [x] 2.3 Update confirmDelete function to always delete document when todo has document

## 3. Verification

- [x] 3.1 Test deleting todo with document - document should be deleted
- [x] 3.2 Test deleting todo without document - should work as before
- [x] 3.3 Test marking todo with document as completed - document should remain
- [x] 3.4 Test canceling delete - neither todo nor document should be deleted
