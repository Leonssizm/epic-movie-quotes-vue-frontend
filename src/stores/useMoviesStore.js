import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    movie: [],
    allUserMovies: []
  }),
  actions: {
    initMovies(movies) {
      this.movies = [...this.movies, ...movies]
    },
    initIndividualMovie(movie) {
      this.movie = movie
    },
    initAllUserMovies(movies) {
      this.allUserMovies = movies
    }
  },
  getters: {
    getMoviesAmount() {
      return this.movies.length
    }
  }
})
