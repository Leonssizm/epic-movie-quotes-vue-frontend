<template>
  <div
    class="h-screen bg-guards flex flex-col items-center justify-center font-helvetica-neue text-[#FFFFFF] text-center"
  >
    <img src="/images/not-found-ghost.png" class="mb-6" />
    <h1 class="text-5xl font-bold">Whoops!</h1>
    <p class="mt-4 text-2xl">We can't see the page you are looking for</p>
    <RouterLink
      :to="authStore.authenticated ? { name: 'home' } : { name: 'landing' }"
      class="mt-16 py-2 px-4 bg-red-500 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
    >
      Return home
    </RouterLink>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
</script>
