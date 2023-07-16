<template>
  <div class="flex flex-col items-center mt-10 text-[#FFFFFF]">
    <div class="flex flex-col">
      <div class="relative">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': engTitleInputFocused,
            'text-xs': engTitleInputFocused,
            'text-gray-600': engTitleInputFocused
          }"
        >
          Movie title
        </p>
        <Field
          type="text"
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] h-[2rem] w-[22rem] pl-16 rounded"
          @focus="engTitleInputFocused = true"
          @blur="
            () => {
              if (!engTitle) {
                engTitleInputFocused = false
              }
            }
          "
          @input="$emit('update:engTitle', $event.target.value)"
          v-model="initialEngTitleValue"
          rules="required|engLetters|min:3"
          name="engTitle"
        />
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Eng</p>
      </div>
      <ErrorMessage name="engTitle" class="text-red-500 mb-2" />
    </div>
    <div class="flex flex-col">
      <div class="relative mt-8">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !geoTitleInputFocused,
            'text-xs': geoTitleInputFocused,
            'text-gray-600': geoTitleInputFocused
          }"
        >
          ფილმის სახელი
        </p>
        <Field
          type="text"
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] h-[2rem] w-[22rem] pl-28 rounded"
          @focus="geoTitleInputFocused = true"
          @blur="
            () => {
              if (!geoTitle) {
                geoTitleInputFocused = false
              }
            }
          "
          @input="$emit('update:geoTitle', $event.target.value)"
          v-model="initialGeoTitleValue"
          name="geoTitle"
          rules="required|geoLetters|min:3"
        />
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Geo</p>
      </div>
      <ErrorMessage name="geoTitle" class="text-red-500 mb-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, defineProps, defineEmits, onMounted } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

let engTitleInputFocused = ref(false)
let geoTitleInputFocused = ref(false)

defineProps({
  engTitle: {
    type: String,
    required: true
  },
  geoTitle: {
    type: String,
    required: true
  }
})

const initialEngTitleValue = inject('engTitle')
const initialGeoTitleValue = inject('geoTitle')

defineEmits(['update:engTitle', 'update:geoTitle'])

onMounted(() => {
  if (initialEngTitleValue.value) {
    engTitleInputFocused.value = true
  }
  if (initialGeoTitleValue.value) {
    geoTitleInputFocused.value = true
  }
})
</script>
