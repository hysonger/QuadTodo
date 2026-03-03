## ADDED Requirements

### Requirement: Export all todos to ZIP file
The system SHALL allow users to export all todos and their associated documents as a single ZIP file download.

#### Scenario: Export with documents
- **WHEN** user clicks "Export All" button and there are todos with documents
- **THEN** system downloads a ZIP file containing:
  - `todos.json` with all todo data in JSON format
  - `docs/` folder containing all associated markdown documents

#### Scenario: Export without documents
- **WHEN** user clicks "Export All" button and there are no documents
- **THEN** system downloads a ZIP file containing:
  - `todos.json` with all todo data
  - Empty `docs/` folder

#### Scenario: Export empty state
- **WHEN** user clicks "Export All" button and there are no todos
- **THEN** system downloads a ZIP file containing:
  - `todos.json` with empty array `[]`
  - Empty `docs/` folder

#### Scenario: Cancel export via dialog
- **WHEN** user clicks "Export All" button and closes the file save dialog without selecting a location
- **THEN** system silently cancels the export without showing any error message

### Requirement: Export file naming
The exported ZIP file SHALL use a timestamped filename for easy identification.

#### Scenario: Verify filename format
- **WHEN** user exports todos
- **THEN** the downloaded file is named `quadtodo-export-YYYY-MM-DD.zip` using local date

### Requirement: Export includes all todo fields
The exported data SHALL preserve all todo metadata including quadrant position and completion status.

#### Scenario: Preserve todo properties
- **WHEN** user exports todos with various states
- **THEN** exported `todos.json` contains all fields: id, content, isUrgent, isImportant, isCompleted, order, createdAt, updatedAt, hasDocument
