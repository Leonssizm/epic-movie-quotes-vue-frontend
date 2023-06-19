<template>
  <div class="flex flex-col">
    <label class="pb-2 font-helvetica-neue lg:ml-44">Email</label>
    <div class="flex justify-center">
      <input
        type="text"
        disabled
        class="mb-4 pl-1 lg:mr-11 w-[23rem] lg:w-[21rem] h-10 placeholder:pl-3 bg-[#24222F] text-[#FFFFFF] border-b-2 lg:bg-[#CED4DA] lg:text-black lg:border lg:border-gray-300 lg:rounded"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="initialValue"
      />
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'

const initialValue = inject('email')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
