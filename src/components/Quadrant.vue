<script setup lang="ts">
import { computed } from 'vue'
import type { QuadrantType, Todo, QuadrantConfig } from '@/types'
import TodoList from './TodoList.vue'
import { Plus } from 'lucide-vue-next'
import Button from './common/Button.vue'

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
  (e: 'reorder', quadrant: QuadrantType, todos: Todo[]): void
}>()

const todoCount = computed(() => props.todos.length)

const handleCreate = () => {
  emit('create', props.config.type)
}

const handleCreateNext = (quadrant: QuadrantType) => {
  emit('createNext', quadrant)
}

const handleReorder = (todos: Todo[]) => {
  emit('reorder', props.config.type, todos)
}
</script>

<template>
  <div
    class="quadrant flex flex-col h-full overflow-hidden"
    :class="[config.bgColor]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-3 pb-2 border-b-2" :class="[config.borderColor]">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-base" :class="[config.textColor]">
          {{ config.title }}
        </h3>
        <span
          class="px-2 py-0.5 text-xs font-medium rounded-full bg-white"
          :class="[config.textColor]"
        >
          {{ todoCount }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-500">{{ config.subtitle }}</span>
        <Button
          variant="ghost"
          size="sm"
          class="!p-1"
          @click="handleCreate"
        >
          <Plus class="w-4 h-4" />
        </Button>
      </div>
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
