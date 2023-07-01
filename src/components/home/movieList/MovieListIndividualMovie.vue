<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex justify-start ml-3 lg:ml-0">
      <h1 class="text-[#FFFFFF] font-bold font-helvetica-neue text-xl lg:ml-[9rem] hidden lg:block">
        Movie Description
      </h1>
    </div>
    <div class="flex flex-col lg:flex-row mt-2 lg:mt-10">
      <div v-if="photoIsLoaded">
        <img
          :src="
            moviesStore.movie.image
              ? storageUrl + moviesStore.movie.image
              : 'https://picsum.photos/300'
          "
          alt="movie-thumbnail"
          class="lg:w-[37rem] lg:h-[27rem] w-[20rem] h-[18rem] rounded-xl ml-10 lg:ml-24"
        />
      </div>
      <div class="flex flex-col justify-center" v-if="isLoading">
        <div class="flex justify-center items-center h-screen">
          <div
            class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"
          ></div>
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
          <p class="text-white text-xl" v-else>Director: {{ moviesStore.movie.director.en }}</p>
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
      <div class="flex font-helvetica-neue font-white text-xl font-bold my-10 lg:mr-[50rem]">
        <p class="flex items-center justify-center text-2xl">
          Quotes (total {{ moviesStore.movie.quotes.length }})
        </p>
        <div class="text-gray-600 mx-4 h-10 text-3xl">|</div>
        <button
          :disabled="authStore.authenticatedUser.id !== moviesStore.movie.user_id"
          @click="addQuote"
          class="ml-2 mt-2 lg:mt-0 w-24 h-8 lg:w-28 lg:h-10 bg-red-700 border border-red-700 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221] flex justify-around items-center"
        >
          <IconPlus />
          Add Quote
        </button>
      </div>
      <div
        v-for="quote in moviesStore.movie.quotes"
        :key="quote.id"
        class="lg:w-[50rem] lg:h-[20rem] bg-[#000000] flex items-center lg:mr-[25rem] mb-16"
      >
        <div class="flex flex-col">
          <div class="flex lg:flex-row flex-col">
            <img
              :src="quote.thumbnail ? storageUrl + quote.thumbnail : 'https://picsum.photos/300'"
              alt="quote-image"
              class="h-[10rem] w-[20rem] ml-10 mt-10"
            />
            <p
              class="italic text-xl mx-3 text-center flex items-center ml-5"
              v-if="locale === 'en'"
            >
              "{{ quote.body.en }}"
            </p>
            <p class="italic text-xl mx-3 text-center flex items-center ml-5" v-else>
              "{{ quote.body.ka }}"
            </p>
          </div>
          <div class="border border-solid border-gray-700 mx-7 my-3"></div>
          <div class="flex mb-3">
            <p class="text-white mx-2 ml-7">{{ quote.comments.length }}</p>
            <IconChat />
            <p class="text-white ml-4 mr-2">{{ quote.likes.length }}</p>
            <IconHeart fill="white" />
            <button
              class="text-2xl text-white font-extrabold ml-auto lg:hidden mb-4"
              @click="toggleMenu(quote.id)"
            >
              ...
            </button>
          </div>
        </div>
        <div class="relative ml-auto w-4 mt-4 mr-4 mb-auto">
          <button
            class="text-2xl text-white font-extrabold hidden lg:block"
            @click="toggleMenu(quote.id)"
          >
            ...
          </button>
          <div
            class="w-[13rem] h-[9rem] flex flex-col bg-[#24222F] absolute right-0 top-28 lg:top-full lg:right-50 mt-2"
            v-if="quote.displayMenu"
          >
            <RouterLink class="flex items-center ml-6 mt-5" :to="'/quotes/' + quote.id">
              <IconDetails class="mx-2" />
              <span class="mx-2">View Quote</span>
            </RouterLink>
            <RouterLink
              :to="'/quotes/' + quote.id + '/edit'"
              class="flex items-center mt-3 ml-6"
              v-if="authStore.authenticatedUser.id === quote.user_id"
            >
              <IconEdit class="mx-2" />
              <span class="mx-2">Edit</span>
            </RouterLink>
            <button
              @click="showQuoteDeleteModal = true"
              class="flex items-center mt-3 ml-6"
              v-if="authStore.authenticatedUser.id === quote.user_id"
            >
              <IconDelete class="mx-2" />
              <span class="mx-2">Delete</span>
            </button>
          </div>
        </div>
        <transition name="quote-fade">
          <div
            v-if="showQuoteDeleteModal"
            class="fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
          >
            <div class="p-4 rounded-lg shadow-lg font-helvetica-neue bg-[#000000]">
              <h2 class="text-xl mb-4">Confirm Delete</h2>
              <p class="">Are you sure you want to delete this Quote?</p>
              <div class="mt-4 flex justify-end">
                <button @click="showQuoteDeleteModal = false" class="mr-2">Cancel</button>
                <button @click="removeQuote" class="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </transition>
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
    </div>
  </div>
</template>

<script setup>
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconDetails from '@/components/icons/IconDetails.vue'

import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { getSingleMovie } from '@/services/api.js'
import { deleteMovie } from '@/services/api.js'
import { deleteQuote } from '@/services/api.js'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const moviesStore = useMoviesStore()
const authStore = useAuthStore()

const storageUrl = import.meta.env.VITE_API_STORAGE
const locale = useI18n().locale

let photoIsLoaded = ref(false)
let isLoading = ref(true)
let quotesAreLoaded = ref(true)
let showQuoteDeleteModal = ref(false)
let showMovieDeleteModal = ref(false)
let currentChosenQuoteId = ref('')

getSingleMovie(router.currentRoute.value.params.id).then((response) => {
  moviesStore.initIndividualMovie(response.data)
  photoIsLoaded.value = true
  isLoading.value = false
  quotesAreLoaded.value = false
})

function toggleMenu(quoteId) {
  currentChosenQuoteId.value = quoteId
  const quote = this.moviesStore.movie.quotes.find((q) => q.id === quoteId)
  if (quote) {
    quote.displayMenu = !quote.displayMenu
  }
}

function removeQuote() {
  deleteQuote(currentChosenQuoteId.value).then(() => {
    showQuoteDeleteModal.value = false
    moviesStore.movie.quotes = moviesStore.movie.quotes.filter(
      (quote) => quote.id !== currentChosenQuoteId.value
    )
  })
}

function removeMovie() {
  deleteMovie(router.currentRoute.value.params.id).then(() => {
    showMovieDeleteModal.value = false
    router.back()
  })
}

function addQuote() {
  router.push({ name: 'add-quote' })
}
function openEditMovieModal() {
  router.push({ name: 'edit-movie' })
}

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
.quote-fade-enter-active,
.quote-fade-leave-active,
.movie-fade-enter-active,
.movie-fade-leave-active {
  transition: opacity 0.3s;
}

.quote-fade-enter,
.quote-fade-leave-to,
.movie-fade-enter,
.movie-fade-leave-to {
  opacity: 0;
}
</style>
