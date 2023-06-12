import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: []
  }),
  actions: {
    initMovies(movies) {
      this.movies.push(movies)
    }
  }
})
