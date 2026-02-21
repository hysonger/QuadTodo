## ADDED Requirements

### Requirement: Collapsible completed todo section
Each quadrant SHALL display completed todo items in a collapsible section positioned after all uncompleted todos within that quadrant.

#### Scenario: Default collapsed state
- **WHEN** a quadrant contains completed todo items
- **THEN** the completed section SHALL be collapsed by default, hiding all completed items

#### Scenario: Expand completed section
- **WHEN** user clicks the collapse/expand button on the completed header
- **THEN** the completed items SHALL become visible if hidden, or hidden if visible

#### Scenario: Completed section header displays count
- **WHEN** a quadrant has completed todo items
- **THEN** the completed header SHALL display the count of completed items (e.g., "已完成 (3)")

### Requirement: Completed section layout
The completed todo section SHALL include a header row with the title "已完成" and a collapse/expand button positioned on the right side.

#### Scenario: Collapse button position
- **WHEN** the completed section header is rendered
- **THEN** the collapse button SHALL be positioned on the far right of the header row

#### Scenario: Visual indication of collapsed state
- **WHEN** the completed section is collapsed
- **THEN** a visual indicator (e.g., chevron pointing down) SHALL show that items are hidden

#### Scenario: Visual indication of expanded state
- **WHEN** the completed section is expanded
- **THEN** a visual indicator (e.g., chevron pointing up) SHALL show that items are visible

### Requirement: Scrolling behavior
Completed todo items SHALL scroll together with uncompleted todos within the same quadrant container.

#### Scenario: Scroll with uncompleted items
- **WHEN** user scrolls down in a quadrant's todo list
- **THEN** completed items (when expanded) SHALL scroll up and eventually become hidden as the user scrolls further

#### Scenario: No separate scroll for completed
- **WHEN** completed items are in a quadrant
- **THEN** there SHALL NOT be a separate scrollable container for completed items - they share the same scroll container with uncompleted items

### Requirement: Layout containment
The uncompleted todo section SHALL NOT expand to fill available space in a way that causes overlap with completed items.

#### Scenario: Uncompleted items don't push completed out of view
- **WHEN** there are many uncompleted todos and the user expands the completed section
- **THEN** completed items SHALL appear below uncompleted items within the same scrollable area without forcing uncompleted items out of the viewport

#### Scenario: Proper flex sizing
- **WHEN** both uncompleted and completed sections are rendered
- **THEN** uncompleted todos SHALL use flex-shrink-0 to maintain their natural height, allowing completed items to scroll into view
