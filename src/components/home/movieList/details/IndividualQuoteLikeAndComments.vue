<template>
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
        <button @click="removeQuote" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { deleteQuote, getAuthenticatedUser, writeComment, likeQuote } from '@/services/api.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const quotesStore = useQuotesStore()
const authStore = useAuthStore()
const moviesStore = useMoviesStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
let showQuoteDeleteModal = ref(false)
let amountOfCommentsVisible = ref(2)
let toggleVisibility = false

function changeCommentsVisibility() {
  if (toggleVisibility && quotesStore.quote.comments.length >= 2) {
    toggleVisibility = false
    amountOfCommentsVisible.value = 2
  } else {
    toggleVisibility = true
    amountOfCommentsVisible.value = quotesStore.quote.comments.length
  }
}

function handleLikingQuote(quoteId) {
  getAuthenticatedUser().then((response) => {
    likeQuote(quoteId, response.data.id).then((response) => {
      if (response.data === 'liked') {
        quotesStore.quote.likes.length += 1
      } else {
        quotesStore.quote.likes.length -= 1
      }
    })
  })
}
function createComment(userId, quoteId, comment) {
  writeComment(quoteId, userId, comment).then((response) => {
    comment.value = ''
    if (response.status === 200) {
      quotesStore.quote.comments.push(response.data)
    }
  })
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
