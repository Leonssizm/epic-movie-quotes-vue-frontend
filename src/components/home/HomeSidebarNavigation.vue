<template>
  <nav
    class="lg:ml-4 lg:pl-10 px-16 pt-16 lg:px-0 lg: pt-10 absolute bg-[#11101A] lg:bg-[#181624] fixed inset-0 w-80 h-3/4 lg:static lg:h-auto lg:w-auto"
  >
    <div class="text-[#FFFFFF] font-helvetica-neue flex">
      <img
        :src="'http://127.0.0.1:8000/storage/' + profilePicture"
        class="rounded-full h-14 w-14 object-cover"
        alt="profile-picture"
      />
      <div class="flex flex-col justify-center">
        <h2 class="ml-6">{{ username }}</h2>
        <RouterLink to="/edit-profile" class="text-[#CED4DA] ml-6">edit your profile</RouterLink>
      </div>
    </div>
    <div class="flex mt-10 ml-2 justify-between text-[#FFFFFF]">
      <RouterLink to="/home">
        <div class="flex items-center">
          <IconHome class="mr-12 items-center" /> News feed
        </div></RouterLink
      >
    </div>
    <div class="flex mt-10 justify-between items-center text-[#FFFFFF]">
      <RouterLink to="/home"
        ><div class="flex items-center"><IconCamera class="ml-2 mr-12" /> List of Movies</div>
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import IconHome from '@/components/icons/IconHome.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import { getAuthenticatedUser } from '@/services/api.js'
import { useAuthStore } from '@/stores/useAuthStore'

import { ref } from 'vue'

let username = ref('')
let profilePicture = ref('')
const store = useAuthStore()

getAuthenticatedUser().then((response) => {
  username.value = response.data.username
  profilePicture.value = response.data.profile_picture
  store.initAuthUser(response.data)
})
</script>
