<template>
  <MovieListHeader />
  <div
    class="flex flex-wrap"
    :class="{
      'h-screen': store.movies.length === 0
    }"
  >
    <div
      v-for="movie in store.movies"
      :key="movie.id"
      class="w-full sm:w-1/2 md:w-1/3 px-10 py-8"
      :class="{
        'h-screen': store.movies.length < 4
      }"
    >
      <RouterLink :to="{ name: 'movie', params: { id: movie.id } }">
        <div class="bg-transparent rounded-lg shadow-md">
          <div class="overflow-hidden rounded-lg">
            <img
              :src="movie.image ? storageUrl + movie.image : 'https://picsum.photos/300'"
              alt="movie-thumbnail"
              class="w-full h-[25rem] object-cover"
            />
          </div>
          <div v-if="locale === 'en'" class="flex uppercase">
            <h1 class="text-lg font-bold mt-2">
              {{ movie.title.en }} {{ movie.release_year.slice(0, 4) }}
            </h1>
          </div>
          <div v-else>
            <h1 class="text-lg font-bold mt-2">
              {{ movie.title.ka }} {{ movie.release_year.slice(0, 4) }}
            </h1>
          </div>
          <div class="flex text-xl mt-3">
            <p class="text-white mr-3">{{ movie.quotes.length }}</p>
            <IconCitation class="w-7 h-7" />
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <div>
    <RouterView />
  </div>
</template>
<script setup>
import IconCitation from '@/components/icons/IconCitation.vue'
import MovieListHeader from '@/components/home/movieList/MovieListHeader.vue'

import { useMoviesStore } from '@/stores/useMoviesStore'
import { useGenresStore } from '@/stores/useGenresStore'
import { getMovies, getGenres } from '@/services/api.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const storageUrl = import.meta.env.VITE_API_STORAGE

const store = useMoviesStore()
const genresStore = useGenresStore()
const locale = useI18n().locale
let page = ref(1)

onMounted(() => {
  fetchMovies(page.value)
  window.addEventListener('scroll', fetchMoreMoviesOnScroll)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

onBeforeUnmount(() => {
  store.movies.length = 0
  window.removeEventListener('scroll', fetchMoreMoviesOnScroll)
})

function fetchMovies(page) {
  getMovies(page).then((response) => {
    response.data.forEach((movie) => {
      if (movie.user_id == localStorage.getItem('authUserId')) {
        store.initMovies([movie])
      }
    })
  })
}

function fetchMoreMoviesOnScroll() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPosition = window.scrollY
  if (scrollPosition >= scrollableHeight) {
    page.value += 1
    setTimeout(() => {
      fetchMovies(page.value)
    }, 800)
  }
}

getGenres().then((response) => {
  genresStore.initGenres(response.data)
})
</script>
