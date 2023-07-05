<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex lg:justify-center ml-10 lg:ml-0">
      <div
        @click="addQuote"
        :class="{ 'lg:w-1/5': isExpanded, 'lg:w-2/5': !isExpanded }"
        class="flex h-12 lg:bg-[#24222F] items-center rounded-md"
      >
        <IconPencil class="ml-2" /><span class="ml-10 mr-10 lg:mr-0 lg:mr-4">
          {{ $t('homePage.news_feed.add_quote') }}
        </span>
      </div>
      <div :class="{ 'w-2/5': isExpanded, 'w-1/5': !isExpanded }" class="ml-2 hidden lg:flex">
        <IconQuestionMark class="mt-3" />
        <input
          @click="isExpanded = !isExpanded"
          v-model="search"
          @keyup.enter="searchQuotes"
          :placeholder="placeholder"
          class="h-12 bg-[#181624] ml-2"
          :class="{ 'w-full': isExpanded, 'w-1/2': !isExpanded }"
          type="search"
        />
      </div>
    </div>
    <RouterView />
    <div
      v-if="nothingIsFound"
      class="h-screen w-screen bg-[#181624] text-4xl font-bold text-white font-helvetica-neue flex justify-center"
    >
      Nothing Found
    </div>
  </div>
</template>
<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'
import { useRouter } from 'vue-router'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { searchQuotesAndMovies } from '@/services/api.js'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const locale = useI18n().locale

const router = useRouter()
const quotesStore = useQuotesStore()
let search = ref('')
let nothingIsFound = ref(false)
function addQuote() {
  router.push({ name: 'add-quote' })
}

function searchQuotes() {
  searchQuotesAndMovies(search.value)
    .then((response) => {
      quotesStore.initSearchedQuotes(response.data)
      nothingIsFound.value = false

      if (response.data.length === 0) {
        nothingIsFound.value = true
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
onMounted(() => {
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})

let isExpanded = ref(false)
let placeholder = computed(() => {
  if (isExpanded.value) {
    if (locale.value === 'en') {
      return 'Enter @ to search movies, Enter # to search quotes'
    } else {
      return 'შეიყვანეთ @ ფილმების მოსაძებნად, შეიყვანეთ # ციტატების მოსაძებნად'
    }
  } else {
    if (locale.value === 'en') {
      return 'Search by'
    } else {
      return 'მოძებნე'
    }
  }
})
</script>
