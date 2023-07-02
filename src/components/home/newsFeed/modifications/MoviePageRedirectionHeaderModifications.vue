<template>
  <img
    :src="
      moviesStore.movie.image ? storageUrl + moviesStore.movie.image : 'https://picsum.photos/300'
    "
    alt="movie-thumbnail"
    class="lg:w-[17rem] lg:h-[12rem] w-[10rem] h-[8rem] rounded-xl ml-10"
  />
  <div class="font-helvetica-neue text-2xl font-bold flex flex-col ml-4">
    <h1 class="text-[#DDCCAA]" v-if="locale == 'en'">
      {{ moviesStore.movie.title.en }} ({{ moviesStore.movie.release_year.slice(0, 4) }})
    </h1>
    <h1 class="text-[#DDCCAA]" v-else>
      {{ moviesStore.movie.title.ka }} ({{ moviesStore.movie.release_year.slice(0, 4) }})
    </h1>

    <span v-if="locale === 'en'" class="flex flex-wrap mt-3">
      <p
        v-for="(genre, index) in moviesStore.movie.genres"
        :key="genre.id"
        class="text-white bg-gray-500 p-2 rounded mt-2"
        :class="{
          'ml-2': index !== 0
        }"
      >
        {{ genre.name.en }}
      </p>
    </span>
    <span v-else class="flex flex-wrap mt-3">
      <p
        class="text-white bg-gray-500 p-2 rounded mt-2"
        v-for="(genre, index) in moviesStore.movie.genres"
        :key="genre.id"
        :class="{
          'ml-2': index !== 0
        }"
      >
        {{ genre.name.ka }}
      </p>
    </span>

    <div class="flex mt-4">
      <p class="text-white text-xl" v-if="locale === 'en'">
        Director: {{ moviesStore.movie.director.en }}
      </p>
      <p class="text-white text-xl" v-else>Director: {{ moviesStore.movie.director.en }}</p>
    </div>
  </div>
</template>
<script setup>
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useI18n } from 'vue-i18n'

const locale = useI18n().locale
const moviesStore = useMoviesStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
</script>
