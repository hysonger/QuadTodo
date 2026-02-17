## Context

QuadTodo is a Vue 3 + Tauri v2 desktop application. The app supports dark mode internally via Tailwind CSS and a settings store, but the native macOS window title bar does not automatically follow the system dark mode setting. This creates a visual inconsistency where the app content may be dark while the title bar remains light.

Tauri v2 provides macOS-specific window configuration options through `tauri.conf.json` and the `Window` API. The title bar appearance on macOS is controlled by the window's `titleBarStyle` and related appearance settings.

## Goals / Non-Goals

**Goals:**
- Configure the Tauri window to automatically synchronize its title bar appearance with macOS system dark mode
- Ensure the title bar transitions smoothly when the system theme changes
- Maintain compatibility with existing window functionality (resizing, minimizing, etc.)

**Non-Goals:**
- Custom title bar drawing or removal of native title bar
- Windows/Linux title bar changes (already handled or not applicable)
- In-app theme toggle affecting title bar (follows system only)

## Decisions

### Decision: Use `titleBarStyle: "Transparent"` for system appearance

**Choice**: Configure `titleBarStyle: "Transparent"` in `tauri.conf.json` under `app.windows[0]`.

**Rationale**:
- Tauri v2 supports macOS window appearance through `titleBarStyle` configuration
- The `Transparent` style makes the title bar automatically follow the system dark/light mode appearance
- No Rust code changes required - purely configuration-based
- Minimal risk and maintenance burden

**Alternatives considered**:
- `theme: "system"` or `theme: "auto"` - Not valid in Tauri v2 schema; theme only accepts `"light"` or `"dark"`
- Custom Rust code to listen for theme changes and update window appearance dynamically
  - Rejected: Overkill for this requirement; Tauri's built-in configuration is sufficient
- Remove title bar and draw custom one
  - Rejected: Would lose native macOS window controls and behavior

### Decision: Configuration-only implementation

**Choice**: Modify only `tauri.conf.json` without adding Rust code.

**Rationale**:
- Tauri v2's configuration handles this natively on macOS
- Simpler implementation with no code changes
- Easier to maintain and understand

## Risks / Trade-offs

**[Risk] Title bar may not update dynamically without window focus**
→ **Mitigation**: This is standard macOS behavior; the title bar will update when the window receives focus or the user switches themes. Documented as acceptable limitation.

**[Risk] Users with "Auto" appearance may see brief flicker**
→ **Mitigation**: This is controlled by macOS and Tauri's implementation; no custom code to mitigate.

## Migration Plan

No migration needed. This is a configuration change that applies to new window creation. Existing running instances will pick up the change on next app launch.

## Open Questions

None. The implementation approach is straightforward using Tauri's built-in configuration.
