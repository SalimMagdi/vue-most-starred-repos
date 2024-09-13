<template>
  <div
    v-if="!languages.length"
    class="p-4 text-center w-full flex flex-col justify-center items-center gap-4"
  >
    <CodeIcon class="w-32 h-32 opacity-60" />

    <span>Please select at least one programming language.</span>
  </div>

  <div
    v-for="language in languages"
    :key="language"
    class="mb-4 border rounded p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-800"
  >
    <div class="section-title text-l font-bold pb-1 border-b mb-3 dark:border-gray-700">
      {{ language }}
    </div>

    <div class="flex flex-wrap languages-wrapper">
      <LanguageRepos :language="language" />
    </div>
  </div>
</template>

<script lang="ts">
import { selectedLanguages } from '@/stores/selected-languages.store'
import CodeIcon from '../assets/icons/CodeIcon.vue'
import LanguageRepos from './LanguageRepos.vue'
import { watch } from 'vue'

interface ComponentData {
  languages: string[]
  controller: AbortController
}

export default {
  components: { LanguageRepos, CodeIcon },
  data() {
    const data: ComponentData = {
      languages: [],
      controller: new AbortController()
    }

    return data
  },
  mounted() {
    watch(selectedLanguages, () => this.setLanguages())
  },
  methods: {
    setLanguages() {
      this.languages = selectedLanguages.value
    }
  }
}
</script>

<style>
.languages-wrapper {
  gap: 12px;
}

.languages-wrapper > div:not(.w-full) {
  width: calc(33.333% - 8px);
}

@media only screen and (max-width: 1023px) {
  .languages-wrapper > div:not(.w-full) {
    width: 100%;
  }
}
</style>
