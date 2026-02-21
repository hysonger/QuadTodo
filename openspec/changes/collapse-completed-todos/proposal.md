## Why

Currently, completed todos in each quadrant are displayed in a fixed section below the uncompleted todos, which wastes vertical display space when there are many completed items. Users need to scroll through completed items to reach other quadrants, and the fixed position reduces the usable space for active (uncompleted) todos.

## What Changes

- Move completed todo items to appear after all uncompleted todos within each quadrant, allowing them to scroll together with the uncompleted list
- Add a collapsible "已完成" (Completed) header row for each quadrant's completed items
- The collapse button appears on the right side of the completed header
- Default state is collapsed (completed items hidden)
- Completed items become visible only when user expands the section

## Capabilities

### New Capabilities
- `todo-completed-collapse`: Collapsible completed todo section within each quadrant

### Modified Capabilities

## Impact

- Modified: Quadrant component UI layout (TodoQuadrant.vue)
- Modified: Todo list rendering logic in quadrant components
- No API or data model changes required
