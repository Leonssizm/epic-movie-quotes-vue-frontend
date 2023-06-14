<template>
  <div v-for="quote in store.quotes" :key="quote.id" class="mt-4 bg-[#000000] pb-4 lg:w-[49rem]">
    <div class="flex items-center pl-6 pt-2 mt-2">
      <!-- profile picture -->
      <img
        src="https://picsum.photos/200/200"
        class="rounded-full h-14 w-14 object-cover"
        alt="profile-picture"
      />
      <!-- user name -->
      <div class="ml-6 font-helvetica-neue font-normal text-[#FFFFFF]">
        <p>
          {{ quote.user.username }}
        </p>
      </div>
    </div>
    <!-- quote-body -->
    <div class="text-[#FFFFFF] mt-6 pl-6 lg:pr-80">
      <div v-if="locale === 'en'" class="flex">
        <h1 class="w-[22rem] lg:w-64">{{ quote.body.en }}</h1>
      </div>
      <div v-else>
        <h1 class="w-[22rem] lg:w-64">{{ quote.body.ka }}</h1>
      </div>
    </div>
    <div class="flex items-center justify-center mt-6">
      <!-- image -->
      <img src="https://picsum.photos/300" class="lg:w-5/6" alt="quote-picture" />
    </div>
    <!-- likes and comments -->
    <div class="flex ml-6 mt-6">
      <div class="flex mr-6">
        <p class="mr-3">{{ quote.amountOfComments }}</p>
        <button>
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
  </div>

  <!-- no more quotes to fetch -->

  <div class="flex justify-center my-10" v-if="noMoreQuotes">
    <h1 class="text-[#FFFFFF] text-3xl font-helvetica-neue">No more Quotes</h1>
  </div>
</template>
<script setup>
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useI18n } from 'vue-i18n'
import { getAuthenticatedUser, getQuotes, likeQuote } from '@/services/api.js'
import { onMounted, ref } from 'vue'

const locale = useI18n().locale
const store = useQuotesStore()
let page = ref(1)
let noMoreQuotes = ref(false)

onMounted(() => {
  fetchQuotes(page.value)
  window.addEventListener('scroll', fetchMoreQuotesOnScroll)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

function fetchQuotes(page) {
  getQuotes(page).then((response) => {
    store.initQuotes(response.data.data)
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
      const likedQuote = store.quotes.find((quote) => quote.id === quoteId)
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
</script>
