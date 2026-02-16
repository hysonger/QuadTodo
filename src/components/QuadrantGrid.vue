<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import Quadrant from './Quadrant.vue'
import type { QuadrantType, Todo } from '@/types'

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()

const handleCreate = (quadrant: QuadrantType) => {
  const isUrgent = quadrant === 'q1' || quadrant === 'q2'
  const isImportant = quadrant === 'q1' || quadrant === 'q3'
  todoStore.addTodo({
    content: '',
    isUrgent,
    isImportant,
  })
}

const handleCreateNext = (quadrant: QuadrantType) => {
  // Create a new todo in the same quadrant
  handleCreate(quadrant)
}

const handleReorder = (quadrant: QuadrantType, todos: Todo[]) => {
  // Update order for all items
  const updates = todos.map((todo, index) => ({
    id: todo.id,
    order: index,
    isUrgent: quadrant === 'q1' || quadrant === 'q2',
    isImportant: quadrant === 'q1' || quadrant === 'q3',
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
      :todos="todoStore.getTodosByQuadrant(config.type)"
      @update="todoStore.updateTodoContent"
      @toggle="todoStore.toggleTodoComplete"
      @delete="todoStore.deleteTodo"
      @create="handleCreate"
      @create-next="handleCreateNext"
      @reorder="handleReorder"
    />
  </div>
</template>
