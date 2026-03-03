<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useTodoStore } from '@/stores/todoStore'
import { ArrowLeft, Save, Download, Upload } from 'lucide-vue-next'
import { exportApi } from '@/api/exportApi'
import { importApi, type ImportMode } from '@/api/importApi'
import ImportModeDialog from './ImportModeDialog.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const settingsStore = useSettingsStore()
const todoStore = useTodoStore()
const sloganInput = ref('')

const showImportDialog = ref(false)
const isExporting = ref(false)
const isImporting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

onMounted(() => {
  sloganInput.value = settingsStore.customSlogan
})

const handleSave = () => {
  settingsStore.setCustomSlogan(sloganInput.value.trim())
}

const handleClose = () => {
  emit('close')
}

const handleExport = async () => {
  isExporting.value = true
  try {
    const success = await exportApi.exportAll()
    if (success) {
      showMessage('导出成功', 'success')
    }
    // 用户取消时，静默返回，不显示任何消息
  } catch (error) {
    console.error('Export failed:', error)
    showMessage((error as Error).message, 'error')
  } finally {
    isExporting.value = false
  }
}

const handleImportClick = () => {
  showImportDialog.value = true
}

const handleImportModeSelect = async (mode: ImportMode) => {
  showImportDialog.value = false
  isImporting.value = true
  try {
    const count = await importApi.importAll(mode)
    // 用户取消时，静默返回，不显示任何消息
    if (count === -1) {
      isImporting.value = false
      return
    }
    await todoStore.fetchTodos()
    showMessage(`成功导入 ${count} 个待办`, 'success')
  } catch (error) {
    console.error('Import failed:', error)
    showMessage((error as Error).message, 'error')
  } finally {
    isImporting.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
      <button
        class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        @click="handleClose"
      >
        <ArrowLeft class="w-5 h-5" />
      </button>
      <h1 class="text-base font-semibold text-gray-800 dark:text-gray-100">设置</h1>
    </header>

    <!-- Content -->
    <main class="flex-1 p-4 overflow-auto">
      <div class="max-w-md mx-auto space-y-6">
        <!-- Custom Slogan Section -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h2 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">自定义顶栏文字</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            设置顶栏左侧显示的文字，可以是格言、座右铭等
          </p>
          <input
            v-model="sloganInput"
            type="text"
            class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="输入你的自定义文字"
          />
          <div class="mt-3 flex justify-end">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              @click="handleSave"
            >
              <Save class="w-4 h-4" />
              保存
            </button>
          </div>
        </div>

        <!-- Data Import/Export Section -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h2 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">数据导入导出</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            导出或导入所有待办数据和关联文档
          </p>
          <div class="flex gap-2">
            <button
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
              :disabled="isExporting"
              @click="handleExport"
            >
              <Download class="w-4 h-4" />
              {{ isExporting ? '导出中...' : '导出' }}
            </button>
            <button
              class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
              :disabled="isImporting"
              @click="handleImportClick"
            >
              <Upload class="w-4 h-4" />
              {{ isImporting ? '导入中...' : '导入' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Message -->
      <div
        v-if="message"
        class="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-sm text-white"
        :class="messageType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ message }}
      </div>
    </main>

    <ImportModeDialog
      :show="showImportDialog"
      @close="showImportDialog = false"
      @select="handleImportModeSelect"
    />
  </div>
</template>
