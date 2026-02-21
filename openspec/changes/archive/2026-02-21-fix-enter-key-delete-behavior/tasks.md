## 1. Implementation

- [x] 1.1 Add hasUserTyped ref in TodoItem.vue state
- [x] 1.2 Track input changes with @input event to set hasUserTyped to true
- [x] 1.3 Reset hasUserTyped to false in startEditing and saveEdit
- [x] 1.4 Modify handleKeydown Enter logic to check hasUserTyped before delete

## 2. Verification

- [x] 2.1 Test: Create new todo with Enter, press Enter again without typing → should do nothing
- [x] 2.2 Test: Create new todo with Enter, type and delete, press Enter → should delete todo
- [x] 2.3 Test: Create new todo with Enter, type content, press Enter → should save and create next
