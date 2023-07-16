<template>
  <div class="flex flex-col items-center mt-10 text-[#FFFFFF]">
    <div class="flex flex-col">
      <div class="relative">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !engDirectorInputFocused,
            'text-xs': engDirectorInputFocused,
            'text-gray-600': engDirectorInputFocused
          }"
        >
          Director
        </p>
        <Field
          type="text"
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] lg:h-[2rem] w-[22rem] pl-16 rounded"
          @focus="engDirectorInputFocused = true"
          @blur="
            () => {
              if (!engDirector) {
                engDirectorInputFocused = false
              }
            }
          "
          @input="$emit('update:engDirector', $event.target.value)"
          v-model="initialEngDirectorValue"
          name="engDirector"
          rules="required|min:3|engLetters"
        />
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Eng</p>
      </div>
      <ErrorMessage name="engDirector" class="text-red-500" />
    </div>
    <div class="flex flex-col">
      <div class="relative mt-8">
        <p
          class="absolute left-1 top-4 transform -translate-y-1/2 py-3"
          :class="{
            'text-[#FFFFFF]': !geoDirectorInputFocused,
            'text-xs': geoDirectorInputFocused,
            'text-gray-600': geoDirectorInputFocused
          }"
        >
          რეჟისორი
        </p>
        <Field
          type="text"
          class="border border-gray-500 bg-[#0D0C14] lg:w-[56rem] lg:h-[2rem] w-[22rem] pl-20 rounded"
          @focus="geoDirectorInputFocused = true"
          @blur="
            () => {
              if (!geoDirector) {
                geoDirectorInputFocused = false
              }
            }
          "
          @input="$emit('update:geoDirector', $event.target.value)"
          v-model="initialGeoDirectorValue"
          name="geoDirector"
          rules="required|min:3|geoLetters"
        />
        <p class="text-gray-600 absolute right-1 top-4 transform -translate-y-1/2">Geo</p>
      </div>
      <ErrorMessage name="geoDirector" class="text-red-500" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, inject, onMounted } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

let engDirectorInputFocused = ref(false)
let geoDirectorInputFocused = ref(false)

defineProps({
  engDirector: {
    type: String,
    required: true
  },
  geoDirector: {
    type: String,
    required: true
  }
})
const initialEngDirectorValue = inject('engDirector')
const initialGeoDirectorValue = inject('geoDirector')

defineEmits(['update:engDirector', 'update:geoDirector'])

onMounted(() => {
  if (initialEngDirectorValue.value) {
    engDirectorInputFocused.value = true
  }
  if (initialGeoDirectorValue.value) {
    geoDirectorInputFocused.value = true
  }
})
</script>
