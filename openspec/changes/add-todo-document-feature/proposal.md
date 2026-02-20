## Why

Users need to add detailed notes or context to individual todo items beyond simple text. A markdown document attached to each todo provides rich formatting capabilities while keeping todos lightweight until needed.

## What Changes

- Add a document icon button to the left of the delete button on each todo item
- Document button visually highlighted (加重显示) for todos that already have a document created
- Create a document editing page with markdown support (basic highlighting: bold, italic, headers, lists, code)
- Documents are created on-demand (lazy creation) - only when user clicks the document button
- Store each todo's markdown document as a separate `.md` file in `docs/` folder (program directory)
- When marking a todo as complete: todo remains and sinks to a "Completed" section within the same quadrant
- When deleting a todo that has a document: show confirmation dialog asking if document should also be deleted
- When clearing todo text (triggering deletion): if document exists, show confirmation dialog

## Capabilities

### New Capabilities
- `todo-document`: Markdown document editor for individual todo items with on-demand creation, basic formatting toolbar, and preview mode

### Modified Capabilities
- None (existing todo management behavior is enhanced with new UI and dialogs, but requirements unchanged)

## Impact

- **Frontend**: New document editor component, modified TodoItem component (add icon button), confirmation dialog component
- **Storage**: File system storage in `docs/` directory (localStorage remains for todo items)
- **Desktop**: Tauri file system APIs for reading/writing .md files
