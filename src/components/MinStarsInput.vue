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
    @change="handleMinStarsUpdate"
  />
</template>

<script lang="ts">
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { updateFilters } from '@/stores/filters-store';

interface ComponentData {
  minStars: number | null;
}

export default {
  components: { CloseIcon },
  data() {
    const data: ComponentData = {
      minStars: null
    };

    return data;
  },
  methods: {
    handleMinStarsUpdate: function () {
      if (isNaN(this.minStars as number)) {
        this.minStars = null;
      } else {
        this.updateStore();
      }
    },
    resetMinStars: function () {
      this.minStars = null;
      updateFilters({ minStars: null });
    },
    updateStore: function () {
      updateFilters({ minStars: this.minStars });
    }
  }
};
</script>
