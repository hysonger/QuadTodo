## Why

In the macOS desktop version of QuadTodo, the window title bar does not follow the system dark mode setting. When the system is in dark mode, the title bar remains light, creating a visual inconsistency with the app's dark theme. This affects the user experience by making the app feel unpolished and out of sync with the macOS system aesthetic.

## What Changes

- Enable Tauri's macOS title bar to automatically follow system dark/light mode appearance
- Configure window decorations to respect system appearance settings
- Ensure title bar color transitions smoothly when system theme changes

## Capabilities

### New Capabilities
- `macos-titlebar-dark-mode`: Configure Tauri window to automatically synchronize its title bar appearance with macOS system dark mode settings

### Modified Capabilities
<!-- No existing capabilities require spec-level changes -->

## Impact

- **Affected files**: `src-tauri/tauri.conf.json`
- **Platform**: macOS only (Windows and Linux already handle this correctly or don't have this issue)
- **Dependencies**: No new dependencies required - uses Tauri v2 built-in macOS appearance APIs
- **User experience**: Title bar will now match system theme automatically, providing a more native macOS experience
