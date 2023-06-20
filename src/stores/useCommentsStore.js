import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: []
  }),
  actions: {
    initComments(comments) {
      this.comments = [...this.comments, ...comments]
    }
  },
  getters: {}
})
