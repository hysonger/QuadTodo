## Why

Currently, when deleting a todo item that has an associated document, the app shows a confirmation dialog giving users the option to either delete just the todo (keeping the document) or delete both. This creates inconsistent state where documents can exist without their parent todo, which is not a valid use case. Documents should only exist in relation to their todo items.

## What Changes

- Remove the delete confirmation option to keep document when deleting a todo
- When a todo with a document is deleted, the document is automatically deleted as well
- Marking a todo as completed does not affect the document (existing behavior preserved)
- The confirmation dialog still shows for todos with documents, but now only confirms deletion (no separate option to keep document)

## Capabilities

### New Capabilities
- `todo-document-deletion`: Define the behavior for document deletion when todo is deleted

### Modified Capabilities
- (none - existing behavior for document-completion interaction already correct)

## Impact

- `src/components/QuadrantGrid.vue`: Modify delete confirmation dialog to remove "keep document" option
- `src/stores/todoStore.ts`: Modify `deleteTodo` to automatically delete associated document
