<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import type { Todo, QuadrantType } from '@/types'
import TodoItem from './TodoItem.vue'

interface Props {
  todos: Todo[]
  quadrantType: QuadrantType
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
  (e: 'createNext', quadrant: QuadrantType): void
  (e: 'reorder', todos: Todo[], isSameQuadrant: boolean): void
  (e: 'openDocument', id: string): void
}>()

// Local list for draggable (not using v-model to avoid conflicts)
const localList = ref<Todo[]>([])

// Sync local list with props
watch(
  () => props.todos,
  (newTodos) => {
    localList.value = [...newTodos].sort((a, b) => a.order - b.order)
  },
  { immediate: true, deep: true }
)

const handleCreateNext = () => {
  emit('createNext', props.quadrantType)
}

const handleChange = (evt: { added?: { element: Todo; newIndex: number }; moved?: { newIndex: number; oldIndex: number }; removed?: { element: Todo; oldIndex: number } }) => {
  if (evt.moved) {
    // Same-quadrant reordering
    emit('reorder', localList.value, true)
  } else if (evt.added) {
    // Item moved from another quadrant
    emit('reorder', localList.value, false)
  }
  // Note: evt.removed is handled by the source quadrant's localList update,
  // but we don't need to emit reorder for removals as the target quadrant handles it
}
</script>

<template>
  <draggable
    :list="localList"
    item-key="id"
    group="todos"
    class="flex flex-col gap-1 min-h-0"
    ghost-class="ghost"
    drag-class="dragging"
    :data-quadrant="quadrantType"
    @change="handleChange"
  >
    <template #item="{ element }">
      <TodoItem
        :key="element.id"
        :todo="element"
        @update="(id, content) => emit('update', id, content)"
        @toggle="(id) => emit('toggle', id)"
        @delete="(id) => emit('delete', id)"
        @create-next="handleCreateNext"
        @open-document="(id) => emit('openDocument', id)"
      />
    </template>
    <template #footer>
      <div
        v-if="todos.length === 0"
        class="flex-1 flex items-center justify-center text-gray-300 dark:text-gray-500 text-xs py-4 border border-dashed border-gray-200 dark:border-gray-600 rounded"
      >
        拖拽或点击添加
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background-color: #f3f4f6;
  border: 2px dashed #d1d5db;
}

.dark .ghost {
  background-color: #374151;
  border-color: #4b5563;
}

.dragging {
  opacity: 0.8;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
}

.dark .dragging {
  background-color: #1f2937;
}
</style>
