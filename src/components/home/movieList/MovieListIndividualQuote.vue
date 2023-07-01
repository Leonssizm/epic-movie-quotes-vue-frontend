<template>
  <div v-if="isLoading">
    <div class="flex justify-center items-center h-screen">
      <div class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"></div>
    </div>
  </div>
  <div v-else class="h-screen bg-[#181623] flex justify-center">
    <div class="bg-[#000000] overflow-y-scroll lg:w-1/2 w-full lg:mt-10">
      <div class="flex items-start py-8 border-b-2 border-gray-800">
        <div
          class="flex justify-around w-36 items-center"
          v-if="authStore.authenticatedUser.id === quotesStore.quote.user_id"
        >
          <IconEdit @click="editQuote" />
          <div class="text-gray-600">|</div>
          <IconDelete @click="showQuoteDeleteModal = true" />
        </div>
        <h1
          class="text-white font-helvetica-neue text-2xl font-bold mx-auto ml-48 hidden lg:block"
          :class="{
            'ml-[20rem]': authStore.authenticatedUser.id !== quotesStore.quote.user_id
          }"
        >
          View Quote
        </h1>
        <button class="text-2xl text-white mr-10 ml-auto lg:ml-0" @click="router.back()">x</button>
      </div>
      <UserHeader />
      <div class="relative flex justify-center mt-5">
        <input
          class="border border-gray-300 bg-[#000000] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
          disabled
          :value="quotesStore.quote.body.en"
        />
        <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Eng</p>
      </div>
      <div class="relative flex justify-center mt-5">
        <input
          class="border border-gray-300 bg-[#000000] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
          disabled
          :value="quotesStore.quote.body.ka"
        />
        <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Geo</p>
      </div>
      <!-- image -->
      <div class="flex items-center justify-center mt-6">
        <img
          :src="
            quotesStore.quote.thumbnail
              ? storageUrl + quotesStore.quote.thumbnail
              : 'https://picsum.photos/300'
          "
          class="lg:w-[50rem] lg:h-[28rem]"
          alt="quote-picture"
        />
      </div>
      <div class="flex ml-6 mt-6">
        <div class="flex mr-6">
          <p class="mr-3">{{ quotesStore.quote.comments.length }}</p>
          <button @click="changeCommentsVisibility">
            <IconChat />
          </button>
        </div>
        <div class="flex">
          <p class="mr-3">{{ quotesStore.quote.likes.length }}</p>
          <button @click="handleLikingQuote(quotesStore.quote.id)">
            <IconHeart :fill="quotesStore.quote.liked ? 'red' : 'white'" />
          </button>
        </div>
      </div>
      <div class="border border-solid border-gray-700 mx-6 my-6"></div>
      <!-- Write comment -->
      <div
        class="flex items-center pl-6"
        v-for="comment in quotesStore.quote.comments.slice(0, amountOfCommentsVisible)"
        :key="comment.id"
      >
        <img
          :src="
            comment.user.profile_picture
              ? comment.user.profile_picture.includes('http')
                ? comment.user.profile_picture
                : storageUrl + comment.user.profile_picture
              : 'https://picsum.photos/200'
          "
          class="rounded-full h-14 w-14 object-cover"
          alt="profile-picture"
        />
        <div
          class="ml-6 flex flex-col font-helvetica-neue font-normal text-[#FFFFFF] border-b border-solid border-gray-700 w-3/4 py-5"
        >
          <p class="flex items-center mt-8">
            {{ comment.user.username }}
          </p>
          <p class="mt-4">
            {{ comment.body }}
          </p>
        </div>
      </div>
      <div class="border border-solid border-gray-700 mx-6 my-6"></div>
      <div class="mt-6 pl-6 flex items-center mb-5">
        <img
          :src="
            authStore.authenticatedUser.profile_picture
              ? authStore.authenticatedUser.profile_picture.includes('http')
                ? authStore.authenticatedUser.profile_picture
                : storageUrl + authStore.authenticatedUser.profile_picture
              : 'https://picsum.photos/300'
          "
          class="rounded-full h-14 w-14 object-cover"
          alt="profile-picture"
        />
        <input
          type="text"
          class="ml-6 bg-[#24222F] w-3/4 h-10 pl-4 placeholder:font-helvetica-neue rounded-lg"
          placeholder="Write a comment"
          @keyup.enter="
            createComment(authStore.authenticatedUser.id, quotesStore.quote.id, $event.target)
          "
        />
      </div>
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
    </div>
  </div>
</template>
<script setup>
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import UserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import { useRouter } from 'vue-router'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { writeComment } from '@/services/api.js'
import { deleteQuote } from '@/services/api.js'
import { getSingleQuote } from '@/services/api.js'

import { ref } from 'vue'

const router = useRouter()
const quotesStore = useQuotesStore()
const authStore = useAuthStore()
const moviesStore = useMoviesStore()
const storageUrl = import.meta.env.VITE_API_STORAGE

let isLoading = ref(true)
let amountOfCommentsVisible = ref(2)
let toggleVisibility = false
let showQuoteDeleteModal = ref(false)

getSingleQuote(router.currentRoute.value.params.id).then((response) => {
  quotesStore.initQuote(response.data)
  isLoading.value = false
})

function createComment(userId, quoteId, comment) {
  writeComment(quoteId, userId, comment).then((response) => {
    comment.value = ''
    if (response.status === 200) {
      quotesStore.quote.comments.push(response.data)
    }
  })
}

function changeCommentsVisibility() {
  if (toggleVisibility && quotesStore.quote.comments.length >= 2) {
    toggleVisibility = false
    amountOfCommentsVisible.value = 2
  } else {
    toggleVisibility = true
    amountOfCommentsVisible.value = quotesStore.quote.comments.length
  }
}

function editQuote() {
  router.push({ name: 'edit-quote' })
}
function removeQuote() {
  deleteQuote(router.currentRoute.value.params.id).then(() => {
    showQuoteDeleteModal.value = false
    moviesStore.movie.quotes = moviesStore.movie.quotes.filter(
      (quote) => quote.id !== router.currentRoute.value.params.id
    )
    router.back()
  })
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
</style>
