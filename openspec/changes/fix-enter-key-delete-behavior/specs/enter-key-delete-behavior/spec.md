## ADDED Requirements

### Requirement: Enter key delete behavior control
When a new todo is created and the user presses Enter in the input field, the system SHALL differentiate between "never typed" and "typed then cleared" states to determine whether to delete the todo.

#### Scenario: User presses Enter without typing anything
- **WHEN** a new todo is created (isNew = true) and user presses Enter in the input field while the input is empty AND user has never typed any content since entering edit mode
- **THEN** the system SHALL do nothing (no action, no delete)

#### Scenario: User presses Enter after typing and clearing content
- **WHEN** a new todo is created (isNew = true) and user types some content in the input field, clears it all, then presses Enter
- **THEN** the system SHALL delete the newly created todo

#### Scenario: User presses Enter with content
- **WHEN** a new todo is created (isNew = true) and user has typed some content (non-empty after trim) and presses Enter
- **THEN** the system SHALL save the updated content and emit 'createNext' event

#### Scenario: User presses Enter on non-new todo with empty content
- **WHEN** an existing todo (isNew = undefined/false) is being edited and user presses Enter with empty content
- **THEN** the system SHALL delete the todo
