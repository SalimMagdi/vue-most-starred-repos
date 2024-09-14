<template>
  <div
    v-if="repo"
    class="border p-4 rounded flex flex-col gap-2 bg-white dark:bg-gray-950 dark:border-gray-950 transition hover:-translate-y-1"
  >
    <a
      class="text-l font-bold text-indigo-700 dark:text-indigo-300 underline break-all"
      target="_blank"
      :href="repo.html_url"
    >
      {{ repo.full_name }}
    </a>

    <div
      v-if="repo.description"
      class="text-sm"
    >
      {{ repo.description.slice(0, 120) }} {{ repo.description.length > 120 ? '...' : '' }}
    </div>

    <div class="text-sm font-bold flex items-center gap-1 text-amber-700">
      <HeartIcon class="h-4 w-4" />
      {{ repo.stargazers_count }}
    </div>

    <div class="text-sm">{{ creationDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HeartIcon from '../assets/icons/HeartIcon.vue'

const { repo } = defineProps<{ repo: any }>()

const creationDate = computed(() => new Date(repo?.created_at).toLocaleDateString())
</script>
