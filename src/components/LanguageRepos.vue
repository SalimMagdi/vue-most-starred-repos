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
import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import axios from 'axios'
import RepoCard from './RepoCard.vue'
import { filters } from '../stores/filters.store'

const BASE_URL = 'https://api.github.com/search/repositories'

export default {
  components: { RepoCard },
  props: {
    language: String
  },
  setup({ language }) {
    const repos: Ref<any[] | null> = ref(null)
    const controller: Ref<AbortController> = ref(new AbortController())

    const searchRepos = async () => {
      controller.value?.abort()
      controller.value = new AbortController()

      const { data } = await axios.get(generateUrl(), {
        signal: controller.value.signal
      })

      repos.value = data.items
    }

    // FIXME: this can be done better
    const generateUrl = () => {
      const { minStars, fromDate, toDate } = filters.value
      const minStarsQuery = minStars ? `+stars:>=${minStars}` : '+stars:>=0' // For some reason it's needed to always add stars in the query
      const fromDateQuery = fromDate ? `+created:>=${fromDate}` : ''
      const toDateQuery = toDate ? `+created:<=${toDate}` : ''

      // Special case
      const lang = language?.replace('#', '%23')

      // I think this api endpoint is broken
      return `${BASE_URL}?q=language:${lang}${minStarsQuery}${fromDateQuery}${toDateQuery}&sort=stars&per_page=6`
    }

    onMounted(() => {
      watch(filters, searchRepos)

      searchRepos()
    })

    onBeforeUnmount(() => controller.value?.abort())

    return {
      repos
    }
  }
}
</script>
