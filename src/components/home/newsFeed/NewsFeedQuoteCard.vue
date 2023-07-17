<template>
  <div v-if="pageIsLoaded">
    <div class="flex justify-center items-center h-screen">
      <div class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"></div>
    </div>
  </div>
  <div
    :class="{
      'h-screen overflow-hidden': quotesStore.quotes.length === 0 || quotesStore.quotes.length === 1
    }"
    v-else
  >
    <div
      v-for="quote in quotesStore.quotes"
      :key="quote.id"
      class="mt-4 bg-[#11101A] pb-4 lg:w-[49rem]"
    >
      <div class="flex items-center pl-6 pt-2 mt-2">
        <img
          :src="
            quote.user.profile_picture
              ? quote.user.profile_picture.includes('http')
                ? quote.user.profile_picture
                : storageUrl + quote.user.profile_picture
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
        <div v-if="locale === 'en'" class="lg:flex">
          <h1 class="w-full break-words overflow-hidden">
            {{ quote.body.en }} <span class="text-[#DDCCAA]">{{ quote.movie.title.en }}</span> ({{
              quote.movie.release_year.slice(0, 4)
            }})
          </h1>
        </div>
        <div v-else>
          <h1 class="w-full break-words overflow-hidden">
            {{ quote.body.ka }} <span class="text-[#DDCCAA]">{{ quote.movie.title.ka }}</span> ({{
              quote.movie.release_year.slice(0, 4)
            }})
          </h1>
        </div>
      </div>
      <div class="flex items-center justify-center mt-6">
        <img
          :src="quote.thumbnail ? storageUrl + quote.thumbnail : 'https://picsum.photos/300'"
          class="w-[21rem] h-[21rem] lg:w-[40rem] lg:h-[40rem] object-contain"
          alt="quote-picture"
        />
      </div>
      <div class="flex ml-6 mt-6">
        <div class="flex mr-6">
          <p class="mr-3">{{ quote.comments.length }}</p>
          <button @click="changeCommentsVisibility(quote.id)">
            <IconChat />
          </button>
        </div>
        <div class="flex">
          <p class="mr-3">{{ quote.likes.length }}</p>
          <button @click="handleLikingQuote(quote.id)">
            <IconHeart
              fill="red"
              v-if="
                quote.likes.some((like) => like.pivot.user_id === authStore.authenticatedUser.id)
              "
            />
            <IconHeart v-else :fill="quote.liked ? 'red' : 'white'" />
          </button>
        </div>
      </div>
      <div class="border border-solid border-gray-700 mx-6 my-3"></div>
      <!-- Write comment -->
      <div
        class="flex items-center pl-6"
        v-for="comment in quote.comments.slice(0, amountOfCommentsVisible)"
        :key="comment.id"
      >
        <div class="flex flex-col">
          <div class="flex items-center mt-5">
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
            <p class="ml-5">
              {{ comment.user.username }}
            </p>
          </div>

          <p class="pb-3 ml-[4.8rem] w-[15rem] lg:w-[40rem] border-gray-700 border-b-2">
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
                : storageUrl + authStore.authenticatedUser.profile_picture
              : 'https://picsum.photos/200'
          "
          class="rounded-full h-14 w-14 object-cover"
          alt="profile-picture"
        />
        <input
          type="text"
          class="ml-6 bg-[#24222F] w-3/4 h-10 pl-4 placeholder:font-helvetica-neue rounded-lg"
          :placeholder="$t('homePage.news_feed.write_comment')"
          @keyup.enter="createComment(authStore.authenticatedUser.id, quote.id, $event.target)"
        />
      </div>
    </div>
    <div
      class="flex justify-center my-10"
      :class="{
        'h-screen': noMoreQuotes
      }"
      v-if="noMoreQuotes"
    >
      <h1 class="text-[#FFFFFF] text-3xl font-helvetica-neue">No more Quotes</h1>
    </div>
  </div>
</template>
<script setup>
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { getAuthenticatedUser, getQuotes, likeQuote, writeComment } from '@/services/api.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
const locale = useI18n().locale
const quotesStore = useQuotesStore()
const authStore = useAuthStore()
let storageUrl = import.meta.env.VITE_API_STORAGE

let page = ref(1)
let noMoreQuotes = ref(false)
let amountOfCommentsVisible = ref(2)
let toggleVisibility = false
let pageIsLoaded = ref(true)

onMounted(() => {
  fetchQuotes(page.value)
  window.addEventListener('scroll', fetchMoreQuotesOnScroll)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

onBeforeUnmount(() => {
  quotesStore.quotes.length = 0
  window.removeEventListener('scroll', fetchMoreQuotesOnScroll)
})

function fetchQuotes(page) {
  getQuotes(page).then((response) => {
    pageIsLoaded.value = false
    quotesStore.initQuotes(response.data)
    if (response.data.length === 0) {
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
        likedQuote.likes.length += 1
        likedQuote.liked = true
      } else {
        likedQuote.likes.length -= 1
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
