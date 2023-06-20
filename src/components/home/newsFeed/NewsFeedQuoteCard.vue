<template>
  <div
    v-for="quote in quotesStore.quotes"
    :key="quote.id"
    class="mt-4 bg-[#000000] pb-4 lg:w-[49rem]"
  >
    <!-- Quote -->
    <div class="flex items-center pl-6 pt-2 mt-2">
      <img
        :src="
          quote.user.profile_picture
            ? quote.user.profile_picture.includes('http')
              ? quote.user.profile_picture
              : 'http://127.0.0.1:8000/storage/' + quote.user.profile_picture
            : 'https://picsum.photos/300'
        "
        class="rounded-full h-14 w-14 object-cover"
        alt="profile-picture"
      />

      <div class="ml-6 font-helvetica-neue font-normal text-[#FFFFFF]">
        <p>
          {{ quote.user.username }}
        </p>
      </div>
    </div>
    <div class="text-[#FFFFFF] mt-6 pl-6 lg:pr-80">
      <div v-if="locale === 'en'" class="flex">
        <h1 class="w-[22rem] lg:w-64">{{ quote.body.en }}</h1>
      </div>
      <div v-else>
        <h1 class="w-[22rem] lg:w-64">{{ quote.body.ka }}</h1>
      </div>
    </div>
    <div class="flex items-center justify-center mt-6">
      <img src="https://picsum.photos/300" class="lg:w-2/3" alt="quote-picture" />
    </div>
    <div class="flex ml-6 mt-6">
      <div class="flex mr-6">
        <p class="mr-3">{{ quote.amountOfComments }}</p>
        <button @click="changeCommentsVisibility(quote.id)">
          <IconChat />
        </button>
      </div>
      <div class="flex">
        <p class="mr-3">{{ quote.amountOfLikes }}</p>
        <button @click="handleLikingQuote(quote.id)">
          <IconHeart :fill="quote.liked ? 'red' : 'white'" />
        </button>
      </div>
    </div>
    <div class="border border-solid border-gray-700 mx-6 my-6"></div>
    <!-- Write comment -->
    <div
      class="flex items-center pl-6"
      v-for="comment in quote.comments.slice(0, amountOfCommentsVisible)"
      :key="comment.id"
    >
      <img
        :src="
          comment.user.profile_picture
            ? comment.user.profile_picture.includes('http')
              ? comment.user.profile_picture
              : 'http://127.0.0.1:8000/storage/' + comment.user.profile_picture
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
    <!-- Comments -->
    <div class="mt-6 pl-6 flex items-center">
      <img
        :src="
          authStore.authenticatedUser.profile_picture
            ? authStore.authenticatedUser.profile_picture.includes('http')
              ? authStore.authenticatedUser.profile_picture
              : 'http://127.0.0.1:8000/storage/' + authStore.authenticatedUser.profile_picture
            : 'https://picsum.photos/200'
        "
        class="rounded-full h-14 w-14 object-cover"
        alt="profile-picture"
      />
      <input
        type="text"
        class="ml-6 bg-[#24222F] w-3/4 h-10 pl-4 placeholder:font-helvetica-neue rounded-lg"
        placeholder="Write a comment"
        @keyup.enter="createComment(authStore.authenticatedUser.id, quote.id, $event.target)"
      />
    </div>
  </div>
  <div class="flex justify-center my-10" v-if="noMoreQuotes">
    <h1 class="text-[#FFFFFF] text-3xl font-helvetica-neue">No more Quotes</h1>
  </div>
</template>
<script setup>
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { getAuthenticatedUser, getQuotes, likeQuote, writeComment } from '@/services/api.js'

import { onMounted, ref } from 'vue'
const locale = useI18n().locale
const quotesStore = useQuotesStore()
const authStore = useAuthStore()
let page = ref(1)
let noMoreQuotes = ref(false)
let amountOfCommentsVisible = ref(2)
let toggleVisibility = false
onMounted(() => {
  fetchQuotes(page.value)
  window.addEventListener('scroll', fetchMoreQuotesOnScroll)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

function fetchQuotes(page) {
  getQuotes(page).then((response) => {
    quotesStore.initQuotes(response.data.data)
    if (response.data.data.length === 0) {
      noMoreQuotes.value = true
    }
  })
}

function fetchMoreQuotesOnScroll() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPosition = window.scrollY
  if (scrollPosition >= scrollableHeight) {
    page.value += 1
    setTimeout(() => {
      fetchQuotes(page.value)
    }, 800)
  }
}
function handleLikingQuote(quoteId) {
  getAuthenticatedUser().then((response) => {
    likeQuote(quoteId, response.data.id).then((response) => {
      const likedQuote = quotesStore.quotes.find((quote) => quote.id === quoteId)
      if (response.data === 'liked') {
        likedQuote.amountOfLikes += 1
        likedQuote.liked = true
      } else {
        likedQuote.amountOfLikes -= 1
        likedQuote.liked = false
      }
    })
  })
}

function createComment(userId, quoteId, comment) {
  writeComment(quoteId, userId, comment).then((response) => {
    comment.value = ''
    if (response.status === 200) {
      quotesStore.quotes.filter((quote) => quote.id === quoteId)[0].comments.push(response.data)
    }
  })
}

function changeCommentsVisibility(quoteId) {
  if (
    toggleVisibility &&
    quotesStore.quotes.filter((quote) => quote.id === quoteId)[0].comments.length >= 2
  ) {
    toggleVisibility = false
    amountOfCommentsVisible.value = 2
  } else {
    toggleVisibility = true
    amountOfCommentsVisible.value = quotesStore.quotes.filter(
      (quote) => quote.id === quoteId
    )[0].comments.length
  }
}
</script>
