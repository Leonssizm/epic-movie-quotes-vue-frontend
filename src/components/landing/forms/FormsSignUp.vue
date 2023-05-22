<template>
  <SignUpButton @click="openForm" />
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="fixed form inset-0 flex items-center lg:justify-center lg:bg-opacity-75 lg:bg-black"
    >
      <div class="lg:rounded-md lg:shadow-lg lg:max-w-md">
        <form @submit.prevent="submitForm" class="bg-[#222030]">
          <div class="text-center py-12">
            <h1 class="font-medium text-3xl font-helvetica-neue text-[#FFFFFF]">
              Create an account
            </h1>
            <h2 class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-4">
              start your journey
            </h2>
          </div>
          <div class="flex flex-col ml-16 mr-36 pb-12 font-helvetica-neue text-[#FFFFFF]">
            <label class="pb-2">Name<span class="text-[#DC3545]">*</span></label>
            <input
              type="text"
              class="mb-4 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="At least 3 & max.15 lower case characters"
            />
            <label class="pb-2">Email<span class="text-[#DC3545]">*</span></label>
            <input
              type="email"
              class="mb-4 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <label class="pb-2">Password<span class="text-[#DC3545]">*</span></label>
            <input
              type="password"
              class="mb-4 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="At least 8 & max.15 lower case characters"
            />
            <label class="pb-2">Confirm password<span class="text-[#DC3545]">*</span></label>
            <input
              type="password"
              placeholder="Confirm password "
              class="h-10 w-80 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded-md"
            />
            <button class="mb-4 w-80 h-10 bg-[#E31221] text-white rounded mt-6">Get started</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import SignUpButton from '@/components/landing/buttons/ButtonSignUp.vue'
// import IconEye from '@/components/icons/IconEye.vue'

const isPopupOpen = ref(false)

function openForm() {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
}

function submitForm() {
  // Handle form submission logic here
}

function handleClickOutside(event) {
  if (event.target.classList.contains('form')) {
    isPopupOpen.value = false
    document.body.classList.remove('overflow-hidden')
    document.body.removeEventListener('click', handleClickOutside)
  }
}
</script>

<style scoped>
.bg-opacity-75 {
  background-color: rgba(0, 0, 0, 0.75);
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
