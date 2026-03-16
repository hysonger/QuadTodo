<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'quad-todo-editor-view-mode'
const VALID_MODES = ['edit', 'preview', 'split'] as const

import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { X, Eye, Columns, Loader2, Check } from 'lucide-vue-next'
import { marked } from 'marked'
import { useDebounceFn } from '@vueuse/core'
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import type { Extension } from '@codemirror/state'
import { openUrl } from '@tauri-apps/plugin-opener'

interface Props {
  todoId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()

const content = ref('')
const viewMode = ref<'edit' | 'preview' | 'split'>('edit')
const isSaving = ref(false)
const isLoading = ref(true)

const todo = computed(() => todoStore.getTodoById(props.todoId))

const renderedContent = computed(() => {
  if (!content.value) return ''
  return marked(content.value, { breaks: true })
})

const extensions = computed(() => {
  const exts: Extension[] = [markdown()]
  if (settingsStore.isDarkMode) {
    exts.push(oneDark)
  }
  return exts
})

const loadDocument = async () => {
  isLoading.value = true
  try {
    const existingContent = await todoStore.getDocument(props.todoId)
    content.value = existingContent
    if (!existingContent && todo.value && !todo.value.hasDocument) {
      await todoStore.createDocument(props.todoId, '')
    }
  } catch (err) {
    console.error('Failed to load document:', err)
  } finally {
    isLoading.value = false
  }
}

const saveDocument = useDebounceFn(async () => {
  if (!content.value && todo.value?.hasDocument) {
    return
  }
  isSaving.value = true
  try {
    await todoStore.updateDocument(props.todoId, content.value)
    if (!todo.value?.hasDocument) {
      await todoStore.updateTodo(props.todoId, { hasDocument: true })
    }
  } catch (err) {
    console.error('Failed to save document:', err)
  } finally {
    isSaving.value = false
  }
}, 500)

const handleChange = (value: string) => {
  content.value = value
  saveDocument()
}

const setViewMode = (mode: 'edit' | 'preview' | 'split') => {
  viewMode.value = mode
  localStorage.setItem(STORAGE_KEY, mode)
}

const handleClose = () => {
  emit('close')
}

const handlePreviewClick = async (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const link = target.closest('a')
  if (link) {
    event.preventDefault()
    const href = link.getAttribute('href')
    if (href) {
      try {
        await openUrl(href)
      } catch (err) {
        console.error('Failed to open URL:', err)
      }
    }
  }
}

onMounted(() => {
  const savedMode = localStorage.getItem(STORAGE_KEY)
  if (savedMode && VALID_MODES.includes(savedMode as typeof VALID_MODES[number])) {
    viewMode.value = savedMode as 'edit' | 'preview' | 'split'
  }
  loadDocument()
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-[1400px] w-full h-[85vh] flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate max-w-md">
            {{ todo?.content || 'Document' }}
          </h2>
          <Loader2
            v-if="isSaving"
            class="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin"
          />
          <Check
            v-else-if="!isSaving && content"
            class="w-4 h-4 text-green-500 dark:text-green-400"
          />
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
            <button
              class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors"
              :class="{
                'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow': viewMode === 'edit',
                'text-gray-600 dark:text-gray-400': viewMode !== 'edit',
              }"
              @click="setViewMode('edit')"
            >
              Edit
            </button>
            <button
              class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors"
              :class="{
                'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow': viewMode === 'split',
                'text-gray-600 dark:text-gray-400': viewMode !== 'split',
              }"
              @click="setViewMode('split')"
            >
              <Columns class="w-3 h-3" />
              Split
            </button>
            <button
              class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors"
              :class="{
                'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow': viewMode === 'preview',
                'text-gray-600 dark:text-gray-400': viewMode !== 'preview',
              }"
              @click="setViewMode('preview')"
            >
              <Eye class="w-3 h-3" />
              Preview
            </button>
          </div>
          <button
            class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            @click="handleClose"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-hidden flex">
        <div v-if="isLoading" class="flex items-center justify-center w-full h-full">
          <span class="text-gray-500 dark:text-gray-400">Loading...</span>
        </div>

        <template v-else>
          <div
            v-if="viewMode === 'edit' || viewMode === 'split'"
            class="flex flex-col overflow-hidden"
            :class="viewMode === 'split' ? 'w-1/2 border-r border-gray-200 dark:border-gray-700' : 'w-full'"
          >
            <Codemirror
              v-model="content"
              :style="{ height: '100%' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              @change="handleChange"
            />
          </div>

          <div
            v-if="viewMode === 'preview' || viewMode === 'split'"
            class="overflow-y-auto bg-white dark:bg-gray-900"
            :class="viewMode === 'split' ? 'w-1/2' : 'w-full'"
            @click="handlePreviewClick"
          >
            <div
              class="p-4 prose prose-sm dark:prose-invert max-w-none"
              v-html="renderedContent"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.cm-editor) {
  height: 100%;
  font-size: 14px;
}

:deep(.cm-editor.cm-focused) {
  outline: none;
}

:deep(.cm-scroller) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

:deep(.cm-content) {
  padding: 16px;
}

:deep(.cm-gutters) {
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
}

:global(.dark) :deep(.cm-gutters) {
  background-color: #1f2937;
  border-right: 1px solid #374151;
}
</style>
