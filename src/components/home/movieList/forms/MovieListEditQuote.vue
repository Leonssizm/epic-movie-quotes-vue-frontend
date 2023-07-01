<template>
  <div v-if="isLoading">
    <div class="flex justify-center items-center h-screen">
      <div class="w-36 h-36 rounded-full border-8 border-dotted border-red-500 animate-spin"></div>
    </div>
  </div>
  <div v-else class="h-screen bg-[#181623] flex justify-center">
    <div class="bg-[#000000] overflow-y-scroll lg:w-1/2 w-full lg:mt-10 mb-36">
      <Form @submit="editQuote">
        <div class="flex items-start py-8 border-b-2 border-gray-800">
          <div class="flex justify-around w-36 items-center">
            <button type="button" class="text-gray-500 flex" @click="showDeleteModal = true">
              <IconDelete class="mr-2" /> Delete
            </button>
          </div>
          <h1
            class="text-white font-helvetica-neue text-2xl font-bold mx-auto ml-48 hidden lg:block"
          >
            Edit Quote
          </h1>
          <button
            class="text-2xl text-white mr-10 ml-auto lg:ml-0"
            @click="router.back()"
            type="button"
          >
            x
          </button>
        </div>
        <UserHeader />
        <div class="flex flex-col">
          <div class="relative flex justify-center mt-5">
            <Field
              class="border border-gray-300 bg-[#000000] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
              name="quoteEn"
              rules="min:3|engLetters"
              v-model="englishQuote"
            />
            <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Eng</p>
          </div>
          <ErrorMessage name="quoteEn" class="text-red-500 m-3" />
        </div>
        <div class="flex flex-col">
          <div class="relative flex justify-center mt-5">
            <Field
              class="border border-gray-300 bg-[#000000] lg:w-[50rem] h-[2.5rem] w-[22rem] pl-5 italic"
              name="quoteKa"
              rules="min:3|geoLetters"
              v-model="georgianQuote"
            />
            <p class="text-gray-600 absolute right-5 top-4 transform -translate-y-1/2">Geo</p>
          </div>
          <ErrorMessage name="quoteKa" class="text-red-500 m-3" />
        </div>
        <!-- image -->
        <div class="relative">
          <div class="flex items-center justify-center mt-6">
            <img
              :src="
                quotesStore.quote.thumbnail
                  ? storageUrl + quotesStore.quote.thumbnail
                  : uploadedPhoto
              "
              class="lg:w-[50rem] lg:h-[28rem]"
              alt="quote-picture"
            />
          </div>
          <div class="absolute inset-0 flex items-center justify-center w-full">
            <label class="flex flex-col items-center bg-black bg-opacity-75 p-4 rounded-md">
              <IconPhotoCamera />
              <span class="text-white">Change Photo</span>
              <Field
                type="file"
                class="cursor-pointer absolute inset-0 opacity-0"
                @change="handleFileInputChange"
                name="quoteImage"
              />
            </label>
          </div>
        </div>
        <div class="p-3 flex justify-center items-center">
          <button
            class="w-28 h-8 lg:w-full lg:h-10 bg-red-600 border border-red-500 rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6 bg-[#E31221]"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </Form>
      <transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
        >
          <div class="p-4 rounded-lg shadow-lg font-helvetica-neue bg-[#000000]">
            <h2 class="text-xl mb-4">Confirm Delete</h2>
            <p class="">Are you sure you want to delete?</p>
            <div class="mt-4 flex justify-end">
              <button @click="showDeleteModal = false" class="mr-2">Cancel</button>
              <button @click="removeQuote" class="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import IconDelete from '@/components/icons/IconDelete.vue'
import IconPhotoCamera from '@/components/icons/IconPhotoCamera.vue'
import UserHeader from '@/components/home/movieList/forms/headers/addMovieFormUserHeader.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { getSingleQuote } from '@/services/api.js'
import { deleteQuote } from '@/services/api.js'
import { editQuoteRequest } from '@/services/api.js'

import { Form, Field, ErrorMessage } from 'vee-validate'

const router = useRouter()
const quotesStore = useQuotesStore()
const storageUrl = import.meta.env.VITE_API_STORAGE
let isLoading = ref(true)
let uploadedPhoto = ref('')

let englishQuote = ref('')
let georgianQuote = ref('')

let showDeleteModal = ref(false)

getSingleQuote(router.currentRoute.value.params.id).then((response) => {
  quotesStore.initQuote(response.data)
  isLoading.value = false
  englishQuote.value = quotesStore.quote.body.en
  georgianQuote.value = quotesStore.quote.body.ka
})

function handleFileInputChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      uploadedPhoto.value = reader.result
    }
    reader.readAsDataURL(file)
  } else {
    uploadedPhoto.value = null
  }
}

function editQuote() {
  let formData = new FormData()

  if (englishQuote.value) {
    formData.append('quote_en', englishQuote.value)
  }
  if (georgianQuote.value) {
    formData.append('quote_ka', georgianQuote.value)
  }
  if (uploadedPhoto.value && uploadedPhoto.value.includes('base64')) {
    let binary = atob(uploadedPhoto.value.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let file = new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    })
    formData.append('thumbnail', file)
  }

  editQuoteRequest(router.currentRoute.value.params.id, formData).then(() => {
    router.back()
  })
}
function removeQuote() {
  deleteQuote(router.currentRoute.value.params.id).then(() => {
    showDeleteModal.value = false
    router.back()
  })
}
</script>
<style scoped>
.bg-opacity-85 {
  background-color: rgba(0, 0, 0, 0.85);
}
.text-gray-600 {
  --text-opacity: 1;
  color: rgba(113, 128, 150, var(--text-opacity));
}
.text-gray-800 {
  --text-opacity: 1;
  color: rgba(55, 65, 81, var(--text-opacity));
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
