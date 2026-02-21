## 1. Component State Setup

- [x] 1.1 Add `isCompletedExpanded` ref to Quadrant.vue with default value `false`
- [x] 1.2 Add toggle function to flip the collapse state

## 2. Header UI Implementation

- [x] 2.1 Add ChevronDown/ChevronUp icons import from lucide-vue-next
- [x] 2.2 Create completed section header with "已完成 (count)" text
- [x] 2.3 Position collapse toggle button on right side of header
- [x] 2.4 Show ChevronDown when collapsed, ChevronUp when expanded

## 3. List Rendering Changes

- [x] 3.1 Remove fixed completed section from below TodoList
- [x] 3.2 Add conditional rendering (v-if) for completed items below uncompleted TodoList
- [x] 3.3 Apply v-show or v-if to control visibility based on `isCompletedExpanded` state

## 4. Layout Integration

- [x] 4.1 Verify completed items scroll together with uncompleted items
- [x] 4.2 Ensure drag-and-drop works across the completed section boundary
- [x] 4.3 Test that empty completed section (0 items) shows nothing
- [x] 4.4 Fix flex layout to prevent overlap (add flex-shrink-0)

## 5. Verification

- [x] 5.1 Run typecheck (`npm run build` should pass)
- [x] 5.2 Verify default collapsed state on page load
- [x] 5.3 Verify expand/collapse button toggles visibility
- [x] 5.4 Verify completed count displays correctly
- [x] 5.5 Verify no overlap between uncompleted and completed items when expanded
