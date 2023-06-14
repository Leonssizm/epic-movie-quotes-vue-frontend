<template>
  <HomeHeader @changeSidebarVisibility="handleSidebarVisibility" />
  <div class="bg-[#181624]">
    <div class="lg:float-left">
      <transition name="slide-fade">
        <HomeSidebarNavigation v-if="displaySidebar" />
      </transition>
    </div>
    <HomeSearchPanel />
    <div class="text-white flex justify-center items-center flex-col lg:mr-60">
      <NewsFeedQuotesCard />
    </div>
  </div>
</template>
<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeSearchPanel from '@/components/home/HomeSearchPanel.vue'
import HomeSidebarNavigation from '@/components/home/HomeSidebarNavigation.vue'
import NewsFeedQuotesCard from '@/components/home/newsFeed/NewsFeedQuoteCard.vue'

import { onMounted, ref } from 'vue'

let displaySidebar = ref(true)

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
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
