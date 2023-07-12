<template>
  <div v-if="isLoading">
    <div class="flex justify-center items-center h-screen">
      <div class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"></div>
    </div>
  </div>
  <div v-else class="h-screen bg-[#181623] flex justify-center">
    <div class="bg-[#11101A] overflow-y-scroll lg:w-1/2 w-full lg:mt-10">
      <div class="flex items-start py-8 border-b-2 border-gray-800">
        <div
          class="flex justify-around w-36 items-center"
          v-if="authStore.authenticatedUser.id === quotesStore.quote.user_id"
        >
          <IconEdit @click="editQuote" />
          <div class="text-gray-600">|</div>
          <IconDelete @click="showQuoteDeleteModal = true" />
        </div>
        <h1
          class="text-white font-helvetica-neue text-2xl font-bold mx-auto ml-48 hidden lg:block"
          :class="{
            'ml-[20rem]': authStore.authenticatedUser.id !== quotesStore.quote.user_id
          }"
        >
          View Quote
        </h1>
        <button class="text-2xl text-white mr-10 ml-auto lg:ml-0" @click="router.back()">x</button>
      </div>
      <IndividualQuoteBody />
      <IndividualQuoteLikeAndCommentPanel />
    </div>
  </div>
</template>
<script setup>
import IndividualQuoteBody from '@/components/home/movieList/details/IndividualQuoteBody.vue'
import IndividualQuoteLikeAndCommentPanel from '@/components/home/movieList/details/IndividualQuoteLikeAndComments.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { useRouter } from 'vue-router'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { getSingleQuote } from '@/services/api.js'
import { ref } from 'vue'

const router = useRouter()
const quotesStore = useQuotesStore()
const authStore = useAuthStore()
let isLoading = ref(true)
let showQuoteDeleteModal = ref(false)

getSingleQuote(router.currentRoute.value.params.id).then((response) => {
  quotesStore.initQuote(response.data)
  isLoading.value = false
})

function editQuote() {
  router.push({ name: 'edit-quote' })
}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
