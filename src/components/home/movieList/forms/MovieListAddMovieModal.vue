<template>
  <transition name="fade">
    <Form
      @submit="createMovie"
      v-if="isPopupOpen"
      class="form fixed inset-0 flex justify-center bg-opacity-85 lg:bg-black font-helvetica-neue"
    >
      <div class="lg:w-1/2 bg-[#11101A] lg:mt-24 pb-36 h-full overflow-y-scroll">
        <div class="flex items-start justify-between py-8 border-b-2 border-gray-800">
          <h1 class="text-white font-helvetica-neue text-2xl font-bold mx-auto">
            {{ $t('forms.add_movie.header') }}
          </h1>
          <button class="text-2xl text-white mr-10" type="button" @click="closePopup">x</button>
        </div>
        <AddMovieFormUserHeader />
        <MovieFilmTitleInput v-model:engTitle="engTitle" v-model:geoTitle="geoTitle" />
        <AddMovieSelectGenres @update:genres="handleGenresUpdate" />
        <MovieReleaseDate v-model="releaseDate" />
        <MovieDirectorInput v-model:engDirector="engDirector" v-model:geoDirector="geoDirector" />
        <MovieDescriptionInput
          v-model:engDescription="engDescription"
          v-model:geoDescription="geoDescription"
        />
        <AddMovieImageInput @update:image="handleImageEmit" />
        <div class="flex items-center justify-center">
          <button
            class="ml-2 mt-5 w-[22.5rem] h-8 lg:w-[56rem] lg:h-10 bg-red-600 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
          >
            {{ $t('forms.add_movie.button') }}
          </button>
        </div>
      </div>
    </Form>
  </transition>
</template>
<script setup>
import AddMovieFormUserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import MovieFilmTitleInput from '@/components/home/movieList/forms/inputs/MovieFilmTitleInput.vue'
import AddMovieSelectGenres from '@/components/home/movieList/forms/inputs/AddMovieSelectGenres.vue'
import MovieReleaseDate from '@/components/home/movieList/forms/inputs/MovieReleaseDate.vue'
import MovieDirectorInput from '@/components/home/movieList/forms/inputs/MovieDirectorInput.vue'
import MovieDescriptionInput from '@/components/home/movieList/forms/inputs/MovieDescriptionInput.vue'
import AddMovieImageInput from '@/components/home/movieList/forms/inputs/AddMovieImageInput.vue'
import { onMounted, ref, provide } from 'vue'
import { addMovie, getMovies } from '@/services/api.js'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import { useMoviesStore } from '@/stores/useMoviesStore'

const router = useRouter()
const engTitle = ref('')
const geoTitle = ref('')
const engDirector = ref('')
const geoDirector = ref('')
const engDescription = ref('')
const geoDescription = ref('')
const genres = ref([])
let movieImage = ref(null)
let releaseDate = ref('')
let moviesStore = useMoviesStore()

provide('engTitle', engTitle)
provide('geoTitle', geoTitle)
provide('releaseDate', releaseDate)
provide('engDirector', engDirector)
provide('geoDirector', geoDirector)
provide('engDescription', engDescription)
provide('geoDescription', geoDescription)

let isPopupOpen = ref(false)
let photoIsLoaded = ref(false)

onMounted(() => {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
  photoIsLoaded.value = true
})

function handleClickOutside(event) {
  if (event.target.classList.contains('form')) {
    isPopupOpen.value = false
    document.body.classList.remove('overflow-hidden')
    document.body.removeEventListener('click', handleClickOutside)
    router.push({ name: 'movies-list' })
  }
}
function closePopup() {
  isPopupOpen.value = false
  document.body.classList.remove('overflow-hidden')
  document.body.removeEventListener('click', handleClickOutside)
  router.push({ name: 'movies-list' })
}

function handleGenresUpdate(updatedGenres) {
  genres.value = updatedGenres
}

function handleImageEmit(image) {
  movieImage.value = image
}

function createMovie() {
  let formData = new FormData()

  formData.append('title_en', engTitle.value)
  formData.append('title_ka', geoTitle.value)
  formData.append('director_en', engDirector.value)
  formData.append('director_ka', geoDirector.value)
  formData.append('description_en', engDescription.value)
  formData.append('description_ka', geoDescription.value)
  formData.append('release_year', releaseDate.value)
  formData.append('image', movieImage.value)
  formData.append('user_id', localStorage.getItem('authUserId'))
  for (let i = 0; i < genres.value.length; i++) {
    formData.append(`genre_ids[${i}]`, genres.value[i].id)
  }

  addMovie(formData).then(() => {
    getMovies(1).then((response) => {
      moviesStore.movies.unshift(response.data[0])
    })
    router.back()
  })
}
</script>

<style scoped>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
