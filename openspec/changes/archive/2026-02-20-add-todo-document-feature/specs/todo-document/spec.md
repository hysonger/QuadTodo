## ADDED Requirements

### Requirement: Document button visibility
The system SHALL display a document icon button on each todo item, positioned to the left of the delete button.

#### Scenario: Document button displayed for new todo
- **WHEN** a new todo is displayed in the list
- **THEN** a document icon button is visible next to the delete button
- **AND** the button is in default (non-highlighted) state

#### Scenario: Document button highlighted for todo with document
- **WHEN** a todo has an associated markdown document already created
- **THEN** the document icon button SHALL be visually highlighted (加重显示) to indicate a document exists
- **AND** the highlight persists across app restarts

### Requirement: On-demand document creation
Documents SHALL only be created when the user explicitly clicks the document button for the first time.

#### Scenario: First click creates document
- **WHEN** user clicks the document button on a todo that has no document
- **THEN** a new markdown file is created in the docs/ folder
- **AND** the document editor opens for that todo
- **AND** the document button becomes highlighted

#### Scenario: Subsequent clicks open existing document
- **WHEN** user clicks the document button on a todo that already has a document
- **THEN** the existing markdown file is loaded
- **AND** the document editor opens with the existing content

### Requirement: Document storage
Each todo's document SHALL be stored as an individual markdown file in the program's docs/ directory.

#### Scenario: Document file naming
- **WHEN** a document is created for a todo
- **THEN** the file is named `{todo-id}.md` in the docs/ folder
- **AND** the full path is `{program-directory}/docs/{todo-id}.md`

### Requirement: Document editor with basic formatting
The document editor SHALL provide markdown editing with syntax highlighting and preview mode using the CodeMirror 6 editor.

#### Scenario: Editor provides markdown syntax highlighting
- **WHEN** the document editor is open in edit mode
- **THEN** markdown syntax is highlighted using CodeMirror 6's markdown language support
- **AND** the editor provides proper indentation, line numbers, and code folding

#### Scenario: View mode toggle
- **WHEN** user clicks view mode buttons (Edit/Split/Preview)
- **THEN** the editor switches between modes:
  - **Edit**: Full-width markdown editing with syntax highlighting
  - **Split**: Side-by-side editor and preview (50/50)
  - **Preview**: Full-width rendered markdown
- **AND** the view mode toggle buttons are displayed in the header bar alongside the document title

#### Scenario: Dark mode support
- **WHEN** the application is in dark mode
- **THEN** the editor theme switches to one-dark theme automatically
- **AND** the preview area uses dark mode styling

#### Scenario: Markdown preview rendering
- **WHEN** preview mode or split view is active
- **THEN** markdown is rendered as formatted HTML using Tailwind Typography plugin
- **AND** supports: headings, paragraphs, lists, code blocks, blockquotes, links, tables
- **AND** dark mode styling is applied automatically

#### Scenario: Editor save status indicator
- **WHEN** the document is being saved
- **THEN** a spinning loader icon is displayed in the header
- **AND** when saving is complete, a checkmark icon is displayed
- **AND** icons are used instead of text to save space

#### Scenario: Large editor window
- **WHEN** document editor is opened
- **THEN** a large modal window is displayed (max-width: 1400px, height: 85vh)
- **AND** the editor fills most of the screen for comfortable editing

### Requirement: Completed todo handling
When a todo is marked as completed, it SHALL remain in the system and move to a "Completed" section within the same quadrant.

#### Scenario: Mark todo as complete
- **WHEN** user clicks the complete button on a todo
- **THEN** the todo's isCompleted flag is set to true
- **AND** the todo moves to the "Completed" section at the bottom of its quadrant
- **AND** the associated document (if any) is preserved

### Requirement: Deletion confirmation for todo with document
When deleting a todo that has an associated document, the system SHALL prompt the user to confirm whether to also delete the document.

#### Scenario: Delete todo with document
- **WHEN** user attempts to delete a todo that has a document
- **THEN** a confirmation dialog is displayed asking if the document should also be deleted
- **AND** options include "Delete todo only" and "Delete todo and document"

#### Scenario: Delete todo without document
- **WHEN** user attempts to delete a todo that has no document
- **THEN** the todo is deleted immediately without confirmation

### Requirement: Text clear triggers deletion confirmation
When a todo's text is cleared (resulting in automatic deletion), if a document exists, a confirmation dialog SHALL be shown.

#### Scenario: Clear text with existing document
- **WHEN** user clears all text from a todo that has a document
- **THEN** a confirmation dialog is displayed asking if the document should also be deleted
- **AND** options include "Delete todo only" and "Delete todo and document"

#### Scenario: Clear text without document
- **WHEN** user clears all text from a todo that has no document
- **THEN** the todo is deleted immediately without confirmation
