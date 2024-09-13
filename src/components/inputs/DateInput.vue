<template>
  <div class="text-sm mb-1 flex justify-between">
    <span>{{ label }}</span>

    <CloseIcon
      v-if="value"
      class="w-4 cursor-normal"
      @click="handleInputReset"
    />
  </div>

  <input
    v-model="value"
    :max="maxDate"
    type="date"
    class="border w-full h-10 rounded text-sm dark:bg-gray-700 dark:border-gray-700 px-3"
    @change="handleValueChange"
  />
</template>

<script lang="ts">
import CloseIcon from '@/assets/icons/CloseIcon.vue'

export default {
  components: { CloseIcon },
  props: {
    label: String
  },
  emits: ['valueChange', 'valueReset'],
  data() {
    return {
      value: null,
      maxDate: this.getMaxDate()
    }
  },
  methods: {
    handleValueChange(event: any) {
      this.$emit('valueChange', event)
    },
    handleInputReset() {
      this.value = null
      this.$emit('valueReset')
    },
    getMaxDate() {
      const isoDate = new Date().toISOString()

      return isoDate.slice(0, isoDate.indexOf('T')).replace(/\//g, '-')
    }
  }
}
</script>
