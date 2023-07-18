<template>
  <transition name="fade">
    <Form
      @submit="createQuote"
      v-if="isPopupOpen"
      class="form fixed inset-0 flex justify-center bg-opacity-85 lg:bg-black font-helvetica-neue overflow-scroll"
    >
      <div class="lg:w-1/2 bg-[#11101A] lg:mt-24 h-fit">
        <div class="flex items-start justify-between py-8 border-b-2 border-gray-800">
          <h1 class="text-white font-helvetica-neue text-2xl font-bold mx-auto">
            {{ $t('homePage.quotes.write_new_quote') }}
          </h1>
          <button class="text-2xl text-white mr-10" @click="router.back()"><IconX /></button>
        </div>
        <UserHeader />
        <div v-if="userIsRedirectedFromMoviesPage" class="flex mt-4">
          <HeaderModifications />
        </div>
        <div class="flex flex-col items-center mt-10 text-[#FFFFFF]">
          <div class="flex flex-col">
            <div class="relative">
              <Field
                class="border border-gray-500 bg-[#11101A] lg:w-[56rem] h-[4rem] w-[22rem] rounded placeholder:italic"
                placeholder="Create New Quote"
                as="textarea"
                name="quoteEn"
                rules="required|min:5|engLetters"
                v-model="quoteEn"
              ></Field>
              <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Eng</p>
            </div>
            <ErrorMessage name="quoteEn" class="text-red-500" />
          </div>
          <div class="flex flex-col">
            <div class="relative mt-8">
              <Field
                class="border border-gray-500 bg-[#11101A] lg:w-[56rem] h-[4rem] w-[22rem] rounded placeholder:italic"
                placeholder="ახალი ციტატა"
                as="textarea"
                name="quoteKa"
                rules="required|min:5|geoLetters"
                v-model="quoteKa"
              ></Field>
              <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Geo</p>
            </div>
            <ErrorMessage name="quoteKa" class="text-red-500 mb-2" />
          </div>
          <div class="relative flex justify-center">
            <label
              class="flex items-center justify-center border border-gray-500 bg-[#11101A] lg:w-[56rem] w-[22rem] rounded"
              :class="{
                'lg:h-[20rem]': uploadedPhoto,
                'h-[10rem]': uploadedPhoto,
                'h-[4rem]': !uploadedPhoto
              }"
            >
              <div v-if="uploadedPhoto" class="flex items-center justify-center h-full">
                <img
                  :src="uploadedPhoto"
                  alt="Uploaded Photo"
                  class="h-full w-auto rounded p-3"
                  :class="{
                    'w-[22rem]': uploadedPhoto
                  }"
                />
              </div>
              <div
                class="flex mx-3"
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
              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              @change="handleFileInputChange"
              name="image"
              rules="required"
            />
          </div>
          <ErrorMessage name="image" class="text-red-500 mb-2 ml-8" />
        </div>

        <div class="flex flex-wrap items-center ml-8 mt-3" v-if="!userIsRedirectedFromMoviesPage">
          <div v-for="movie in movies" :key="movie.id" class="flex float-left relative">
            <span v-if="locale === 'en'" class="p-1 bg-gray-600 text-white mb-2">
              {{ movie.title.en }}
              <button class="bg-gray-600 text-white" @click="removeChoice(movie)">X</button>
            </span>
            <span v-if="locale === 'ka'" class="px-2 py-1 bg-gray-600 text-white mb-2">
              {{ movie.title.ka }}
              <button class="bg-gray-600 text-white" @click="removeChoice(movie)">X</button>
            </span>
          </div>
        </div>

        <div
          class="relative bg-transparent border rounded border-gray-500 lg:w-[56rem] h-[3rem] w-[22rem] mt-3 lg:ml-8 ml-1"
          v-if="!userIsRedirectedFromMoviesPage"
        >
          <div class="relative">
            <p class="text-white mt-2 ml-1">
              <span class="flex items-center ml-4"
                ><IconCamera fill="white" class="mr-4" /> Choose Movie</span
              >
            </p>
            <Field
              as="select"
              v-model="selectedMovie"
              class="h-7 w-full h-full bg-transparent text-black absolute inset-0 z-10"
              :disabled="userHasNoMovies"
              @change="selectMovie(selectedMovie)"
              v-if="locale === 'en'"
              name="select"
              rules="required"
            >
              <option v-for="movie in moviesStore.allUserMovies" :value="movie" :key="movie.id">
                {{ movie.title.en }}
              </option>
            </Field>

            <Field
              as="select"
              v-model="selectedMovie"
              @change="selectMovie(selectedMovie)"
              class="h-7 w-full h-full bg-transparent text-black absolute inset-0 z-10"
              :disabled="userHasNoMovies"
              v-else
              name="select"
              rules="required"
            >
              <option v-for="movie in moviesStore.allUserMovies" :value="movie" :key="movie.id">
                {{ movie.title.ka }}
              </option>
            </Field>
          </div>
          <ErrorMessage name="select" class="text-red-500" />
        </div>
        <div class="flex items-center justify-center mt-4">
          <h1 v-if="userHasNoMovies" class="text-red-500 text-2xl font-helvetica-neue">
            {{ $t('homePage.movie_page.user_has_no_movies') }}
          </h1>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="ml-2 mt-5 w-[22.5rem] h-8 lg:w-[56rem] lg:h-10 bg-red-600 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
          >
            {{ $t('forms.add_quote.button') }}
          </button>
        </div>
      </div>
    </Form>
  </transition>
</template>
<script setup>
import IconPhotoCamera from '@/components/icons/IconPhotoCamera.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconX from '@/components/icons/IconX.vue'
import UserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import HeaderModifications from '@/components/home/newsFeed/modifications/MoviePageRedirectionHeaderModifications.vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { getAllUserMovies } from '@/services/api.js'
import { addQuote } from '@/services/api.js'
import { useI18n } from 'vue-i18n'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

const locale = useI18n().locale
const router = useRouter()

const moviesStore = useMoviesStore()
let resolution = ref(window.innerWidth)
let isPopupOpen = ref(true)
let uploadedPhoto = ref('')
let movies = ref([])
let selectedMovie = ref([])
let userHasNoMovies = ref(false)

let quoteEn = ref('')
let quoteKa = ref('')
let userIsRedirectedFromMoviesPage = ref(router.options.history.state.back.includes('movies/movie'))

getAllUserMovies(localStorage.getItem('authUserId')).then((response) => {
  moviesStore.initAllUserMovies(response.data)
  if (response.data.length === 0) {
    userHasNoMovies.value = true
  }
})

function createQuote() {
  let formData = new FormData()
  formData.append('body_en', quoteEn.value)
  formData.append('body_ka', quoteKa.value)
  formData.append('user_id', localStorage.getItem('authUserId'))

  userIsRedirectedFromMoviesPage.value
    ? formData.append(`movie_id`, moviesStore.movie.id)
    : formData.append(`movie_id`, movies.value[0].id)

  let binary = atob(uploadedPhoto.value.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let file = new Blob([new Uint8Array(array)], {
    type: 'image/jpeg'
  })
  formData.append('thumbnail', file)

  addQuote(formData).then((response) => {
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
function selectMovie(movie) {
  if (movies.value.length < 1) {
    movies.value.push(movie)
  }
}

function removeChoice(choice) {
  movies.value = movies.value.filter((genre) => genre.id !== choice.id)
}

onMounted(() => {
  if (localStorage.getItem('locale') === 'en') {
    locale.value = 'en'
    localize('en')
  } else {
    localize('ka')
    locale.value = 'ka'
  }
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
})

function handleClickOutside(event) {
  if (event.target.classList.contains('form')) {
    isPopupOpen.value = false
    document.body.classList.remove('overflow-hidden')
    document.body.removeEventListener('click', handleClickOutside)
    router.push({ name: 'home' })
  }
}

onUnmounted(() => {
  document.body.removeEventListener('click', handleClickOutside)
})
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
