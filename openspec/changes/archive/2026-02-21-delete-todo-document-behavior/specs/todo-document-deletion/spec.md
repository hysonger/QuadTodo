## ADDED Requirements

### Requirement: Todo deletion automatically deletes associated document
When a todo item with an associated document is deleted, the document MUST be automatically deleted as part of the delete operation.

#### Scenario: Delete todo with document
- **WHEN** user deletes a todo that has a document (`hasDocument: true`)
- **THEN** the document is deleted before or after the todo deletion completes

#### Scenario: Delete todo without document
- **WHEN** user deletes a todo that has no document (`hasDocument: false`)
- **THEN** only the todo is deleted, no document deletion occurs

### Requirement: Delete confirmation dialog shows warning but no keep option
The confirmation dialog for deleting a todo with a document MUST warn the user but MUST NOT offer an option to keep the document.

#### Scenario: Confirm delete with document
- **WHEN** user confirms deletion of a todo that has a document
- **THEN** the dialog shows a warning about document deletion
- **AND** there is only a single confirm button (no option to keep document)

#### Scenario: Cancel delete with document
- **WHEN** user cancels the deletion of a todo that has a document
- **THEN** neither the todo nor the document is deleted

### Requirement: Completion does not affect document
Marking a todo as completed MUST NOT affect its associated document.

#### Scenario: Complete todo with document
- **WHEN** user marks a todo with a document as completed
- **THEN** the document remains unchanged and accessible

#### Scenario: Uncomplete todo with document
- **WHEN** user unmarks a completed todo with a document
- **THEN** the document remains unchanged and accessible
