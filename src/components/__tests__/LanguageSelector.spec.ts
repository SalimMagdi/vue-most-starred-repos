import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import LanguageSelector from '@/components/inputs/LanguageSelector.vue'
import LANGUAGES from '@/utils/languages'
import { nextTick } from 'vue'
import { updateLanguages } from '@/stores/selected-languages.store'

// Mocking updateLanguages to avoid actual store update
vi.mock('@/stores/selected-languages.store', () => ({
  updateLanguages: vi.fn()
}))

describe('LanguageSelector.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(LanguageSelector)
    vi.clearAllMocks()
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
    wrapper.vm.model = language
    await nextTick()
    await wrapper.vm.handleLanguageSelection()

    expect(wrapper.vm.selectedLanguages).toContain(language)
    expect(wrapper.vm.model).toBeNull()
    expect(updateLanguages).toHaveBeenCalledWith([language])
  })

  it('does not add a language if it is already selected', async () => {
    const language = LANGUAGES[0]

    // Modify reactive properties to simulate state
    wrapper.vm.selectedLanguages = [language]
    wrapper.vm.model = language
    await nextTick()
    await wrapper.vm.handleLanguageSelection()

    expect(wrapper.vm.selectedLanguages).toHaveLength(1) // Language shouldn't be added again
    expect(updateLanguages).not.toHaveBeenCalled()
  })

  it('removes a language when the close icon is clicked', async () => {
    const language = LANGUAGES[0]

    // Modify reactive properties to simulate state
    wrapper.vm.selectedLanguages = [language]
    await nextTick()

    // Simulate language removal
    await wrapper.vm.handleLanguageRemoval(language)

    expect(wrapper.vm.selectedLanguages).not.toContain(language)
    expect(updateLanguages).toHaveBeenCalledWith([])
  })
})
