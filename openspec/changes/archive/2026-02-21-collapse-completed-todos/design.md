## Context

The current implementation displays completed todos in a fixed section at the bottom of each quadrant (lines 120-140 in Quadrant.vue). This creates a separate scrollable container that:
1. Takes up permanent vertical space even when collapsed
2. Prevents natural scrolling behavior with uncompleted todos
3. Reduces usable screen real estate for active todos

## Goals / Non-Goals

**Goals:**
- Move completed todo items to scroll together with uncompleted todos within each quadrant
- Add a collapsible "已完成" header with count and collapse/expand toggle
- Default to collapsed state to minimize visual clutter
- Maintain drag-and-drop functionality for completed items

**Non-Goals:**
- No changes to the todo data model or API
- No changes to cross-quadrant drag-and-drop behavior
- No persistence of collapse state (resets on page reload)

## Decisions

### 1. Single unified list structure
**Decision:** Combine uncompleted and completed todos into a single list with a collapsible section marker.

**Rationale:** Simplifies the scroll container - all todos share one scrollable area. The collapsible section acts as a visual separator without creating separate scroll regions.

**Alternative Considered:** Keep two separate lists with a shared scroll parent - rejected because it adds complexity without benefit.

### 2. Local component state for collapse
**Decision:** Use `ref<boolean>` within Quadrant.vue to track collapse state.

**Rationale:** No need for global state or persistence. Each quadrant maintains its own collapse state independently.

**Alternative Considered:** Global state in Pinia store - rejected as unnecessary complexity.

### 3. Collapse button icon
**Decision:** Use ChevronDown/ChevronUp from lucide-vue-next.

**Rationale:** Consistent with Vue ecosystem patterns, already available in project dependencies.

### 4. Flex container for proper scrolling
**Decision:** Use flex-shrink-0 on the uncompleted todos container to prevent it from expanding and pushing completed items out of the scrollable area.

**Rationale:** Without flex-shrink-0, the flex container will distribute available space to uncompleted todos, causing completed items to overlap with uncompleted items when expanded. Using flex-shrink-0 ensures uncompleted todos maintain their natural height and completed items can properly scroll into view.

**Alternative Considered:** Set fixed height on uncompleted section - rejected because it doesn't adapt to content.

## Risks / Trade-offs

- [Risk] User may lose track of completed items if they never expand the section
  - [Mitigation] Display count in header (e.g., "已完成 (3)") so users know completed items exist

- [Risk] Drag-and-drop between completed and uncompleted sections
  - [Mitigation] The vuedraggable component handles this naturally - items can be reordered across the boundary

- [Risk] Animation/transition for expand/collapse
  - [Mitigation] Keep it simple with v-if/v-else first, add transition if time permits
