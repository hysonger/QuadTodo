<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const buttonClass = computed(() => {
  const baseClasses: string[] = [
    'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
  ]
  
  if (props.variant === 'default' || props.variant === 'ghost') {
    baseClasses.push('bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-400')
  } else if (props.variant === 'danger') {
    baseClasses.push('bg-transparent text-red-500 hover:bg-red-50 hover:text-red-700 focus:ring-red-400')
  }
  
  if (props.size === 'sm') {
    baseClasses.push('p-1')
  } else if (props.size === 'md') {
    baseClasses.push('p-2')
  } else if (props.size === 'lg') {
    baseClasses.push('p-3')
  }
  
  if (props.class) {
    if (typeof props.class === 'string') {
      baseClasses.push(props.class)
    } else if (Array.isArray(props.class)) {
      props.class.forEach(cls => {
        if (typeof cls === 'string') {
          baseClasses.push(cls)
        } else if (typeof cls === 'object') {
          Object.entries(cls).forEach(([key, value]) => {
            if (value) baseClasses.push(key)
          })
        }
      })
    } else {
      Object.entries(props.class).forEach(([key, value]) => {
        if (value) baseClasses.push(key)
      })
    }
  }
  
  return baseClasses
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
