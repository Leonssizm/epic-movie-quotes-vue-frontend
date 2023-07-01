<template>
  <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center">
    <div class="bg-teal-400 mt-10 border flex h-[5rem] items-center">
      <IconCheckmark class="bg-green-800 rounded-full mx-10 w-7 h-7" />
      <h1 class="font-helvetica-neue text-[#0F5132] mr-10">Changes updated succsessfully</h1>
      <button class="text-2xl text-gray-500 mr-3" @click="$emit('closeSuccessModal', false)">
        x
      </button>
    </div>
  </div>
</template>
<script setup>
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
</script>
