<template>
  <input
    disabled
    type="password"
    class="mb-4 pl-1 py-3 w-[19.5rem] lg:w-[21rem] h-10 placeholder:pl-3 bg-[#24222F] text-[#FFFFFF] border-b-2 lg:bg-[#CED4DA] lg:text-black lg:border lg:border-gray-300 lg:rounded"
    @input="$emit('update:modelValue', $event.target.value)"
    v-model="initialValue"
  />
</template>
<script setup>
import { inject } from 'vue'

const initialValue = inject('password')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
