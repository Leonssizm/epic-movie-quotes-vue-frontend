<template>
  <div class="pt-6">
    <div
      class="text-[#FFFFFF] flex lg:items-center lg:justify-between ml-3 lg:ml-0"
      :class="{
        'justify-around': locale === 'en'
      }"
    >
      <h1 class="text-[#FFFFFF] font-bold font-helvetica-neue text-xl lg:ml-[7.2rem]">
        {{ $t('homePage.movie_page.title') }} <br class="lg:hidden" />
        {{ $t('homePage.movie_page.total', { total: store.getMoviesAmount }) }}
      </h1>
      <div :class="{ 'w-1/7': isExpanded, 'w-1/6': !isExpanded }" class="mr-10 lg:flex">
        <IconQuestionMark class="mt-3 hidden lg:flex" />
        <input
          @click="isExpanded = !isExpanded"
          placeholder="search"
          class="h-12 bg-[#181624] ml-2 hidden lg:flex outline-none"
          :class="{ 'w-[15rem]': isExpanded, 'w-[5rem]': !isExpanded }"
          type="search"
          v-model="search"
          @keyup.enter="searchMovies"
        />
        <button
          class="mt-2 pr-2 whitespace-nowrap h-10 lg:h-12 lg:mt-0 bg-red-700 border border-red-700 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221] flex items-center"
          :class="{
            'ml-4': locale === 'ka'
          }"
          @click="openAddMovieModal"
        >
          <IconPlus class="mx-2" />
          <span class="inline">{{ $t('forms.add_movie.button') }}</span>
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="nothingIsFound"
    class="h-screen w-screen bg-[#181624] text-4xl font-bold text-white font-helvetica-neue flex justify-center"
  >
    {{ $t('homePage.movie_page.nothing_found') }}
  </div>
</template>
<script setup>
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { searchAllMovies } from '@/services/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const store = useMoviesStore()
const router = useRouter()
const locale = useI18n().locale

let isExpanded = ref(false)
let search = ref('')
let nothingIsFound = ref(false)

function searchMovies() {
  searchAllMovies(search.value).then((response) => {
    response.data.forEach((searchResult) => {
      if (searchResult.user_id == localStorage.getItem('authUserId')) {
        store.initSearchedMovies([searchResult])
      }
    })
    nothingIsFound.value = false
    if (response.data.length === 0) {
      nothingIsFound.value = true
    }
  })
}

function openAddMovieModal() {
  router.push({ name: 'add-movie' })
}
</script>
