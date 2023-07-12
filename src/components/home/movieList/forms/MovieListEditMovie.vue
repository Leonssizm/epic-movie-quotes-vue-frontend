<template>
  <div class="bg-[#181624] h-screen w-screen"></div>
  <transition name="fade">
    <Form
      @submit="editMovie"
      v-if="isPopupOpen"
      class="form fixed inset-0 flex justify-center bg-opacity-85 lg:bg-black font-helvetica-neue"
    >
      <div class="lg:w-1/2 bg-[#11101A] lg:mt-24 pb-36 h-full overflow-y-scroll">
        <div class="flex items-start justify-between py-8 border-b-2 border-gray-800">
          <h1 class="text-white font-helvetica-neue text-2xl font-bold mx-auto">
            {{ $t('forms.edit_movie.header') }}
          </h1>
          <button class="text-2xl text-white mr-10" type="button" @click="closePopup">x</button>
        </div>
        <AddMovieFormUserHeader />
        <MovieFilmTitleInput v-model:engTitle="engTitle" v-model:geoTitle="geoTitle" />

        <!-- Select -->
        <div
          class="relative bg-transparent border rounded border-gray-500 lg:w-[56rem] h-[3rem] w-[22rem] mt-8 lg:ml-8"
        >
          <div
            v-for="choice in genres"
            :key="choice.id"
            class="flex ml-2 mt-2 float-left relative z-10"
          >
            <span v-if="locale === 'en'" class="p-1 bg-gray-600 text-white">
              {{ choice.name.en }}
              <button
                class="bg-gray-600 text-white pr-1"
                type="button"
                @click="removeChoice(choice)"
              >
                X
              </button>
            </span>
            <span v-if="locale === 'ka'" class="px-2 py-1 bg-gray-600 text-white">
              {{ choice.name.ka }}
              <button
                class="bg-gray-600 text-white pr-1"
                type="button"
                @click="removeChoice(choice)"
              >
                X
              </button>
            </span>
          </div>

          <div class="relative">
            <p
              class="text-white mt-2 ml-1"
              :class="{
                hidden: genres.length !== 0
              }"
            >
              Genres
            </p>
            <Field
              as="select"
              v-model="selectedGenre"
              class="h-7 w-full h-full bg-transparent text-black bg-[#11101A]"
              @change="selectGenre(selectedGenre)"
              v-if="locale === 'en'"
              name="select"
              :rules="genres.length === 0 ? 'required' : ''"
            >
              <option v-for="genre in genresStore.genres" :value="genre" :key="genre.id">
                {{ genre.name.en }}
              </option>
            </Field>

            <Field
              as="select"
              v-model="selectedGenre"
              @change="selectGenre(selectedGenre)"
              class="h-7 w-full h-full bg-transparent text-black"
              v-else
              name="select"
              :rules="genres.length === 0 ? 'required' : ''"
            >
              <option v-for="genre in genresStore.genres" :value="genre" :key="genre.id">
                {{ genre.name.ka }}
              </option>
            </Field>
            <ErrorMessage name="select" class="text-red-500" />
          </div>
        </div>
        <!--  -->

        <MovieReleaseDate v-model="releaseDate" />
        <MovieDirectorInput v-model:engDirector="engDirector" v-model:geoDirector="geoDirector" />
        <MovieDescriptionInput
          v-model:engDescription="engDescription"
          v-model:geoDescription="geoDescription"
        />
        <!-- Movie image -->
        <div class="relative flex justify-center">
          <label
            class="flex items-center border border-gray-500 bg-[#11101A] lg:w-[56rem] h-[4rem] w-[22rem] rounded"
            :class="{
              'h-full': uploadedPhoto
            }"
          >
            <div v-if="uploadedPhoto" class="flex items-center justify-center h-full">
              <img
                :src="uploadedPhoto"
                alt="Uploaded Photo"
                class="h-full w-auto rounded p-3"
                :class="{
                  'w-[26rem]': uploadedPhoto
                }"
              />
            </div>
            <div
              class="flex"
              :class="{
                'flex-col': uploadedPhoto,
                'lg:ml-16': uploadedPhoto
              }"
            >
              <div
                class="flex items-center ml-4"
                :class="{
                  'flex-col': uploadedPhoto
                }"
              >
                <p class="uppercase text-yellow-500 font-bold mr-4" v-if="uploadedPhoto">
                  Replace Photo
                </p>
                <IconPhotoCamera class="mr-2 text-white" :class="{ hidden: uploadedPhoto }" />
                <span class="mr-2 text-white" v-if="resolution >= 768"
                  >Drag &amp; drop your image here</span
                >
                <span
                  class="mr-2 text-white"
                  v-if="!resolution <= 768"
                  :class="{
                    hidden: uploadedPhoto
                  }"
                  >Upload Image</span
                >
              </div>
              <button
                class="border border-purple-500 bg-purple-700 text-white py-1 px-2 rounded cursor-pointer"
              >
                Choose File
              </button>
            </div>
          </label>
          <Field
            type="file"
            class="absolute inset-0 opacity-0 w-full h-full cursor-pointer bg-[#11101A]"
            @change="handleFileInputChange"
            name="image"
            :rules="uploadedPhoto.value === '' ? 'required' : ''"
          />
        </div>
        <ErrorMessage name="image" class="text-red-500 mb-2 ml-8" />
        <!--  -->
        <div class="flex items-center justify-center">
          <button
            class="ml-2 mt-5 w-[22.5rem] h-8 lg:w-[56rem] lg:h-10 bg-red-600 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
          >
            {{ $t('forms.edit_movie.button') }}
          </button>
        </div>
      </div>
    </Form>
  </transition>
</template>
<script setup>
import AddMovieFormUserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import MovieFilmTitleInput from '@/components/home/movieList/forms/inputs/MovieFilmTitleInput.vue'
import MovieReleaseDate from '@/components/home/movieList/forms/inputs/MovieReleaseDate.vue'
import MovieDirectorInput from '@/components/home/movieList/forms/inputs/MovieDirectorInput.vue'
import MovieDescriptionInput from '@/components/home/movieList/forms/inputs/MovieDescriptionInput.vue'
import IconPhotoCamera from '@/components/icons/IconPhotoCamera.vue'

import { useMoviesStore } from '@/stores/useMoviesStore'
import { useGenresStore } from '@/stores/useGenresStore'
import { onMounted, ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { editMovieRequest, getGenres } from '@/services/api.js'
import { Form, Field, ErrorMessage } from 'vee-validate'

const router = useRouter()
const storageUrl = import.meta.env.VITE_API_STORAGE
const locale = useI18n().locale
const moviesStore = useMoviesStore()
const genresStore = useGenresStore()
const engTitle = ref(moviesStore.movie.title.en)
const geoTitle = ref(moviesStore.movie.title.ka)
const engDirector = ref(moviesStore.movie.director.en)
const geoDirector = ref(moviesStore.movie.director.ka)
const engDescription = ref(moviesStore.movie.description.en)
const geoDescription = ref(moviesStore.movie.description.ka)
const genres = ref([])
let uploadedPhoto = ref(storageUrl + moviesStore.movie.image)
let resolution = ref(window.innerWidth)
let releaseDate = ref(moviesStore.movie.release_year)

provide('engTitle', engTitle)
provide('geoTitle', geoTitle)
provide('releaseDate', releaseDate)
provide('engDirector', engDirector)
provide('geoDirector', geoDirector)
provide('engDescription', engDescription)
provide('geoDescription', geoDescription)

let isPopupOpen = ref(false)
let selectedGenre = ref([])

onMounted(() => {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')

  genres.value = moviesStore.movie.genres
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
  router.back()
}

function selectGenre(genre) {
  if (!genres.value.some((item) => item.id === genre.id)) {
    genres.value.push(genre)
  }
}
getGenres().then((response) => {
  if (genresStore.genres.length === 0) {
    genresStore.initGenres(response.data)
  }
})

function removeChoice(choice) {
  genres.value = genres.value.filter((genre) => genre.id !== choice.id)
}

function editMovie() {
  let formData = new FormData()

  formData.append('title_en', engTitle.value)
  formData.append('title_ka', geoTitle.value)
  formData.append('director_en', engDirector.value)
  formData.append('director_ka', geoDirector.value)
  formData.append('description_en', engDescription.value)
  formData.append('description_ka', geoDescription.value)
  formData.append('release_year', releaseDate.value)

  if (uploadedPhoto.value.includes('base64')) {
    let binary = atob(uploadedPhoto.value.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let file = new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    })
    formData.append('image', file)
  }
  formData.append('user_id', localStorage.getItem('authUserId'))
  for (let i = 0; i < genres.value.length; i++) {
    formData.append(`genre_ids[${i}]`, genres.value[i].id)
  }

  editMovieRequest(moviesStore.movie.id, formData).then((response) => {
    if (response.status === 200) {
      router.back()
    }
  })
}
function handleFileInputChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      uploadedPhoto.value = reader.result
    }
    reader.readAsDataURL(file)
  } else {
    uploadedPhoto.value = null
  }
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
