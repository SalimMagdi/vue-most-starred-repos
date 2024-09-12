<template>
  <div v-if="!languages.length" class="p-4 text-center w-full">
    Please select at least one programming language.
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
import LanguageRepos from './LanguageRepos.vue';
import { filters } from '@/stores/filters-store';
import { watch } from 'vue';

interface ComponentData {
  languages: string[];
  controller: AbortController;
}

export default {
  components: { LanguageRepos },
  data() {
    const data: ComponentData = {
      languages: [],
      controller: new AbortController()
    };

    return data;
  },
  mounted() {
    watch(filters, () => this.setLanguages());
  },
  methods: {
    setLanguages() {
      this.languages = filters.value.languages;
    }
  }
};
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
