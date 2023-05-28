<template>
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="form fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
    >
      <div class="rounded-md shadow-lg max-w-md">
        <Form @submit="submitLoginForm" class="bg-[#222030]" v-slot="{ errors }">
          <FormLoginHeader />
          <div class="flex flex-col ml-16 mr-36 pb-12 font-helvetica-neue text-[#FFFFFF]">
            <label class="pb-2"
              >{{ $t('landing.email') }}<span class="text-[#DC3545]">*</span></label
            >
            <Field
              name="email"
              type="email"
              class="mb-4 pl-1 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              :placeholder="$t('landing.email_placeholder')"
              v-model="email"
            />
            <IconValidInput
              v-if="!Object.keys(errors).includes('email') && email.length !== 0"
              class="absolute right-1 top-5 transform -translate-y-1/2"
            />
            <IconInvalidInput
              v-if="Object.keys(errors).includes('email')"
              class="absolute right-1 top-5 transform -translate-y-1/2"
            />
            <ErrorMessage name="email" class="text-red-500 mb-2" />
            <label class="pb-2"
              >{{ $t('landing.password') }}<span class="text-[#DC3545]">*</span></label
            >
            <Field
              name="password"
              type="password"
              class="mb-4 pl-1 w-80 h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              :placeholder="$t('landing.password_placeholder')"
              v-model="password"
            />
            <div class="flex items-center flex-row-reverse justify-evenly w-80">
              <a href="#" class="font-normal text-xs text-[#0D6EFD] ml-24 underline">{{
                $t('landing.log_in.forget_password')
              }}</a>
              <label for="checkbox" class="font-helvetica-neue font-bold text-sm">{{
                $t('landing.log_in.remember_me')
              }}</label>
              <Field
                type="checkbox"
                class="font-helvetica-neue p-5"
                name="remember"
                v-model="rememberMe"
              />
            </div>
            <button class="mb-4 w-80 h-10 bg-[#E31221] text-white rounded mt-6">
              {{ $t('landing.log_in.button') }}
            </button>
            <button
              class="mb-4 w-80 h-10 bg-[#222030] text-white border border-[#CED4DA] rounded flex justify-center items-center"
            >
              <IconGoogle />
              <span class="pl-2">{{ $t('landing.log_in.sign_in_google') }}</span>
            </button>
            <div
              class="flex justify-center align-center font-helvetica-neue text-lg ml-16 pt-4 font-normal"
            >
              <span class="font-normal text-xs text-[#6C757D] mr-1">{{
                $t('landing.log_in.do_not_have_account')
              }}</span>
              <RouterLink to="/sign-up" class="font-normal text-xs text-[#0D6EFD] underline">{{
                $t('landing.log_in.button')
              }}</RouterLink>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </transition>
</template>
<script setup>
import IconGoogle from '@/components/icons/IconGoogle.vue'
import IconValidInput from '@/components/icons/IconValidInput.vue'
import IconInvalidInput from '@/components/icons/IconInvalidInput.vue'
import FormLoginHeader from '@/components/landing/forms/login/FormLoginHeader.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios/index.js'

const isPopupOpen = ref(false)
const router = useRouter()

let email = ref('')
let password = ref('')
let rememberMe = ref(false)

function submitLoginForm() {
  axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then((response) => {
    console.log(response)
    axios
      .post('users/login', {
        email: email.value,
        password: password.value,
        rememberMe: rememberMe.value
      })
      .then((response) => {
        console.log(response)
      })
  })
}
onMounted(() => {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
})
function handleClickOutside(event) {
  if (event.target.classList.contains('form')) {
    isPopupOpen.value = false
    document.body.classList.remove('overflow-hidden')
    document.body.removeEventListener('click', handleClickOutside)
    router.push({ name: 'landing' })
  }
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
