<template>
  <div class="relative flex justify-center">
    <label
      class="flex items-center border border-gray-500 lg:w-[56rem] h-[4rem] w-[22rem] rounded"
      :class="{
        'h-full': uploadedPhoto
      }"
    >
      <div v-if="uploadedPhoto" class="flex items-center justify-center h-full">
        <img
          :src="uploadedPhoto"
          alt="Uploaded Photo"
          class="h-full w-auto rounded p-3"
          :class="{
            'w-[26rem]': uploadedPhoto
          }"
        />
      </div>
      <div
        class="flex"
        :class="{
          'flex-col': uploadedPhoto,
          'lg:ml-16': uploadedPhoto
        }"
      >
        <div
          class="flex items-center ml-4"
          :class="{
            'flex-col': uploadedPhoto
          }"
        >
          <p class="uppercase text-yellow-500 font-bold mr-4" v-if="uploadedPhoto">Replace Photo</p>
          <IconPhotoCamera class="mr-2 text-white" :class="{ hidden: uploadedPhoto }" />
          <span class="mr-2 text-white" v-if="resolution >= 768"
            >Drag &amp; drop your image here</span
          >
          <span
            class="mr-2 text-white"
            v-if="!resolution <= 768"
            :class="{
              hidden: uploadedPhoto
            }"
            >Upload Image</span
          >
        </div>
        <button
          class="border border-purple-500 bg-purple-700 text-white py-1 px-2 rounded cursor-pointer"
        >
          Choose File
        </button>
      </div>
    </label>
    <Field
      type="file"
      class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      @change="handleFileInputChange"
      name="image"
      rules="required"
    />
  </div>
  <ErrorMessage name="image" class="text-red-500 mb-2 ml-8" />
</template>
<script setup>
import IconPhotoCamera from '@/components/icons/IconPhotoCamera.vue'
import { Field, ErrorMessage } from 'vee-validate'

import { ref, defineEmits } from 'vue'

let resolution = ref(window.innerWidth)
let uploadedPhoto = ref(null)
const emit = defineEmits(['update:image'])

function handleFileInputChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      uploadedPhoto.value = reader.result
    }
    reader.readAsDataURL(file)

    emit('update:image', file)
  } else {
    uploadedPhoto.value = null
  }
}
</script>
