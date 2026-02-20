## 1. Data Model & API Changes

- [x] 1.1 Add `hasDocument: boolean` field to Todo type in `src/types/`
- [x] 1.2 Create document API module `src/api/documentApi.ts` with Tauri file system operations
- [x] 1.3 Implement `createDocument(todoId: string, content: string)` function
- [x] 1.4 Implement `getDocument(todoId: string): Promise<string>` function
- [x] 1.5 Implement `updateDocument(todoId: string, content: string)` function
- [x] 1.6 Implement `deleteDocument(todoId: string)` function
- [x] 1.7 Implement `documentExists(todoId: string): Promise<boolean>` function
- [x] 1.8 Add `hasDocument` tracking in todo store when document is created/deleted

## 2. UI Components - Document Button

- [x] 2.1 Add document icon (FileText or similar from lucide-vue-next) to TodoItem component
- [x] 2.2 Position document button to the left of delete button
- [x] 2.3 Add visual highlight style for button when `hasDocument` is true
- [x] 2.4 Add click handler to open document editor page

## 3. UI Components - Document Editor Page

- [x] 3.1 Create `src/components/DocumentEditor.vue` component
- [x] 3.2 Add textarea for markdown editing - Replaced with CodeMirror editor
- [x] 3.3 Add formatting toolbar - Not needed (CodeMirror handles this)
- [x] 3.4 Implement toolbar button click handlers - Not needed (CodeMirror handles this)
- [x] 3.5 Add view mode toggle (Edit/Split/Preview)
- [x] 3.6 Implement markdown rendering using `marked` library
- [x] 3.7 Add auto-save on content change (debounced 500ms)
- [x] 3.8 Add loading state while saving
- [x] 3.9 Add split view mode (50/50 editor and preview)
- [x] 3.10 Add markdown syntax highlighting via vue-codemirror
- [x] 3.11 Install and configure `@tailwindcss/typography` plugin
- [x] 3.12 Implement large editor modal (max-width: 1400px, height: 85vh)
- [x] 3.13 Install `vue-codemirror`, `@codemirror/lang-markdown`, `@codemirror/theme-one-dark`
- [x] 3.14 Configure CodeMirror with markdown language support and dark theme
- [x] 3.15 Configure Vite to code-split CodeMirror into separate chunk

## 4. UI Components - Confirmation Dialog

- [x] 4.1 Create `src/components/common/ConfirmDialog.vue` reusable component
- [x] 4.2 Support custom title, message, and button labels
- [x] 4.3 Implement emit for confirm/cancel actions

## 5. Page Routing & Navigation

- [x] 5.1 Add route for document editor page (`/todo/:id/document`) - Implemented as modal overlay
- [x] 5.2 Update router to include document editor route - Not needed (modal approach)
- [x] 5.3 Implement navigation from document button click to editor page
- [x] 5.4 Pass todo ID to document editor via route params

## 6. Completed Todo Section

- [x] 6.1 Modify quadrant todo lists to include "Completed" section at bottom
- [x] 6.2 Filter completed todos to show in completed section
- [x] 6.3 Update todo store to handle completed status change
- [x] 6.4 Preserve `hasDocument` flag when todo is completed

## 7. Deletion Confirmation Logic

- [x] 7.1 Add confirmation dialog trigger when deleting todo with `hasDocument: true`
- [x] 7.2 Handle "Delete todo only" option (keep document or offer to delete document)
- [x] 7.3 Handle "Delete todo and document" option
- [x] 7.4 Add confirmation dialog when clearing todo text with existing document
- [x] 7.5 Delete document file when user confirms document deletion

## 8. Testing & Integration

- [ ] 8.1 Test document creation via button click
- [ ] 8.2 Test document button highlight on todos with documents
- [ ] 8.3 Test markdown formatting in editor
- [ ] 8.4 Test preview mode rendering
- [ ] 8.5 Test completed todo section display
- [ ] 8.6 Test deletion confirmation dialogs
- [ ] 8.7 Test app restart - verify document button remains highlighted

## 9. Build & Package

- [x] 9.1 Run `npm run build` to verify no type errors
- [ ] 9.2 Run desktop build to verify Tauri integration works
- [ ] 9.3 Test document operations in packaged app
