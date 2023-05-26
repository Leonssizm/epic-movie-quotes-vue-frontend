<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <IconCheckmark v-if="success" />
          <IconExpiration v-if="!success" />
          <div v-if="success">
            <h1 class="text-4xl text-[#FFFFFF] text-medium font-helvetica-neue mt-6">
              {{ $t('landing.registration_result.success_header') }}
            </h1>
            <p class="mt-8 font-normal text-[#FFFFFF] text-base mb-10">
              {{ $t('landing.registration_result.success_message') }}
            </p>
          </div>
          <div v-if="!success">
            <h1 class="text-4xl text-[#FFFFFF] text-medium font-helvetica-neue mt-6">
              {{ $t('landing.registration_result.failure_header') }}
            </h1>
            <p class="mt-8 font-normal text-[#FFFFFF] text-base mb-10">
              {{ $t('landing.registration_result.failure_message') }}
            </p>
          </div>
          <RouterLink
            v-if="success"
            to="/login"
            class="mb-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >{{ $t('landing.registration_result.success_button') }}</RouterLink
          >
          <RouterLink
            @click="resendVerificationEmail"
            v-if="!success"
            to="/registration-email"
            class="mb-4 mt-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >{{ $t('landing.registration_result.failure_button') }}</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
import IconExpiration from '@/components/icons/IconExpiration.vue'
import axios from '@/plugins/axios/index.js'
import { onBeforeMount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

let success = false
onBeforeMount(() => {
  axios
    .post('users/email-verification', {
      token: router.currentRoute.value.query.token
    })
    .then(() => {
      success = true
    })
    .catch(() => {
      success = false
    })
})

function resendVerificationEmail() {
  axios.post(
    'users/resend-verification-email',
    {
      token: router.currentRoute.value.query.token
    },
    { timeout: 5000 }
  )
}
</script>
