<template>
  <nav class="ml-16 pt-6">
    <div class="text-[#FFFFFF] font-helvetica-neue flex">
      <img src="/images/interstellar-banner.png" class="rounded-full h-14 w-14 object-cover" />
      <div class="flex flex-col justify-center">
        <h2 class="ml-6">Levan Kereselidze</h2>
        <button class="text-[#CED4DA]">edit your profile</button>
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
      <RouterLink to="/newsFeed"
        ><div class="flex items-center"><IconCamera class="ml-2 mr-12" /> List of Movies</div>
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import IconHome from '@/components/icons/IconHome.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
</script>
