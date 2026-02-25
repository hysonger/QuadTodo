## ADDED Requirements

### Requirement: Import todos from ZIP file
The system SHALL allow users to import todos from a previously exported ZIP file.

#### Scenario: Import with documents
- **WHEN** user selects a valid ZIP file containing todos.json and docs/ folder
- **THEN** system imports all todos and creates corresponding documents

#### Scenario: Import without documents
- **WHEN** user selects a valid ZIP file containing only todos.json
- **THEN** system imports all todos with hasDocument set to false

#### Scenario: Import empty file
- **WHEN** user selects a ZIP file containing empty todos.json `[]`
- **THEN** system imports zero todos and shows success message

### Requirement: Import validation
The system SHALL validate the ZIP file structure before importing.

#### Scenario: Invalid file format
- **WHEN** user selects a non-ZIP file
- **THEN** system shows error message "无效的文件格式，请选择 ZIP 文件"

#### Scenario: Missing todos.json
- **WHEN** user selects a ZIP file without todos.json
- **THEN** system shows error message "Invalid export file: missing todos.json"

#### Scenario: Corrupted JSON
- **WHEN** user selects a ZIP file with corrupted todos.json
- **THEN** system shows error message "Invalid export file: corrupted data"

### Requirement: Import merge strategy
The system SHALL provide options for handling existing data during import.

#### Scenario: Merge import
- **WHEN** user imports with existing todos and selects "merge" option
- **THEN** system adds imported todos alongside existing todos (preserving both)

#### Scenario: Replace import
- **WHEN** user imports with existing todos and selects "replace" option
- **THEN** system removes all existing todos and documents before importing

### Requirement: Incremental import mode
The system SHALL provide an incremental import mode that updates existing todos by ID while preserving new local todos.

#### Scenario: Incremental import - same ID
- **WHEN** user imports with existing todos and selects "incremental" option, and an imported todo has the same ID as an existing todo
- **THEN** system replaces the existing todo's content, quadrant, and completion status with the imported data

#### Scenario: Incremental import - same ID with document
- **WHEN** user imports with existing todos and selects "incremental" option, and an imported todo has hasDocument=true
- **THEN** system replaces the existing document content with the imported document if it exists

#### Scenario: Incremental import - new ID
- **WHEN** user imports with existing todos and selects "incremental" option, and an imported todo has an ID that doesn't exist locally
- **THEN** system creates a new todo with the imported data

#### Scenario: Incremental import - preserve local only
- **WHEN** user imports with existing todos and selects "incremental" option
- **THEN** system keeps all local todos that are not in the import file

### Requirement: Document association
The system SHALL correctly associate imported documents with their corresponding todos.

#### Scenario: Match document by ID
- **WHEN** imported todo has hasDocument=true
- **THEN** system looks for `{todoId}.md` in docs/ folder and creates the document if found
