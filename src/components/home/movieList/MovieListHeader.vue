<template>
  <div class="pt-6">
    <div class="text-[#FFFFFF] flex lg:items-center justify-around lg:justify-between ml-3 lg:ml-0">
      <h1 class="text-[#FFFFFF] font-bold font-helvetica-neue text-xl lg:ml-[9rem]">
        My List of movies <br class="lg:hidden" />(total {{ store.getMoviesAmount }})
      </h1>
      <div :class="{ 'w-1/7': isExpanded, 'w-1/6': !isExpanded }" class="mr-10 lg:flex">
        <IconQuestionMark class="mt-3 hidden lg:flex" />
        <input
          @click="isExpanded = !isExpanded"
          placeholder="search"
          class="h-12 bg-[#181624] ml-2 hidden lg:flex"
          :class="{ 'w-full': isExpanded, 'w-[5rem]': !isExpanded }"
          type="search"
        />
        <button
          class="ml-2 mt-2 lg:mt-0 w-24 h-8 lg:w-28 lg:h-10 bg-red-700 border border-red-700 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221] flex justify-around items-center"
          @click="openAddMovieModal"
        >
          <IconPlus />
          Add Movie
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useMoviesStore()
const router = useRouter()

let isExpanded = ref(false)

function openAddMovieModal() {
  router.push({ name: 'add-movie' })
}
</script>
