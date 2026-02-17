## ADDED Requirements

### Requirement: Custom slogan displayed in header
The system SHALL display user-configured custom text in the header's left area, replacing the default app icon and title.

#### Scenario: Default slogan on first launch
- **WHEN** the user opens the app for the first time (no saved slogan)
- **THEN** the system SHALL display "日拱一卒" in the header left area

#### Scenario: Custom slogan displayed after saving
- **WHEN** the user has saved a custom slogan
- **THEN** the system SHALL display the saved custom slogan in the header left area

#### Scenario: Slogan styling
- **WHEN** the slogan is displayed in the header
- **THEN** the text SHALL use a smaller font size and lighter color to appear visually subdued

### Requirement: Settings page accessible from header
The system SHALL provide a settings icon button in the header's right area that opens the settings page.

#### Scenario: Open settings page
- **WHEN** the user clicks the settings icon button in the header
- **THEN** the system SHALL display the settings page

#### Scenario: Close settings page
- **WHEN** the user clicks the back/close button in the settings page
- **THEN** the system SHALL close the settings page and return to the main todo view

### Requirement: Custom slogan can be configured
The system SHALL allow users to input and save a custom slogan through the settings page.

#### Scenario: Save custom slogan
- **WHEN** the user enters text in the custom slogan input field and clicks save
- **THEN** the system SHALL save the text to LocalStorage and display it in the header

#### Scenario: Edit existing slogan
- **WHEN** the user opens the settings page with an existing saved slogan
- **THEN** the input field SHALL be pre-filled with the current slogan value

### Requirement: Custom slogan persists across sessions
The system SHALL persist the custom slogan to LocalStorage so it survives browser/app restarts.

#### Scenario: Slogan persists after app restart
- **WHEN** the user has saved a custom slogan and restarts the app
- **THEN** the system SHALL load the saved slogan from LocalStorage and display it

#### Scenario: Empty slogan handling
- **WHEN** the user clears the slogan input and saves an empty value
- **THEN** the system SHALL save the empty value and display nothing (or optionally fall back to default)
