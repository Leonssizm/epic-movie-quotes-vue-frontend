<template>
  <div class="hidden lg:flex">
    <div class="relative">
      <select
        class="px-3 py-1.5 w-24 h-9 rounded-md text-white text-base leading-6 bg-transparent appearance-none"
      >
        <option value="en" class="text-black" selected>Eng</option>
        <option value="ka" class="text-black">Geo</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
        <IconArrowDown class="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
</template>
<script setup>
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
</script>
