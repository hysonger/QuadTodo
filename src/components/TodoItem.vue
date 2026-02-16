<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { Check, Trash2, GripVertical } from 'lucide-vue-next'
import type { Todo } from '@/types'
import IconButton from './common/IconButton.vue'

interface Props {
  todo: Todo
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', id: string, content: string): void
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
  (e: 'createNext'): void
}>()

// State
const isEditing = ref(false)
const editContent = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Watch for external updates
watch(() => props.todo.content, (newContent) => {
  if (!isEditing.value) {
    editContent.value = newContent
  }
})

// Methods
const startEditing = () => {
  if (props.todo.isCompleted) return
  isEditing.value = true
  editContent.value = props.todo.content
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

const saveEdit = () => {
  const trimmed = editContent.value.trim()
  if (trimmed === '') {
    emit('delete', props.todo.id)
  } else if (trimmed !== props.todo.content) {
    emit('update', props.todo.id, trimmed)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  editContent.value = props.todo.content
  isEditing.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const trimmed = editContent.value.trim()
    if (trimmed === '') {
      emit('delete', props.todo.id)
    } else {
      saveEdit()
      emit('createNext')
    }
  } else if (e.key === 'Escape') {
    cancelEdit()
  }
}

const handleBlur = () => {
  setTimeout(() => {
    saveEdit()
  }, 100)
}

const handleCheckboxChange = () => {
  emit('toggle', props.todo.id)
}

const handleDelete = () => {
  emit('delete', props.todo.id)
}
</script>

<template>
  <div
    class="group flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 bg-white hover:bg-gray-50"
    :class="{
      'bg-gray-50': todo.isCompleted,
    }"
  >
    <!-- Drag Handle -->
    <div
      class="drag-handle text-gray-300 cursor-grab active:cursor-grabbing"
      :class="{ 'opacity-0': isEditing }"
    >
      <GripVertical class="w-3 h-3" />
    </div>

    <!-- Checkbox -->
    <button
      class="flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors duration-200"
      :class="{
        'border-gray-300 hover:border-blue-400': !todo.isCompleted,
        'bg-blue-500 border-blue-500': todo.isCompleted,
      }"
      @click="handleCheckboxChange"
    >
      <Check
        v-if="todo.isCompleted"
        class="w-2.5 h-2.5 text-white"
      />
    </button>

    <!-- Content - Editing -->
    <input
      v-if="isEditing"
      ref="inputRef"
      v-model="editContent"
      type="text"
      class="flex-1 px-2 py-1 text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />

    <!-- Content - Display -->
    <div
      v-else
      class="flex-1 min-w-0 px-2 py-1 text-sm cursor-text select-none"
      :class="{
        'text-gray-400 line-through': todo.isCompleted,
        'text-gray-700': !todo.isCompleted,
      }"
      @click="startEditing"
    >
      {{ todo.content }}
    </div>

    <!-- Delete Button -->
    <IconButton
      variant="danger"
      size="sm"
      class="opacity-0 group-hover:opacity-100 transition-opacity !p-0.5"
      :class="{ 'opacity-100': isEditing }"
      @click="handleDelete"
    >
      <Trash2 class="w-3 h-3" />
    </IconButton>
  </div>
</template>

<style scoped>
.drag-handle {
  opacity: 0;
  transition: opacity 0.2s;
}

.group:hover .drag-handle {
  opacity: 1;
}
</style>
