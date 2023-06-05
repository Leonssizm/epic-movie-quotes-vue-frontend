<template>
  <HomeHeader />
  <div class="bg-[#181624] h-screen">
    <div class="flex flex-grow">
      <HomeSidebarNavigation />
      <!-- Cards, search & add-->
      <div class="text-[#FFFFFF] grow flex items-center justify-center"><h1>CARDS</h1></div>
    </div>
  </div>
</template>
<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeSidebarNavigation from '@/components/home/HomeSidebarNavigation.vue'
</script>
