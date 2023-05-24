<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <IconSendEmail />
          <h1 class="text-4xl text-[#FFFFFF] text-medium font-helvetica-neue mt-6">Thank you!</h1>
          <p class="mt-8 font-normal text-[#FFFFFF] text-base mb-10">
            Please check your email and follow the instructions to activite your account
          </p>
          <a
            href="https://www.gmail.com"
            target="_blank"
            class="mb-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >Go to my email</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconSendEmail from '@/components/icons/IconSendEmail.vue'
</script>
