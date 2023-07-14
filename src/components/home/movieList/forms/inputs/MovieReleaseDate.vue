<template>
  <div class="mt-12 flex justify-center">
    <div class="flex flex-col">
      <div class="relative">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !yearTitleInputFocused,
            'text-xs': yearTitleInputFocused,
            'text-gray-600': yearTitleInputFocused
          }"
        >
          წელი/Year
        </p>
        <Field
          type="number"
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] lg:h-[2rem] w-[22rem] pl-24 rounded text-white"
          @input="$emit('update:modelValue', $event.target.value)"
          v-model="initialValue"
          name="dateInput"
          rules="required|min:4|max:4"
        />
      </div>
      <ErrorMessage name="dateInput" class="text-red-500" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, defineEmits } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

let yearTitleInputFocused = ref(false)

const initialValue = inject('releaseDate')

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>
