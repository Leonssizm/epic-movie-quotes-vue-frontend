<template>
  <div class="flex flex-col lg:items-center lg:mr-10">
    <label class="pb-2 font-helvetica-neue lg:mr-52">New Username</label>
    <Field
      type="text"
      class="mb-4 pl-1 py-3 w-[21rem] h-10 placeholder:pl-3 bg-[#24222F] text-[#FFFFFF] border-b-2 lg:bg-[#CED4DA] lg:text-black lg:border lg:border-gray-300 lg:rounded"
      @input="$emit('update:modelValue', $event.target.value)"
      v-model="initialValue"
      name="newUsername"
      rules="required|min:3|max:15|engLetters"
    />
    <ErrorMessage name="newUsername" class="text-red-500 mb-2" />
  </div>
</template>
<script setup>
import { inject } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const initialValue = inject('newUsername')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
