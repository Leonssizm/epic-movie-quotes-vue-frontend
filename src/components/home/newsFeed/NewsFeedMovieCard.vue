<template>
  <div v-for="movie in store.movies[0]" :key="movie.id">
    <h1 class="text-white">{{ movie.title }}</h1>
  </div>
</template>
<script setup>
import axios from '@/plugins/axios/index.js'
import { useMoviesStore } from '@/stores/useMoviesStore'

const store = useMoviesStore()

axios.get('movies').then((response) => store.initMovies(response.data))

console.log(store.movies)
</script>
