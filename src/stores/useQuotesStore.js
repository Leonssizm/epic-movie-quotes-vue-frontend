import { defineStore } from 'pinia'

export const useQuotesStore = defineStore('quotes', {
  state: () => ({
    quotes: []
  }),
  actions: {
    initQuotes(quotes) {
      this.quotes = quotes
    }
  },
  getters: {
    getQuoteAmount() {
      return this.quotes.length
    },
    getCommentsAmount() {
      this.quotes.map((quote) => {
        quote.comments.amount = quote.comments.length
      })
    }
  }
})
