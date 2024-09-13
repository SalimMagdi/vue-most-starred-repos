import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import LanguageSelector from '@/components/inputs/LanguageSelector.vue'
import LANGUAGES from '@/utils/languages'
import { updateFilters } from '@/stores/filters.store'

// Mocking updateFilters to avoid actual store update
vi.mock('@/stores/filters-store', () => ({
  updateFilters: vi.fn()
}))

describe('LanguageSelector.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(LanguageSelector)
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    // Check if the correct number of options are rendered
    const options = wrapper.findAll('option')
    expect(options.length).toBe(LANGUAGES.length + 1) // Including the "Select a language" option
  })

  it('adds a language when selected from the dropdown', async () => {
    const language = LANGUAGES[0]

    // Simulate selecting a language
    await wrapper.setData({ model: language })
    await wrapper.vm.handleLanguageSelection()

    expect(wrapper.vm.selectedLanguages).toContain(language)
    expect(wrapper.vm.model).toBeNull()
    expect(updateFilters).toHaveBeenCalledWith({ languages: [language] })
  })

  it('does not add a language if it is already selected', async () => {
    const language = LANGUAGES[0]

    // Set selected language in data
    await wrapper.setData({ selectedLanguages: [language], model: language })
    await wrapper.vm.handleLanguageSelection()

    expect(wrapper.vm.selectedLanguages).toHaveLength(1) // Language shouldn't be added again
    expect(updateFilters).toHaveBeenCalledWith({ languages: [language] })
  })

  it('removes a language when the close icon is clicked', async () => {
    const language = LANGUAGES[0]

    // Set initial state
    await wrapper.setData({ selectedLanguages: [language] })

    // Simulate language removal
    await wrapper.vm.handleLanguageRemoval(language)

    expect(wrapper.vm.selectedLanguages).not.toContain(language)
    expect(updateFilters).toHaveBeenCalledWith({ languages: [] })
  })

  it('renders selected languages with close buttons', async () => {
    const language = LANGUAGES[0]

    // Set initial state
    await wrapper.setData({ selectedLanguages: [language] })

    // Check if the selected language is rendered with the correct class
    const languageDiv = wrapper.find('.bg-blue-800')
    expect(languageDiv.exists()).toBe(true)
    expect(languageDiv.text()).toContain(language)
  })
})
