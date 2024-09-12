<template>
  <h2 class="text-l font-bold">Filters</h2>
  <hr class="mb-3 dark:border-gray-700" />
  <LanguageSelector />

  <div class="mt-6">
    <MinStarsInput />
  </div>

  <div class="mt-6">
    <DateInput
      :label="'From:'"
      @valueChange="($event) => handleDateChange('fromDate', $event)"
      @valueReset="() => handleDateReset('fromDate')"
    />
  </div>

  <div class="mt-6">
    <DateInput
      :label="'To:'"
      @valueChange="($event) => handleDateChange('toDate', $event)"
      @valueReset="() => handleDateReset('toDate')"
    />
  </div>
</template>

<script>
import LanguageSelector from './LanguageSelector.vue'
import MinStarsInput from './MinStarsInput.vue'
import DateInput from './DateInput.vue'
import { updateFilters } from '@/stores/filters-store'

export default {
  components: { LanguageSelector, MinStarsInput, DateInput },
  methods: {
    handleDateChange(action, event) {
      updateFilters({ [action]: event.target.value })
    },
    handleDateReset(action) {
      updateFilters({ [action]: null })
    }
  }
}
</script>
