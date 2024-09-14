<template>
  <div class="text-sm mb-1 flex justify-between">
    <span v-text="label"></span>

    <CloseIcon
      v-if="model"
      class="w-4 cursor-normal"
      @click="resetModel"
    />
  </div>

  <input
    v-model.lazy="model"
    @keydown="($event) => (type === 'date' ? false : $event)"
    :type="type"
    :placeholder="placeholder"
    :class="{ 'border-red-400 text-red-400': hasErrors, 'dark:border-gray-700': !hasErrors }"
    class="border w-full h-10 rounded text-sm dark:bg-gray-700 px-3"
  />

  <span
    v-if="hasErrors"
    class="text-red-400"
  >
    Invalid input
  </span>
</template>

<script setup lang="ts">
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { computed } from 'vue'
import { defineModel } from 'vue'

const model = defineModel({ required: true, default: '' })

const { label, placeholder, type } = defineProps<{
  label: string
  placeholder?: string
  type: string
}>()

// Show error when not a date (i.e. min stars)
const hasErrors =
  type === 'date' ? false : computed(() => !/^[0-9]*$/.test(model.value as unknown as string))

const resetModel = () => {
  model.value = ''
}
</script>
