<template>
  <div class="flex flex-wrap gap-3 mb-4">
    <div
      v-for="language in selectedLanguages"
      :key="language"
      class="flex gap-4 py-1 px-3 rounded bg-blue-800 text-white"
    >
      {{ language }}

      <CloseIcon
        class="w-4 cursor-normal"
        @click="() => handleLanguageRemoval(language)"
      />
    </div>
  </div>

  <select
    v-model="model"
    @change="handleLanguageSelection"
    class="border w-full h-10 rounded text-sm dark:bg-gray-700 dark:border-gray-700 px-3"
  >
    <option
      value="null"
      disabled
      selected
    >
      Select a language
    </option>
    <option
      v-for="option in allLanguages"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import LANGUAGES from '@/utils/languages'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { updateLanguages } from '@/stores/selected-languages.store'
import { ref, type Ref } from 'vue'

const selectedLanguages: Ref<string[]> = ref([])
const model: Ref<string | null> = ref(null)
const allLanguages: string[] = LANGUAGES

const handleLanguageSelection = () => {
  if (selectedLanguages.value.includes(model.value as string)) {
    return
  }

  selectedLanguages.value.push(model.value as string)
  model.value = null
  updateStore()
}

const handleLanguageRemoval = (language: string) => {
  selectedLanguages.value = selectedLanguages.value.filter((lang) => lang !== language)
  updateStore()
}

const updateStore = () => {
  updateLanguages(selectedLanguages.value)
}
</script>
