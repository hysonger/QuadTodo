## ADDED Requirements

### Requirement: New todo items automatically enter edit mode
When a new todo item is created via the add button or pressing Enter on an existing todo, the system SHALL automatically place the new todo in edit mode with focus on its input field.

#### Scenario: Clicking add button focuses new todo
- **WHEN** user clicks the add button in a quadrant
- **THEN** a new todo item is created
- **AND** the new todo immediately enters edit mode
- **AND** the input field receives keyboard focus

#### Scenario: Pressing Enter on existing todo focuses new todo
- **WHEN** user presses Enter while editing an existing todo
- **THEN** a new todo item is created below the current one
- **AND** the new todo immediately enters edit mode
- **AND** the input field receives keyboard focus
- **AND** the previous todo exits edit mode and saves its content

### Requirement: Empty todos are automatically deleted
When a todo item loses focus while in edit mode and its content is empty (or contains only whitespace), the system SHALL automatically delete that todo item.

#### Scenario: Empty todo loses focus and is deleted
- **WHEN** a todo item is in edit mode with empty content
- **AND** the user clicks outside the input field or presses Tab
- **THEN** the todo item is automatically deleted
- **AND** no empty todo remains in the list

#### Scenario: Whitespace-only todo loses focus and is deleted
- **WHEN** a todo item is in edit mode with content containing only spaces or tabs
- **AND** the user clicks outside the input field
- **THEN** the todo item is automatically deleted
- **AND** no empty todo remains in the list

#### Scenario: Todo with content keeps focus loss
- **WHEN** a todo item is in edit mode with non-empty content
- **AND** the user clicks outside the input field
- **THEN** the todo exits edit mode
- **AND** the content is saved
- **AND** the todo remains in the list
