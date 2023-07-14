<template>
  <HomeHeader @changeSidebarVisibility="handleSidebarVisibility" />
  <div class="bg-[#181624]">
    <div class="lg:float-left">
      <transition name="slide-fade">
        <HomeSidebarNavigation v-if="displaySidebar" />
      </transition>
    </div>
    <div class="text-white font-helvetica-neue">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeSidebarNavigation from '@/components/home/HomeSidebarNavigation.vue'

import { ref, onMounted, onUnmounted } from 'vue'
document.title = 'Movies'
let resolution = ref(window.innerWidth)

let displaySidebar = resolution.value <= 768 ? ref(false) : ref(true)
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

onMounted(() => {
  document.body.addEventListener('click', handleSidebarVisibility)
})

onUnmounted(() => {
  document.body.removeEventListener('click', handleSidebarVisibility)
})
</script>
