import { ref } from 'vue';

interface RepoFilters {
  languages: string[];
  minStars: string | null;
  fromDate: string | null;
  toDate: string | null;
}

export const filters = ref(<RepoFilters>{
  languages: [],
  minStars: null,
  fromDate: null,
  toDate: null
});

export const updateFilters = (updatedFilters: { [key: string]: unknown }) => {
  filters.value = {
    ...filters.value,
    ...updatedFilters
  };
};

export default { updateFilters, filters };
