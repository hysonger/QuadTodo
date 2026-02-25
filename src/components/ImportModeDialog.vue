<script setup lang="ts">
import { ref } from 'vue'
import type { ImportMode } from '@/api/importApi'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', mode: ImportMode): void
}>()

const selectedMode = ref<ImportMode>('merge')

const modes: { value: ImportMode; label: string; description: string }[] = [
  { value: 'merge', label: '合并', description: '保留本地待办，添加导入的新待办' },
  { value: 'replace', label: '替换', description: '清空本地数据，导入全部数据' },
  { value: 'incremental', label: '增量', description: '相同 ID 覆盖，不同 ID 保留本地 + 添加新导入' },
]

const handleConfirm = () => {
  emit('select', selectedMode.value)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">选择导入模式</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">请选择如何处理现有数据</p>
        </div>

        <div class="p-4 space-y-3">
          <label
            v-for="mode in modes"
            :key="mode.value"
            class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
            :class="selectedMode === mode.value
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
          >
            <input
              v-model="selectedMode"
              type="radio"
              :value="mode.value"
              class="mt-0.5"
            />
            <div>
              <div class="text-sm font-medium text-gray-800 dark:text-gray-100">{{ mode.label }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ mode.description }}</div>
            </div>
          </label>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <button
            class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            @click="emit('close')"
          >
            取消
          </button>
          <button
            class="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            @click="handleConfirm"
          >
            确认导入
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
