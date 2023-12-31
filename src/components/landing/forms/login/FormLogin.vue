<template>
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="form fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
    >
      <div class="rounded-md shadow-lg max-w-md">
        <Form @submit="submitLoginForm" class="bg-[#222030]" v-slot="{ errors }">
          <button
            class="text-2xl text-white float-right mr-9 lg:mr-3 mt-2"
            @click="closeLoginForm"
            type="button"
          >
            <IconX fill="white" />
          </button>
          <FormLoginHeader />
          <div class="flex flex-col w-[21rem] ml-16 mr-36 font-helvetica-neue text-[#FFFFFF]">
            <label class="pb-2"
              >{{ $t('landing.email') }}<span class="text-[#DC3545]">*</span></label
            >
            <div class="relative">
              <Field
                name="email"
                type="email"
                rules="required"
                class="mb-4 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
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
            </div>
            <ErrorMessage name="email" class="text-red-500 mb-2" />
            <div class="relative">
              <label class="pb-2"
                >{{ $t('landing.password') }}<span class="text-[#DC3545]">*</span></label
              >
              <Field
                name="password"
                :type="passwordVisible ? 'text' : 'password'"
                rules="required"
                class="mb-4 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
                :placeholder="$t('landing.password_placeholder')"
                v-model="password"
              />
              <IconEye
                class="absolute right-1 top-11 transform -translate-y-1/2"
                @click="passwordVisible = !passwordVisible"
              />
            </div>
            <div class="flex items-center flex-row-reverse justify-evenly w-80">
              <RouterLink
                :to="{ name: 'password-reset' }"
                class="font-normal text-base text-[#0D6EFD] ml-10 underline"
                :class="{
                  'ml-[5rem]': locale === 'en'
                }"
                >{{ $t('landing.log_in.forget_password') }}</RouterLink
              >
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
            <div class="text-red-500 mb-2 text-xl text-center mt-4" v-if="errorMessage !== ''">
              {{ errorMessage }}
            </div>
            <button
              class="mb-4 w-[21rem] h-10 bg-[#E31221] text-white rounded mt-6"
              :class="{
                'pointer-events-none': loginButtonIsClicked,
                'opacity-50': loginButtonIsClicked
              }"
            >
              {{ $t('landing.log_in.button') }}
            </button>
          </div>
        </Form>
        <div class="flex flex-col bg-[#222030]">
          <div class="ml-16 mr-36 pb-12">
            <button
              class="mb-4 w-[21rem] h-10 bg-[#222030] text-white border border-[#CED4DA] rounded flex justify-center items-center"
              :class="{
                'pointer-events-none': loginWithGoogleIsClicked,
                'opacity-50': loginWithGoogleIsClicked
              }"
              @click="handleSignInWithGoogle"
            >
              <IconGoogle />
              <span class="pl-2">{{ $t('landing.log_in.sign_in_google') }}</span>
            </button>
            <div
              class="flex justify-center align-center font-helvetica-neue text-lg ml-10 pt-4 font-normal"
            >
              <span class="font-normal text-xs text-[#6C757D] mr-1">{{
                $t('landing.log_in.do_not_have_account')
              }}</span>
              <RouterLink to="/sign-up" class="font-normal text-xs text-[#0D6EFD] underline">{{
                $t('landing.sign_up.button')
              }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import IconGoogle from '@/components/icons/IconGoogle.vue'
import IconX from '@/components/icons/IconX.vue'
import IconValidInput from '@/components/icons/IconValidInput.vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconInvalidInput from '@/components/icons/IconInvalidInput.vue'
import FormLoginHeader from '@/components/landing/forms/login/FormLoginHeader.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios/index.js'
import { login, googleAuth } from '@/services/api.js'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { localize } from '@vee-validate/i18n'

const store = useAuthStore()
const isPopupOpen = ref(false)
const router = useRouter()
const locale = useI18n().locale

let email = ref('')
let password = ref('')
let rememberMe = ref(false)
let errorMessage = ref('')
let loginButtonIsClicked = ref(false)
let loginWithGoogleIsClicked = ref(false)
let passwordVisible = ref(false)
let sanctumAuthUrl = import.meta.env.VITE_SANCTUM

function submitLoginForm() {
  loginButtonIsClicked.value = true
  axios.get(sanctumAuthUrl + 'sanctum/csrf-cookie').then(() => {
    login(email.value, password.value, rememberMe.value)
      .then(() => {
        store.authenticateOrLogoutUser(true)
        router.push({ name: 'home' })
      })
      .catch((error) => {
        if (error.response.data.message.includes('Password')) {
          if (locale.value === 'en') {
            errorMessage.value = 'password is incorrect'
          } else {
            errorMessage.value = 'პაროლი არასწორია'
          }
        } else if (error.response.data.message.includes('Email')) {
          if (locale.value === 'en') {
            errorMessage.value = 'Email is invalid'
          } else {
            errorMessage.value = 'ელ-ფოსტა არასწორია'
          }
        } else if (error.response.data.message.includes('Username')) {
          if (locale.value === 'en') {
            errorMessage.value = 'username is invalid'
          } else {
            errorMessage.value = 'მომხმარებლის სახელი არასწორია'
          }
        }
        loginButtonIsClicked.value = false
      })
  })
}
onMounted(() => {
  if (localStorage.getItem('locale') === 'en') {
    locale.value = 'en'
    localize('en')
  } else {
    localize('ka')
    locale.value = 'ka'
  }
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

function handleSignInWithGoogle() {
  loginWithGoogleIsClicked.value = true
  googleAuth().then((response) => {
    axios.get(sanctumAuthUrl + 'sanctum/csrf-cookie').then(() => {
      store.authenticateOrLogoutUser(true)
      window.location.href = response.data.redirectUrl
    })
  })
}
function closeLoginForm() {
  router.back()
  isPopupOpen.value = false
  document.body.removeEventListener('click', handleClickOutside)
  document.body.classList.remove('overflow-hidden')
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
  transition: opacity 0.7s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
