<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-10"
        >
          <IconSendEmail />
          <h1 class="text-4xl text-[#FFFFFF] text-medium font-helvetica-neue mt-6 mb-4">
            Check your email
          </h1>
          <p class="font-normal text-xs text-[#FFFFFF] font-helvetica-neue mt-2 mb-10">
            We have sent a password recover instructions to your email
          </p>
          <a
            href="https://www.gmail.com"
            target="_blank"
            class="mb-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
          >
            {{ $t('landing.registration_email.button') }}</a
          >
          <RouterLink to="/" class="font-normal text-xs text-[#6C757D] font-helvetica-neue"
            >Skip, I'll confirm later</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconSendEmail from '@/components/icons/IconSendEmail.vue'
import { RouterLink } from 'vue-router'
</script>
