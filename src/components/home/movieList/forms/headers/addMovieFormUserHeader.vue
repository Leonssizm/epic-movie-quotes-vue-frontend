<template>
  <div class="text-[#FFFFFF] font-helvetica-neue flex pt-4 pl-8">
    <img
      v-if="photoIsLoaded"
      :src="
        authStore.authenticatedUser.profile_picture
          ? authStore.authenticatedUser.profile_picture.includes('http')
            ? authStore.authenticatedUser.profile_picture
            : storageUrl + authStore.authenticatedUser.profile_picture
          : 'https://picsum.photos/300'
      "
      class="rounded-full h-14 w-14 object-cover"
      alt="profile-picture"
    />
    <div class="flex flex-col justify-center">
      <h2 class="ml-6">{{ authStore.authenticatedUser.username }}</h2>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
let photoIsLoaded = ref(false)

onMounted(() => {
  photoIsLoaded.value = true
})
</script>
