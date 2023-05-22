<template>
  <SignUpButton @click="openForm" />
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="form fixed inset-0 flex items-center justify-center bg-opacity-75 lg:bg-black"
    >
      <div class="rounded-md shadow-lg max-w-md">
        <Form @submit="submitForm" class="bg-[#222030]">
          <div class="text-center py-10">
            <h1 class="font-medium text-3xl font-helvetica-neue text-[#FFFFFF]">
              Create an account
            </h1>
            <h2 class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-4">
              start your journey
            </h2>
          </div>
          <div class="flex flex-col ml-16 mr-36 pb-12 font-helvetica-neue text-[#FFFFFF]">
            <label class="pb-2">Name<span class="text-[#DC3545]">*</span></label>
            <Field
              name="name"
              rules="required"
              type="text"
              class="mb-4 pl-1 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="At least 3 & max.15 lower case characters"
            />
            <label class="pb-2">Email<span class="text-[#DC3545]">*</span></label>
            <Field
              name="email"
              rules="required"
              type="email"
              class="mb-4 pl-1 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="Enter your email"
            />
            <label class="pb-2">Password<span class="text-[#DC3545]">*</span></label>
            <Field
              name="password"
              rules="required"
              type="password"
              class="mb-4 pl-1 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              placeholder="At least 8 & max.15 lower case characters"
            />
            <label class="pb-2">Confirm password<span class="text-[#DC3545]">*</span></label>
            <Field
              name="repeat_password"
              rules="required"
              type="password"
              placeholder="Confirm password "
              class="h-10 w-80 pl-1 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded-md"
            />
            <button class="mb-4 w-80 h-10 bg-[#E31221] text-white rounded mt-6">Get started</button>
            <button
              class="mb-4 w-80 h-10 bg-[#222030] text-white border border-[#CED4DA] rounded flex justify-center items-center"
            >
              <IconGoogle />
              <span class="pl-2"> Sign Up with Google</span>
            </button>
            <div
              class="flex justify-center align-center font-helvetica-neue text-lg ml-16 pt-4 font-normal"
            >
              <span class="font-normal text-xs text-[#6C757D] mr-1">Already have an account?</span>
              <a href="#" class="font-normal text-xs text-[#0D6EFD] underline">Log in</a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import SignUpButton from '@/components/landing/buttons/ButtonSignUp.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { Form, Field } from 'vee-validate'

const isPopupOpen = ref(false)

function openForm() {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
}

function submitForm() {
  // Sending data logic
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
