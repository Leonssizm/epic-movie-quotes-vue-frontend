<template>
  <div class="flex flex-col">
    <label class="pb-2 font-helvetica-neue lg:ml-44">Password Confirmation</label>
    <div class="flex justify-center items-center flex-col">
      <Field
        type="password"
        class="mb-4 pl-1 py-3 w-[23rem] lg:w-[21rem] h-10 placeholder:pl-3 bg-[#24222F] text-[#FFFFFF] border-b-2 lg:bg-[#CED4DA] lg:text-black lg:border lg:border-gray-300 lg:rounded"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="initialValue"
        name="confirm_password"
        rules="required|confirmed:@password"
      />
      <ErrorMessage name="confirm_password" class="text-red-500 mb-2" />
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const initialValue = inject('newPasswordConfirmation')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
