## ADDED Requirements

### Requirement: ESC key preserves non-empty todo content
当用户在待办项编辑模式下按下 ESC 键时，如果待办项原始内容非空，系统 SHALL 保留原始内容并退出编辑模式。

#### Scenario: ESC preserves non-empty content
- **WHEN** 用户点击进入非空待办项的编辑模式，然后按下 ESC 键
- **THEN** 待办项内容保留为原始内容，退出编辑模式

#### Scenario: ESC cancels changes to non-empty content
- **WHEN** 用户修改了待办项内容但未保存，然后按下 ESC 键
- **THEN** 修改被撤销，内容恢复为原始内容，退出编辑模式

### Requirement: ESC key deletes empty todos
当用户在待办项编辑模式下按下 ESC 键时，如果待办项原始内容为空，系统 SHALL 删除该待办项。

#### Scenario: ESC deletes empty todo
- **WHEN** 用户创建新待办项（内容为空）并进入编辑模式，然后按下 ESC 键
- **THEN** 该空待办项被删除

#### Scenario: ESC on newly typed empty todo deletes it
- **WHEN** 用户进入待办项编辑模式，清空所有内容（未按 Enter），然后按下 ESC 键
- **THEN** 如果原始内容非空，内容保留但退出编辑模式；如果原始内容为空，待办项被删除
