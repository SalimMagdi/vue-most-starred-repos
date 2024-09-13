<template>
  <div class="container px-3 mx-auto sticky z-50 top-0">
    <div
      id="dark-mode-toggle"
      class="flex justify-between items-center py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-900"
    >
      <h1 class="text-3xl font-bold">Most Starred Repos</h1>

      <DarkModeToggle />
    </div>
  </div>

  <div id="main-wrapper"
class="flex flex-wrap sm:flex-nowrap min-h-screen container mx-auto px-3">
    <div
      id="filters-container"
      class="md:w-80 sm:w-60 w-full shrink-0 min-h-full w-2/6 border-r-0 sm:border-r dark:border-gray-700 pr-4 pl-4 sm:pl-0 py-6"
    >
      <RepoFilters />
    </div>

    <div id="results-container"
class="grow sm:pr-0 pr-4 pl-4 py-6">
      <h2 class="text-2xl mb-4">Search Results</h2>
      <hr class="mb-3 dark:border-gray-700" />

      <LanguagesWrapper />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguagesWrapper from '@/components/LanguagesWrapper.vue'
import RepoFilters from '@/components/RepoFilters.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
</script>
