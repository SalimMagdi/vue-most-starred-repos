<template>
  <div class="text-sm mb-1 flex justify-between">
    <span>Min number of stars</span>

    <CloseIcon v-if="minStars" class="w-4 cursor-normal" @click="resetMinStars" />
  </div>

  <input
    v-model="minStars"
    type="number"
    placeholder="Enter min number of stars"
    class="border w-full h-10 rounded text-sm dark:bg-gray-700 dark:border-gray-700 px-3"
    @blur="handleMinStarsUpdate"
  />
</template>

<script lang="ts">
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { updateFilters } from '@/stores/filters.store'
import { ref, type Ref } from 'vue'

export default {
  components: { CloseIcon },
  setup() {
    const minStars: Ref<number | null> = ref(null)

    const handleMinStarsUpdate = () => {
      if (isNaN(minStars.value as number)) {
        minStars.value = null
      } else {
        updateStore()
      }
    }

    const resetMinStars = () => {
      minStars.value = null
      updateFilters({ minStars: null })
    }

    const updateStore = () => {
      updateFilters({ minStars: minStars.value })
    }

    return { minStars, handleMinStarsUpdate, resetMinStars }
  }
}
</script>
