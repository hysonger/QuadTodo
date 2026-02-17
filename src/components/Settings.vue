<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { ArrowLeft, Save } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const settingsStore = useSettingsStore()
const sloganInput = ref('')

onMounted(() => {
  sloganInput.value = settingsStore.customSlogan
})

const handleSave = () => {
  settingsStore.setCustomSlogan(sloganInput.value.trim())
}

const handleClose = () => {
  emit('close')
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
      </div>
    </main>
  </div>
</template>
