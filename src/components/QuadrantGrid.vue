<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import Quadrant from './Quadrant.vue'
import DocumentEditor from './DocumentEditor.vue'
import ConfirmDialog from './common/ConfirmDialog.vue'
import type { QuadrantType, Todo } from '@/types'

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()

const showDocumentEditor = ref(false)
const editingTodoId = ref<string | null>(null)

const showDeleteConfirm = ref(false)
const deleteTodoId = ref<string | null>(null)
const deleteTodoHasDocument = ref(false)

const showClearTextConfirm = ref(false)
const clearTextTodoId = ref<string | null>(null)
const clearTextTodoHasDocument = ref(false)

const newTodoId = ref<string | null>(null)

const getTodosWithNewFlag = (type: QuadrantType): Todo[] => {
  const todos = todoStore.getTodosByQuadrant(type)
  if (!newTodoId.value) return todos
  return todos.map(todo => ({
    ...todo,
    isNew: todo.id === newTodoId.value
  }))
}

const handleCreate = async (quadrant: QuadrantType) => {
  const isUrgent = quadrant === 'q1' || quadrant === 'q2'
  const isImportant = quadrant === 'q1' || quadrant === 'q3'
  const todo = await todoStore.addTodo({
    content: '',
    isUrgent,
    isImportant,
  })
  if (todo) {
    newTodoId.value = todo.id
  }
}

const handleCreateNext = (quadrant: QuadrantType) => {
  handleCreate(quadrant)
}

const handleReorder = (quadrant: QuadrantType, todos: Todo[], isSameQuadrant: boolean = true) => {
  const updates = todos.map((todo, index) => ({
    id: todo.id,
    order: index,
    ...(isSameQuadrant ? {} : {
      isUrgent: quadrant === 'q1' || quadrant === 'q2',
      isImportant: quadrant === 'q1' || quadrant === 'q3',
    })
  }))
  todoStore.reorderTodos(updates)
}

const handleDelete = (id: string) => {
  const todo = todoStore.getTodoById(id)
  if (todo?.hasDocument) {
    deleteTodoId.value = id
    deleteTodoHasDocument.value = true
    showDeleteConfirm.value = true
  } else {
    todoStore.deleteTodo(id)
  }
}

const confirmDelete = async () => {
  if (deleteTodoId.value) {
    await todoStore.deleteTodo(deleteTodoId.value)
  }
  showDeleteConfirm.value = false
  deleteTodoId.value = null
  deleteTodoHasDocument.value = false
}

const handleClearTextDelete = (id: string) => {
  const todo = todoStore.getTodoById(id)
  if (todo?.hasDocument) {
    clearTextTodoId.value = id
    clearTextTodoHasDocument.value = true
    showClearTextConfirm.value = true
  } else {
    todoStore.deleteTodo(id)
  }
}

const confirmClearText = async () => {
  if (clearTextTodoId.value) {
    await todoStore.deleteTodo(clearTextTodoId.value)
  }
  showClearTextConfirm.value = false
  clearTextTodoId.value = null
  clearTextTodoHasDocument.value = false
}

const handleOpenDocument = (id: string) => {
  editingTodoId.value = id
  showDocumentEditor.value = true
}

const handleCloseDocument = () => {
  showDocumentEditor.value = false
  editingTodoId.value = null
}

const handleUpdate = (id: string, content: string) => {
  if (!content.trim()) {
    handleClearTextDelete(id)
  } else {
    todoStore.updateTodoContent(id, content)
  }
}
</script>

<template>
  <div class="quadrant-grid h-full">
    <Quadrant
      v-for="config in settingsStore.quadrants"
      :key="config.type"
      :config="config"
      :todos="getTodosWithNewFlag(config.type)"
      :completed-todos="todoStore.getCompletedTodosByQuadrant(config.type)"
      @update="handleUpdate"
      @toggle="todoStore.toggleTodoComplete"
      @delete="handleDelete"
      @create="handleCreate"
      @create-next="handleCreateNext"
      @reorder="handleReorder"
      @open-document="handleOpenDocument"
    />

    <DocumentEditor
      v-if="showDocumentEditor && editingTodoId"
      :todo-id="editingTodoId"
      @close="handleCloseDocument"
    />

    <ConfirmDialog
      :show="showDeleteConfirm"
      title="删除待办"
      message="该待办项已关联文档，删除待办时文档也将被删除。"
      confirm-text="确认删除"
      cancel-text="取消"
      variant="danger"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <ConfirmDialog
      :show="showClearTextConfirm"
      title="清空待办内容"
      message="该待办项已关联文档，删除待办时文档也将被删除。"
      confirm-text="确认删除"
      cancel-text="取消"
      variant="danger"
      @confirm="confirmClearText"
      @cancel="showClearTextConfirm = false"
    />
  </div>
</template>
