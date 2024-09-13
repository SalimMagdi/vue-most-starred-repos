<template>
  <div class="flex flex-wrap gap-3 mb-4">
    <div
      v-for="language in selectedLanguages"
      :key="language"
      class="flex gap-4 py-1 px-3 rounded bg-blue-800 text-white"
    >
      {{ language }}

      <CloseIcon class="w-4 cursor-normal" @click="() => handleLanguageRemoval(language)" />
    </div>
  </div>

  <select
    v-model="model"
    @change="handleLanguageSelection"
    class="border w-full h-10 rounded text-sm dark:bg-gray-700 dark:border-gray-700 px-3"
  >
    <option value="null" disabled selected>Select a language</option>
    <option v-for="option in LANGUAGES" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script lang="ts">
import LANGUAGES from '@/utils/languages'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { updateLanguages } from '@/stores/selected-languages.store'

interface ComponentData {
  selectedLanguages: string[]
  model: string | null
  LANGUAGES: string[]
}

export default {
  components: { CloseIcon },
  data() {
    const data: ComponentData = {
      selectedLanguages: [],
      model: null,
      LANGUAGES
    }

    return data
  },
  methods: {
    handleLanguageSelection() {
      !this.selectedLanguages.includes(this.model as string) &&
        this.selectedLanguages.push(this.model as string)
      this.model = null
      this.updateStore()
    },
    handleLanguageRemoval(language: string) {
      this.selectedLanguages = this.selectedLanguages.filter((lang) => lang !== language)
      this.updateStore()
    },
    updateStore() {
      updateLanguages(this.selectedLanguages)
    }
  }
}
</script>
