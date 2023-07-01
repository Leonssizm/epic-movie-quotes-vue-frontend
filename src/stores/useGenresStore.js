import { defineStore } from 'pinia'

export const useGenresStore = defineStore('genres', {
  state: () => ({
    genres: []
  }),
  actions: {
    initGenres(genres) {
      this.genres = [...this.genres, ...genres]
    }
  }
})
