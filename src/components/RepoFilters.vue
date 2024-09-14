<template>
  <h2 class="text-l font-bold">Language(s)</h2>
  <hr class="mb-3 dark:border-gray-700" />
  <LanguageSelector />

  <h2 class="text-l font-bold mt-6">Filters</h2>
  <hr class="mb-3 dark:border-gray-700" />

  <div class="mt-6">
    <FilterInput
      v-model="filters.minStars"
      :type="'text'"
      :label="'Min stars'"
      :placeholder="'Minimum number of repo stars'"
    />
  </div>

  <div class="mt-6">
    <FilterInput
      v-model="filters.fromDate"
      :type="'date'"
      :label="'From (use the date picker)'"
    />
  </div>

  <div class="mt-6">
    <FilterInput
      v-model="filters.toDate"
      :type="'date'"
      :label="'To (use the date picker)'"
    />
  </div>

  <div class="mt-6">
    <button
      type="button"
      class="w-full h-10 rounded text-sm bg-blue-900 active:bg-blue-800 px-3"
      @click="handleFiltersChange"
    >
      Apply Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from './inputs/LanguageSelector.vue'
import FilterInput from './inputs/FilterInput.vue'
import { updateFilters, type RepoFilters } from '@/stores/filters.store'
import { ref, type Ref } from 'vue'

const filters: Ref<RepoFilters> = ref({
  minStars: '',
  fromDate: '',
  toDate: ''
})

const validateFilters = (filters: RepoFilters) => {
  // TODO: More validations to be added
  return {
    ...filters,
    minStars: /^[0-9]*$/.test(filters.minStars) ? filters.minStars : ''
  }
}

const handleFiltersChange = () => {
  updateFilters({ ...validateFilters(filters.value) })
}
</script>
