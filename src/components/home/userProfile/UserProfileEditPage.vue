<template>
  <HomeHeader @changeSidebarVisibility="handleSidebarVisibility" />
  <div class="bg-[#181624]">
    <div class="lg:float-left">
      <transition name="slide-fade">
        <HomeSidebarNavigation v-if="displaySidebar" />
      </transition>
    </div>
    <div class="text-white flex justify-center items-center flex-col lg:mr-60">
      <UserProfileEditModal />
    </div>
  </div>
</template>
<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeSidebarNavigation from '@/components/home/HomeSidebarNavigation.vue'
import UserProfileEditModal from '@/components/home/userProfile/UserProfileEditModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'

let displaySidebar = ref(false)
document.title = 'Edit User'

onMounted(() => {
  document.body.addEventListener('click', handleSidebarVisibility)
})
onUnmounted(() => {
  document.body.removeEventListener('click', handleSidebarVisibility)
})

function handleSidebarVisibility() {
  let resolution = ref(window.innerWidth)
  if (document.body.classList.contains('overflow-hidden') && resolution.value <= 768) {
    displaySidebar.value = true
    document.body.classList.remove('overflow-hidden')
  } else if (resolution.value > 768) {
    displaySidebar.value = true
    document.body.classList.remove('overflow-hidden')
  } else {
    displaySidebar.value = false
    document.body.classList.remove('overflow-hidden')
  }
}
</script>
