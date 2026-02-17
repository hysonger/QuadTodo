## 1. Extend settingsStore

- [x] 1.1 Add `customSlogan` state to settingsStore with default value "日拱一卒"
- [x] 1.2 Add `setCustomSlogan` action to update and save the slogan
- [x] 1.3 Update `loadSettings` to load customSlogan from LocalStorage
- [x] 1.4 Update `saveSettings` to persist customSlogan to LocalStorage

## 2. Create Settings component

- [x] 2.1 Create `src/components/Settings.vue` component
- [x] 2.2 Add input field for custom slogan with current value pre-filled
- [x] 2.3 Add save button that calls `settingsStore.setCustomSlogan`
- [x] 2.4 Add close/back button to return to main view

## 3. Update App.vue header

- [x] 3.1 Remove the app icon and "四象限待办" title from header left
- [x] 3.2 Add custom slogan display using `settingsStore.customSlogan`
- [x] 3.3 Apply smaller font and lighter color styles to slogan
- [x] 3.4 Add Settings icon button in header right (next to dark mode toggle)
- [x] 3.5 Add state to show/hide settings panel

## 4. Integration and styling

- [x] 4.1 Ensure dark mode styling works for all new elements
- [x] 4.2 Test slogan persistence after app restart
- [x] 4.3 Verify empty slogan handling
