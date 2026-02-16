<script setup lang="ts">
import { computed } from 'vue'
import type { QuadrantType, Todo, QuadrantConfig } from '@/types'
import TodoList from './TodoList.vue'
import { Plus } from 'lucide-vue-next'
import IconButton from './common/IconButton.vue'

interface Props {
  config: QuadrantConfig
  todos: Todo[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
  (e: 'create', quadrant: QuadrantType): void
  (e: 'createNext', quadrant: QuadrantType): void
  (e: 'reorder', quadrant: QuadrantType, todos: Todo[], isSameQuadrant: boolean): void
}>()

const todoCount = computed(() => props.todos.length)

// Compute dark mode classes based on quadrant type
const darkBgClass = computed(() => {
  const map: Record<string, string> = {
    q1: 'dark:bg-q1-dark-bg',
    q2: 'dark:bg-q2-dark-bg',
    q3: 'dark:bg-q3-dark-bg',
    q4: 'dark:bg-q4-dark-bg',
  }
  return map[props.config.type] || ''
})

const darkBorderClass = computed(() => {
  const map: Record<string, string> = {
    q1: 'dark:border-q1-dark-border',
    q2: 'dark:border-q2-dark-border',
    q3: 'dark:border-q3-dark-border',
    q4: 'dark:border-q4-dark-border',
  }
  return map[props.config.type] || ''
})

const darkTextClass = computed(() => {
  const map: Record<string, string> = {
    q1: 'dark:text-q1-dark-text',
    q2: 'dark:text-q2-dark-text',
    q3: 'dark:text-q3-dark-text',
    q4: 'dark:text-q4-dark-text',
  }
  return map[props.config.type] || ''
})

const handleCreate = () => {
  emit('create', props.config.type)
}

const handleCreateNext = (quadrant: QuadrantType) => {
  emit('createNext', quadrant)
}

const handleReorder = (todos: Todo[], isSameQuadrant: boolean = true) => {
  emit('reorder', props.config.type, todos, isSameQuadrant)
}
</script>

<template>
  <div
    class="quadrant flex flex-col h-full overflow-hidden"
    :class="[config.bgColor, darkBgClass]"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between mb-2 pb-1.5 border-b-2"
      :class="[config.borderColor, darkBorderClass]"
    >
      <div class="flex items-center gap-1.5">
        <h3
          class="font-semibold text-sm"
          :class="[config.textColor, darkTextClass]"
        >
          {{ config.title }}
        </h3>
        <span
          class="px-1.5 py-0 text-[10px] font-medium rounded-full bg-white dark:bg-gray-700"
          :class="[config.textColor, darkTextClass]"
        >
          {{ todoCount }}
        </span>
      </div>
      <IconButton
        variant="ghost"
        size="sm"
        class="!p-0.5"
        @click="handleCreate"
      >
        <Plus class="w-3.5 h-3.5" />
      </IconButton>
    </div>

    <!-- Todo List -->
    <TodoList
      :todos="todos"
      :quadrant-type="config.type"
      @update="(id, content) => emit('update', id, content)"
      @toggle="(id) => emit('toggle', id)"
      @delete="(id) => emit('delete', id)"
      @create-next="handleCreateNext"
      @reorder="handleReorder"
    />
  </div>
</template>
