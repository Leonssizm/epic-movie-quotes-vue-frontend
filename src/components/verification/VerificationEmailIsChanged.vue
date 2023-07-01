<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <IconCheckmark class="mb-4" />
          <div v-if="success">
            <h1 class="text-3xl text-[#FFFFFF] text-medium font-helvetica-neue">Success!</h1>
            <p class="font-normal text-xs text-[#FFFFFF] font-helvetica-neue mt-4">
              Your Email is changed successfully
            </p>
          </div>
          <div v-else>
            <h1 class="text-3xl text-[#FFFFFF] text-medium font-helvetica-neue">
              Something went wrong
            </h1>
            <p class="font-normal text-xs text-[#FFFFFF] font-helvetica-neue mt-4">Try again</p>
          </div>
          <RouterLink
            v-if="success"
            to="/edit-profile"
            class="mb-4 mt-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >continue editing</RouterLink
          >
          <RouterLink
            v-else
            to="/edit-profile"
            class="mb-4 mt-4 w-80 h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >retry</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconCheckmark from '@/components/icons/IconCheckmark.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { changeEmail } from '@/services/api.js'

const router = useRouter()

let success = ref(false)

changeEmail(router.currentRoute.value.query.token, router.currentRoute.value.query.email).then(
  (data) => {
    if (data.status === 200) {
      success.value = true
    }
  }
)
</script>
