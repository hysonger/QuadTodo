## ADDED Requirements

### Requirement: macOS title bar follows system dark mode
The system SHALL configure the Tauri window with `"titleBarStyle": "Transparent"` to make the title bar automatically synchronize its appearance with the macOS system dark mode setting.

#### Scenario: System in dark mode
- **WHEN** the macOS system is set to dark mode
- **THEN** the application window title bar SHALL display in dark appearance

#### Scenario: System in light mode
- **WHEN** the macOS system is set to light mode
- **THEN** the application window title bar SHALL display in light appearance

#### Scenario: System theme changes while app is running
- **GIVEN** the application is running
- **WHEN** the user changes the macOS system theme from light to dark (or vice versa)
- **THEN** the application window title bar SHALL update its appearance to match the new system theme without requiring an app restart
