<template>
  <div class="flex flex-col items-center mt-10 text-[#FFFFFF]">
    <div class="flex flex-col">
      <div class="relative">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !engMovieDescriptionInputFocused,
            'text-xs': engMovieDescriptionInputFocused,
            'text-gray-600': engMovieDescriptionInputFocused
          }"
        >
          Movie Description
        </p>
        <Field
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] h-[4rem] w-[22rem] pl-28 rounded"
          @focus="engMovieDescriptionInputFocused = true"
          @blur="
            () => {
              if (!engDescription) {
                engMovieDescriptionInputFocused = false
              }
            }
          "
          v-model="initialEngDescriptionValue"
          as="textarea"
          name="engMovieDescription"
          rules="required|min:5|engLetters"
        ></Field>
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Eng</p>
      </div>
      <ErrorMessage name="engMovieDescription" class="text-red-500" />
    </div>
    <div class="flex flex-col">
      <div class="relative mt-8">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !geoMovieDescriptionInputFocused,
            'text-xs': geoMovieDescriptionInputFocused,
            'text-gray-600': geoMovieDescriptionInputFocused
          }"
        >
          ფილმის აღწერა
        </p>
        <Field
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] h-[4rem] w-[22rem] pl-28 rounded"
          @focus="geoMovieDescriptionInputFocused = true"
          @blur="
            () => {
              if (!geoDescription) {
                geoMovieDescriptionInputFocused = false
              }
            }
          "
          v-model="initialGeoDescriptionValue"
          as="textarea"
          name="geoMovieDescription"
          rules="required|min:5|geoLetters"
        ></Field>
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Geo</p>
      </div>
      <ErrorMessage name="geoMovieDescription" class="text-red-500 mb-2" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, inject, onMounted } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

let engMovieDescriptionInputFocused = ref(false)
let geoMovieDescriptionInputFocused = ref(false)

defineProps({
  engDescription: {
    type: String,
    required: true
  },
  geoDescription: {
    type: String,
    required: true
  }
})

const initialEngDescriptionValue = inject('engDescription')
const initialGeoDescriptionValue = inject('geoDescription')

defineEmits(['update:engDescription', 'update:geoDescription'])

onMounted(() => {
  if (initialEngDescriptionValue.value) {
    engMovieDescriptionInputFocused.value = true
  }
  if (initialGeoDescriptionValue.value) {
    geoMovieDescriptionInputFocused.value = true
  }
})
</script>
