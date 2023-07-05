import { defineStore } from 'pinia'

export const useQuotesStore = defineStore('quotes', {
  state: () => ({
    quotes: [],
    quote: []
  }),
  actions: {
    initQuotes(quotes) {
      this.quotes = [...this.quotes, ...quotes]
    },
    initQuote(quote) {
      this.quote = quote
    },
    initSearchedQuotes(quote) {
      this.quotes = quote
    }
  },
  getters: {
    getQuoteAmount() {
      return this.quotes.length
    },
    getLikesAmount() {
      this.quotes.map((quote) => {
        quote.amountOfLikes = quote.likes.length
      })
    },
    getCommentsAmount() {
      this.quotes.map((quote) => {
        quote.amountOfComments = quote.comments.length
      })
    }
  }
})
