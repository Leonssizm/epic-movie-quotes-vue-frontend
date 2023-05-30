<template>
  <HeaderHome />
  <div class="bg-[#181624] h-screen">
    <div class="flex flex-grow">
      <nav class="ml-16 pt-6">
        <div class="text-[#FFFFFF] font-helvetica-neue flex">
          <img src="/images/interstellar-banner.png" class="rounded-full h-14 w-14 object-cover" />
          <div class="flex flex-col justify-center">
            <h2 class="ml-6">Levan Kereselidze</h2>
            <button class="text-[#CED4DA]">edit your profile</button>
          </div>
        </div>
      </nav>
      <!-- Cards, search & add-->
      <div class="text-[#FFFFFF] grow flex items-center justify-center"><h1>CARDS</h1></div>
    </div>
  </div>
</template>
<script setup>
import HeaderHome from '@/components/home/HeaderHome.vue'
</script>
