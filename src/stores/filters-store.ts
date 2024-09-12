import { ref } from 'vue'

export const filters = ref({
  languages: [],
  minStart: null,
  fromDate: null,
  ToDate: null
})

export const updateFilters = (updatedFilters: { [key: string]: unknown }) => {
  filters.value = {
    ...filters.value,
    ...updatedFilters
  }
}

export default { updateFilters, filters }
