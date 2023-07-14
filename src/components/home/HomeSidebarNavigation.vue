<template>
  <nav
    class="lg:ml-4 lg:pl-10 px-16 pt-16 lg:px-0 lg: pt-10 absolute bg-[#11101A] lg:bg-[#181624] fixed inset-0 w-80 h-3/4 lg:static lg:h-auto lg:w-auto"
  >
    <div class="text-[#FFFFFF] font-helvetica-neue flex">
      <img
        v-if="photoIsLoaded"
        :src="
          profilePicture.includes('base64')
            ? profilePicture
            : profilePicture.includes('http')
            ? profilePicture
            : storageUrl + profilePicture
        "
        class="rounded-full h-14 w-14 object-cover"
        alt="profile-picture"
        :class="{
          'border border-red-500': router.currentRoute.value.path === '/edit-profile'
        }"
      />
      <div class="flex flex-col justify-center">
        <h2 class="ml-6">{{ username }}</h2>
        <RouterLink :to="{ name: 'profile' }" class="text-[#CED4DA] ml-6">{{
          $t('homePage.sidebar.edit_profile')
        }}</RouterLink>
      </div>
    </div>
    <div class="flex mt-10 ml-2 justify-between text-[#FFFFFF]">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center">
          <IconHome
            class="mr-12 items-center"
            :fill="router.currentRoute.value.path === '/home' ? 'red' : 'white'"
          />
          {{ $t('homePage.sidebar.news_feed') }}
        </div></RouterLink
      >
    </div>
    <div class="flex mt-10 justify-between items-center text-[#FFFFFF]">
      <RouterLink :to="{ name: 'movies-list' }"
        ><div class="flex items-center">
          <IconCamera
            class="ml-2 mr-12"
            :fill="router.currentRoute.value.path === '/movies/list' ? 'red' : 'white'"
          />
          {{ $t('homePage.sidebar.movies_list') }}
        </div>
      </RouterLink>
    </div>

    <div class="mt-10 ml-1 block lg:hidden flex flex-col">
      <button
        @click="handleLogout"
        class="mr-4 w-20 h-8 block lg:hidden border border-white rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6"
      >
        {{ $t('homePage.news_feed.log_out') }}
      </button>
    </div>
  </nav>
</template>
<script setup>
import IconHome from '@/components/icons/IconHome.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import { getAuthenticatedUser } from '@/services/api.js'
import { useAuthStore } from '@/stores/useAuthStore'
import { logout } from '@/services/api.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
let username = ref('')
let profilePicture = ref('')
let isGoogleUser = ref(false)
const store = useAuthStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
let photoIsLoaded = ref(false)

getAuthenticatedUser().then((response) => {
  if (response.data.google_id) {
    isGoogleUser.value = true
  }
  username.value = response.data.username
  profilePicture.value = response.data.profile_picture
  store.initAuthUser(response.data)
  if (profilePicture.value) {
    photoIsLoaded.value = true
  }
})

function handleLogout() {
  logout('log-out').then(() => {
    store.authenticateOrLogoutUser(false)
    router.push({ name: 'landing' })
  })
}
</script>
