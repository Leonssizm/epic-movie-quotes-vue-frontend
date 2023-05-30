<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <IconCheckmark class="mb-4" />
          <h1 class="text-3xl text-[#FFFFFF] text-medium font-helvetica-neue">Success!</h1>
          <p class="font-normal text-xs text-[#FFFFFF] font-helvetica-neue mt-4">
            Your Password changed Successfully
          </p>
          <RouterLink
            to="/login"
            class="mb-4 mt-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >Log in</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
</script>
