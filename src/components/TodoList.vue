<script setup lang="ts">
import { computed } from 'vue'
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
  (e: 'reorder', todos: Todo[]): void
}>()

const sortedTodos = computed({
  get: () => [...props.todos].sort((a, b) => a.order - b.order),
  set: (value) => {
    emit('reorder', value)
  }
})

const handleCreateNext = () => {
  emit('createNext', props.quadrantType)
}

const handleChange = (evt: { added?: { element: Todo; newIndex: number }; moved?: { newIndex: number; oldIndex: number } }) => {
  if (evt.added) {
    // Item moved from another quadrant
    emit('reorder', sortedTodos.value)
  }
  if (evt.moved) {
    // Item moved within same quadrant
    emit('reorder', sortedTodos.value)
  }
}
</script>

<template>
  <draggable
    v-model="sortedTodos"
    item-key="id"
    group="todos"
    class="flex-1 flex flex-col gap-1 min-h-0 overflow-y-auto"
    ghost-class="ghost"
    drag-class="dragging"
    :data-quadrant="quadrantType"
    @change="handleChange"
  >
    <template #item="{ element }">
      <TodoItem
        :todo="element"
        @update="(id, content) => emit('update', id, content)"
        @toggle="(id) => emit('toggle', id)"
        @delete="(id) => emit('delete', id)"
        @create-next="handleCreateNext"
      />
    </template>
    <template #footer>
      <div
        v-if="todos.length === 0"
        class="flex-1 flex items-center justify-center text-gray-300 text-xs py-4 border border-dashed border-gray-200 rounded"
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

.dragging {
  opacity: 0.8;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
}
</style>
