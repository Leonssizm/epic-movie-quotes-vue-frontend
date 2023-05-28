<template>
  <header>
    <div class="bg-[#181624] flex items-center justify-between h-20">
      <div>
        <h1 class="text-[#DDCCAA] ml-16">Movie Quotes</h1>
      </div>
      <div class="mr-4 flex">
        <IconNotificationBell />
        <LandingLanguageDropdown />
        <button
          @click="logOut"
          class="lg:ml-4 lg:px-3 lg:py-2 w-20 h-8 lg:w-24 lg:h-10 border border-white rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6"
        >
          Log out
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import axios from '@/plugins/axios/index.js'
import IconNotificationBell from '@/components/icons/IconNotificationBell.vue'
import LandingLanguageDropdown from '@/components/landing/LandingLanguageDropdown.vue'
// For testing
axios
  .get('/newsfeed', {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('auth_token')
    }
  })
  .then((data) => console.log(data))

function logOut() {
  axios
    .post('logout', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('auth_token')
      }
    })
    .then((data) => console.log(data))
}
</script>
