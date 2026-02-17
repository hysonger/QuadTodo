<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import Quadrant from './Quadrant.vue'
import type { QuadrantType, Todo } from '@/types'

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()

// Track newly created todo ID for auto-focus
const newTodoId = ref<string | null>(null)

// Wrap getTodosByQuadrant to mark new todo with isNew flag
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
  // Create a new todo in the same quadrant
  handleCreate(quadrant)
}

const handleReorder = (quadrant: QuadrantType, todos: Todo[], isSameQuadrant: boolean = true) => {
  // Update order for all items
  const updates = todos.map((todo, index) => ({
    id: todo.id,
    order: index,
    // Only update quadrant flags when moving between quadrants
    ...(isSameQuadrant ? {} : {
      isUrgent: quadrant === 'q1' || quadrant === 'q2',
      isImportant: quadrant === 'q1' || quadrant === 'q3',
    })
  }))
  todoStore.reorderTodos(updates)
}
</script>

<template>
  <div class="quadrant-grid h-full">
    <Quadrant
      v-for="config in settingsStore.quadrants"
      :key="config.type"
      :config="config"
      :todos="getTodosWithNewFlag(config.type)"
      @update="todoStore.updateTodoContent"
      @toggle="todoStore.toggleTodoComplete"
      @delete="todoStore.deleteTodo"
      @create="handleCreate"
      @create-next="handleCreateNext"
      @reorder="handleReorder"
    />
  </div>
</template>
