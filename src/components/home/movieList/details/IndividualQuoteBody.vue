<template>
  <UserHeader />
  <div class="relative flex justify-center mt-3">
    <input
      class="border border-gray-300 bg-[#11101A] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
      disabled
      :value="quotesStore.quote.body.en"
    />
    <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Eng</p>
  </div>
  <div class="relative flex justify-center mt-3">
    <input
      class="border border-gray-300 bg-[#11101A] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
      disabled
      :value="quotesStore.quote.body.ka"
    />
    <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Geo</p>
  </div>
  <!-- image -->
  <div class="flex items-center justify-center mt-4">
    <img
      :src="
        quotesStore.quote.thumbnail
          ? storageUrl + quotesStore.quote.thumbnail
          : 'https://picsum.photos/300'
      "
      class="lg:w-[50rem] lg:h-[25rem]"
      alt="quote-picture"
    />
  </div>
</template>
<script setup>
import UserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import { useQuotesStore } from '@/stores/useQuotesStore'

const quotesStore = useQuotesStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
</script>
