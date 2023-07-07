<template>
  <div class="flex font-helvetica-neue font-white text-xl font-bold my-10 lg:mr-[50rem]">
    <p class="flex items-center justify-center text-2xl">
      {{ $t('homePage.movie_page.total_quotes', { total: moviesStore.movie.quotes.length }) }}
    </p>
    <div class="text-gray-600 mx-4 h-10 text-3xl">|</div>
    <button
      :disabled="authStore.authenticatedUser.id !== moviesStore.movie.user_id"
      @click="addQuote"
      class="ml-2 mt-2 lg:mt-0 w-24 h-8 lg:w-28 lg:h-10 bg-red-700 border border-red-700 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221] flex justify-around items-center"
    >
      <IconPlus />
      {{ $t('homePage.movie_page.add_quote') }}
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
        <p class="italic text-xl mx-3 text-center flex items-center ml-5" v-if="locale === 'en'">
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
          :to="{ name: 'edit-quote', params: { id: quote.id } }"
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
import { ref } from 'vue'
import { deleteQuote } from '@/services/api.js'
import { useI18n } from 'vue-i18n'

let showQuoteDeleteModal = ref(false)
let currentChosenQuoteId = ref('')
const moviesStore = useMoviesStore()
const authStore = useAuthStore()
const router = useRouter()
const locale = useI18n().locale
const storageUrl = import.meta.env.VITE_API_STORAGE

function toggleMenu(quoteId) {
  currentChosenQuoteId.value = quoteId
  const quote = moviesStore.movie.quotes.find((q) => q.id === quoteId)
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
function addQuote() {
  router.push({ name: 'add-quote' })
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
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.3s;
}

.quote-fade-enter,
.quote-fade-leave-to {
  opacity: 0;
}
</style>
