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
        <p class="mr-3">{{ quote.comments.amount }}</p>
        <button>
          <IconChat />
        </button>
      </div>
      <div class="flex">
        <p class="mr-3">10</p>
        <button>
          <IconHeart />
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
import axios from '@/plugins/axios/index.js'
import { useQuotesStore } from '@/stores/useQuotesStore'
import IconChat from '@/components/icons/IconChat.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'

const locale = useI18n().locale
const store = useQuotesStore()
let page = ref(1)
let noMoreQuotes = ref(false)

onMounted(() => {
  window.addEventListener('scroll', fetchPosts)
  getPosts(page.value)
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

function getPosts(page) {
  axios
    .get('quotes', {
      params: { page: page }
    })
    .then((response) => {
      store.initQuotes(response.data.data)
      if (response.data.data.length === 0) {
        noMoreQuotes.value = true
      }
    })
}

function fetchPosts() {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollableHeight = documentHeight - windowHeight
  const scrollPosition = window.scrollY
  if (scrollPosition >= scrollableHeight) {
    page.value += 1
    setTimeout(() => {
      getPosts(page.value)
    }, 800)

    // if(store.getQuoteAmount == )
  }
}
</script>

<style scoped></style>
