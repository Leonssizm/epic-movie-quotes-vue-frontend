<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex justify-start ml-3 lg:ml-0">
      <h1 class="text-[#FFFFFF] font-bold font-helvetica-neue text-xl lg:ml-[9rem] hidden lg:block">
        Movie Description
      </h1>
    </div>
    <div class="flex flex-col lg:flex-row mt-2 lg:mt-10">
      <IndividualMovieDetails />
    </div>
    <div class="mt-4" v-if="quotesAreLoaded">
      <div class="flex justify-center items-center">
        <div
          class="w-10 h-10 rounded-full border-8 border-dotted border-red-500 animate-spin"
        ></div>
      </div>
    </div>
    <div
      v-else
      class="flex justify-center flex-col items-center"
      :class="{
        'h-[30rem]': moviesStore.movie.quotes.length === 0
      }"
    >
      <IndividualMovieQuotes />
    </div>
  </div>
</template>

<script setup>
import IndividualMovieDetails from '@/components/home/movieList/details/IndividualMovieDetails.vue'
import IndividualMovieQuotes from '@/components/home/movieList/details/IndividualMovieQuotes.vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { getSingleMovie } from '@/services/api.js'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const moviesStore = useMoviesStore()
const locale = useI18n().locale

let photoIsLoaded = ref(false)
let isLoading = ref(true)
let quotesAreLoaded = ref(true)

getSingleMovie(router.currentRoute.value.params.id).then((response) => {
  moviesStore.initIndividualMovie(response.data)
  photoIsLoaded.value = true
  isLoading.value = false
  quotesAreLoaded.value = false
})

onMounted(() => {
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})
</script>
<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
