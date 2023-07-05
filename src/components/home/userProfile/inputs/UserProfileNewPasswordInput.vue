<template>
  <div class="flex flex-col">
    <label class="pb-2 font-helvetica-neue lg:ml-44"> {{ $t('userProfile.new_password') }} </label>
    <div class="flex justify-center flex-col items-center">
      <div class="relative">
        <Field
          :type="passwordVisible ? 'text' : 'password'"
          class="mb-4 pl-1 py-3 w-[19.5rem] lg:w-[21rem] h-10 placeholder:pl-3 bg-[#24222F] text-[#FFFFFF] border-b-2 lg:bg-[#CED4DA] lg:text-black lg:border lg:border-gray-300 lg:rounded"
          @input="$emit('update:modelValue', $event.target.value)"
          v-model="initialValue"
          name="password"
          rules="required|min:8|max:15|password"
        />
        <IconEye
          class="absolute right-1 top-5 transform -translate-y-1/2"
          @click="passwordVisible = !passwordVisible"
        />
      </div>
      <ErrorMessage name="password" class="text-red-500 mb-2" />
    </div>
  </div>
</template>
<script setup>
import IconEye from '@/components/icons/IconEye.vue'

import { inject, ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const initialValue = inject('newPassword')
let passwordVisible = ref('')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
