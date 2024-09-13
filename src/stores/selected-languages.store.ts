import { ref, type Ref } from 'vue'

export const selectedLanguages: Ref<string[]> = ref([])

export const updateLanguages = (languages: string[]) => {
  selectedLanguages.value = languages
}

export default { updateLanguages, selectedLanguages }
