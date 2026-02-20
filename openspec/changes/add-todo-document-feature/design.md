## Context

The QuadTodo application is a desktop app built with Vue 3 + Tauri that manages todo items in a 2x2 Eisenhower matrix (urgent/important quadrants). Currently, todos only support simple text content. Users need the ability to attach richer documentation to individual todo items.

## Goals / Non-Goals

**Goals:**
- Add document icon button to each todo item
- Highlight document button for todos with existing documents
- Implement markdown editor with syntax highlighting
- Support preview mode for rendered markdown
- Store documents as individual .md files in docs/ folder
- Handle completed todos (move to "Completed" section)
- Show confirmation dialogs for deletion scenarios

**Non-Goals:**
- Real-time collaboration on documents
- Document versioning or history
- Full-featured WYSIWYG markdown editor
- Cloud sync or cross-device document sharing

## Decisions

### 1. Document button highlight approach

**Decision:** Track document existence via todo metadata field `hasDocument: boolean`

**Rationale:** Instead of checking file system on every render, store a boolean flag in the todo data model. This is more performant and works well with the existing localStorage/JSON data structure.

**Alternative considered:** Check file existence on each render using Tauri fs API - rejected due to performance overhead.

### 2. Markdown editor implementation

**Decision:** Use `vue-codemirror` (CodeMirror 6) for the markdown editor

**Rationale:** 
- CodeMirror 6 is a modern, well-maintained code editor
- Built-in markdown syntax highlighting with `@codemirror/lang-markdown`
- Automatic dark mode support with `@codemirror/theme-one-dark`
- Vue 3 support via official `vue-codemirror` wrapper

**Alternative considered:** Custom textarea with regex-based highlighting - rejected due to maintenance burden and edge cases.

### 4. Preview rendering

**Decision:** Use `@tailwindcss/typography` plugin with `prose` and `dark:prose-invert` classes

**Rationale:**
- Official Tailwind plugin provides comprehensive markdown styling
- Automatic dark mode support
- Supports all markdown elements out of the box

### 4. View modes and UI layout

**Decision:** Support three view modes: Edit, Split, Preview

**Rationale:**
- **Edit**: Full-width editing for maximum space
- **Split**: 50/50 side-by-side for live preview while editing
- **Preview**: Full-width rendered view for reading
- View mode toggle buttons are placed in the header bar to save vertical space

### 5. Document storage location

**Decision:** Store documents in `{app-data-dir}/docs/` directory

**Rationale:** Uses Tauri's standard app data directory, which is appropriate for user-generated content and properly isolated per installation.

**Alternative considered:** Store in user-specified location - rejected for simplicity.

### 6. Document filename

**Decision:** Use `{todo-id}.md` as filename

**Rationale:** Simple 1:1 mapping between todo and document, easy to locate and manage.

### 7. Confirmation dialog approach

**Decision:** Create a reusable ConfirmDialog component that can be invoked with different messages

**Rationale:** Reusable component pattern fits Vue 3 conventions and avoids duplicating modal logic.

### 8. Auto-save

**Decision:** Implement debounced auto-save (500ms delay)

**Rationale:** Saves automatically as user types without requiring manual save action, with debounce to reduce file system writes.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| File system errors on document operations | Document may fail to save/load | Show user-friendly error messages; keep in-memory backup |
| Document orphaned if todo deleted without confirmation | Orphaned .md files in docs/ | User explicitly chooses to delete document or not |
| App data directory path varies by OS | docs/ location differs per platform | Use Tauri path APIs for cross-platform compatibility |
| Large markdown documents affect performance | Slow editor response | Use debounced saving; Typography plugin handles rendering efficiently |
