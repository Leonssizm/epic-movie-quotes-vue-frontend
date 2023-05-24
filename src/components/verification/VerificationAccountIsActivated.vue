<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <IconCheckmark v-if="success" />
          <h1 class="text-4xl text-[#FFFFFF] text-medium font-helvetica-neue mt-6">
            {{ messageHeader }}
          </h1>
          <p class="mt-8 font-normal text-[#FFFFFF] text-base mb-10" v-if="success">
            Your account has been activated.
          </p>
          <RouterLink
            v-if="success"
            to="/login"
            class="mb-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >Go to my news feed</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
import axios from '@/plugins/axios/index.js'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
let messageHeader = ref('')
let success = true

onBeforeMount(() => {
  if (localStorage.getItem('verification-token') === router.currentRoute.value.query.token) {
    messageHeader.value = 'Thank You'
    success = true
    axios.post('users/email-verification-date', {
      token: router.currentRoute.value.query.token,
      email_verified_at: Date()
    })
  } else {
    messageHeader.value = 'Something Went wrong'
    success = false
  }
})
</script>
