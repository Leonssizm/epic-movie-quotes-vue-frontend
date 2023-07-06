<template>
  <div v-if="photoIsLoaded">
    <img
      :src="
        moviesStore.movie.image ? storageUrl + moviesStore.movie.image : 'https://picsum.photos/300'
      "
      alt="movie-thumbnail"
      class="lg:w-[37rem] lg:h-[27rem] w-[20rem] h-[18rem] rounded-xl ml-10 lg:ml-24"
    />
  </div>
  <div class="flex flex-col justify-center" v-if="isLoading">
    <div class="flex justify-center items-center h-screen">
      <div class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"></div>
    </div>
  </div>
  <div v-else class="grow lg:ml-24 lg:p-0 p-6">
    <div class="font-helvetica-neue text-2xl font-bold flex justify-between">
      <h1 class="text-[#DDCCAA]" v-if="locale == 'en'">
        {{ moviesStore.movie.title.en }} ({{ moviesStore.movie.release_year.slice(0, 4) }})
      </h1>
      <h1 class="text-[#DDCCAA]" v-else>
        {{ moviesStore.movie.title.ka }} ({{ moviesStore.movie.release_year.slice(0, 4) }})
      </h1>
      <div
        class="hidden lg:flex justify-around bg-[#24222F] w-36 items-center mr-24"
        v-if="authStore.authenticatedUser.id === moviesStore.movie.user_id"
      >
        <button type="button" @click="openEditMovieModal"><IconEdit /></button>
        <div class="text-gray-600">|</div>
        <button type="button" @click="showMovieDeleteModal = true"><IconDelete /></button>
      </div>
    </div>
    <span v-if="locale === 'en'" class="flex flex-wrap mt-3">
      <p
        v-for="(genre, index) in moviesStore.movie.genres"
        :key="genre.id"
        class="text-white bg-gray-500 p-2 rounded mt-2"
        :class="{
          'ml-2': index !== 0
        }"
      >
        {{ genre.name.en }}
      </p>
    </span>
    <span v-else class="flex flex-wrap mt-3">
      <p
        class="text-white bg-gray-500 p-2 rounded mt-2"
        v-for="(genre, index) in moviesStore.movie.genres"
        :key="genre.id"
        :class="{
          'ml-2': index !== 0
        }"
      >
        {{ genre.name.ka }}
      </p>
    </span>
    <div class="flex mt-4">
      <p class="text-white text-xl" v-if="locale === 'en'">
        Director: {{ moviesStore.movie.director.en }}
      </p>
      <p class="text-white text-xl" v-else>რეჟისორი: {{ moviesStore.movie.director.ka }}</p>
    </div>
    <div class="mt-3">
      <p class="text-white font-helvetica-neue max-w-lg px-1" v-if="locale === 'en'">
        {{ moviesStore.movie.description.en }}
      </p>
      <p class="text-white font-helvetica-neue max-w-lg px-1" v-else>
        {{ moviesStore.movie.description.ka }}
      </p>
    </div>
  </div>
  <transition name="movie-fade">
    <div
      v-if="showMovieDeleteModal"
      class="fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
    >
      <div class="p-4 rounded-lg shadow-lg font-helvetica-neue bg-[#000000]">
        <h2 class="text-xl mb-4">Confirm Delete</h2>
        <p class="">Are you sure you want to delete this Movie?</p>
        <div class="mt-4 flex justify-end">
          <button @click="showMovieDeleteModal = false" class="mr-2">Cancel</button>
          <button @click="removeMovie" class="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getSingleMovie } from '@/services/api.js'
import { deleteMovie } from '@/services/api.js'

const router = useRouter()
const moviesStore = useMoviesStore()
const authStore = useAuthStore()
let photoIsLoaded = ref(false)
let isLoading = ref(true)
let quotesAreLoaded = ref(true)
let showMovieDeleteModal = ref(false)

const storageUrl = import.meta.env.VITE_API_STORAGE
const locale = useI18n().locale

getSingleMovie(router.currentRoute.value.params.id).then((response) => {
  moviesStore.initIndividualMovie(response.data)
  photoIsLoaded.value = true
  isLoading.value = false
  quotesAreLoaded.value = false
})
function removeMovie() {
  deleteMovie(router.currentRoute.value.params.id).then(() => {
    showMovieDeleteModal.value = false
    router.back()
  })
}

function openEditMovieModal() {
  router.push({ name: 'edit-movie' })
}
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

.bg-opacity-85 {
  background-color: rgba(0, 0, 0, 0.85);
}
.text-gray-600 {
  --text-opacity: 1;
  color: rgba(113, 128, 150, var(--text-opacity));
}
.text-gray-800 {
  --text-opacity: 1;
  color: rgba(55, 65, 81, var(--text-opacity));
}

.movie-fade-enter-active,
.movie-fade-leave-active {
  transition: opacity 0.3s;
}
.movie-fade-enter,
.movie-fade-leave-to {
  opacity: 0;
}
</style>
