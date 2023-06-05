<template>
  <header>
    <div class="bg-[#24222F] flex items-center justify-between h-20">
      <div>
        <h1 class="text-[#DDCCAA] ml-16 hidden lg:block">Movie Quotes</h1>
      </div>
      <div class="mr-4 flex">
        <IconNotificationBell />
        <LanguageDropdown class="ml-2" />
        <button
          @click="handleLogout"
          class="lg:ml-4 lg:px-3 lg:py-2 mr-4 w-20 h-8 lg:w-24 lg:h-10 border border-white rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6"
        >
          Log out
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import IconNotificationBell from '@/components/icons/IconNotificationBell.vue'
import LanguageDropdown from '@/components/LanguageDropdown.vue'
import { useRouter } from 'vue-router'
import { getNewsFeed, logout } from '@/services/api.js'
const router = useRouter()

// Function for sanctum testing
getNewsFeed()

function handleLogout() {
  logout('log-out').then(() => {
    router.push({ name: 'landing' })
  })
}
</script>
