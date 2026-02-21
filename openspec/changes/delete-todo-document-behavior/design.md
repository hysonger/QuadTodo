## Context

Currently, when deleting a todo item that has an associated document, the app shows a confirmation dialog with two options:
1. Delete todo only (keep document)
2. Delete both todo and document

This creates orphaned documents that exist without a parent todo, which is invalid state. The document system is designed to work alongside todo items, not independently.

## Goals / Non-Goals

**Goals:**
- Ensure documents are always deleted when their parent todo is deleted
- Simplify the delete confirmation UI by removing the "keep document" option
- Preserve the existing behavior where marking a todo as completed does not affect its document

**Non-Goals:**
- Modify document creation or editing behavior
- Add bulk delete operations for documents
- Change how documents are stored or retrieved

## Decisions

### Decision 1: Auto-delete document in store layer
**Chosen approach:** Modify `todoStore.deleteTodo` to check for and delete any associated document automatically.

**Rationale:** 
- Centralizes the deletion logic in one place
- Ensures documents are always cleaned up regardless of which UI component triggers the delete
- Simpler than modifying multiple UI components

**Alternative considered:** Handle in UI component (QuadrantGrid.vue) - rejected because `deleteTodo` could be called from other places in the future.

### Decision 2: Keep confirmation dialog for user awareness
**Chosen approach:** Keep the confirmation dialog visible for todos with documents, but simplify to single confirm button.

**Rationale:**
- Users should still be warned that a document will be deleted
- Single confirm button is clearer than multiple options
- Aligns with the "no keep document option" requirement

### Decision 3: Document deletion after todo deletion
**Chosen approach:** Delete document after successfully deleting the todo.

**Rationale:**
- If todo deletion fails, document remains for potential retry
- Simpler error handling - if todo delete fails, no need to rollback document delete

## Risks / Trade-offs

- **[Risk]** If document deletion fails after todo is deleted, orphaned document could remain
  - **Mitigation:** Catch document deletion errors and log them; todo is already deleted so this is acceptable minor inconsistency

- **[Risk]** Users may want to keep documents after deleting todos
  - **Mitigation:** This is by design - documents are meant to be tied to todos, not independent entities
