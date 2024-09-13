<template>
  <div
    v-if="!repos"
    class="p-4 text-center w-full"
  >
    Loading {{ language }} repositories...
  </div>
  <div
    v-if="repos && !repos.length"
    class="p-4 text-center w-full"
  >
    No results to show for your selected filters.
  </div>

  <RepoCard
    v-for="repo in repos"
    :key="repo.id"
    :repo="repo"
  />
</template>

<script lang="ts">
interface ComponentData {
  repos: any[] | null
  controller: AbortController
}
import { watch } from 'vue'
import axios from 'axios'
import RepoCard from './RepoCard.vue'
import { filters } from '../stores/filters.store'
export default {
  components: { RepoCard },
  props: {
    language: String
  },
  data() {
    const data: ComponentData = {
      repos: null,
      controller: new AbortController()
    }

    return data
  },
  mounted() {
    watch(filters, () => this.searchRepos())

    this.searchRepos()
  },
  beforeUnmount() {
    this.controller?.abort()
  },
  methods: {
    async searchRepos() {
      this.controller?.abort()
      this.controller = new AbortController()

      const { data } = await axios.get(this.generateUrl(), {
        signal: this.controller.signal
      })

      this.repos = data.items
    },
    generateUrl() {
      const { minStars, fromDate, toDate } = filters.value
      const minStarsQuery = minStars ? `+stars:>=${minStars}` : '+stars:>=0' // For some reason it's needed to always add stars in the query
      const fromDateQuery = fromDate ? `+created:>=${fromDate}` : ''
      const toDateQuery = toDate ? `+created:<=${toDate}` : ''

      // Special case
      const language = this.language?.replace('#', '%23')

      return `https://api.github.com/search/repositories?q=language:${language}${minStarsQuery}${fromDateQuery}${toDateQuery}&sort=stars&per_page=6`
    }
  }
}
</script>
