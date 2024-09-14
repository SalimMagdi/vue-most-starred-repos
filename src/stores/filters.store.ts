import { ref } from 'vue'

export interface RepoFilters {
  minStars: string
  fromDate: string
  toDate: string
}

export const filters = ref(<RepoFilters>{
  minStars: '',
  fromDate: '',
  toDate: ''
})

export const updateFilters = (updatedFilters: { [key: string]: unknown }) => {
  filters.value = {
    ...filters.value,
    ...updatedFilters
  }
}

export default { updateFilters, filters }
