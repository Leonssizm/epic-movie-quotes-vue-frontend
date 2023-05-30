<template>
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="form fixed inset-0 flex items-center justify-center bg-opacity-85 lg:bg-black"
    >
      <div class="rounded-md shadow-lg max-w-md">
        <Form @submit="submitRegistrationForm" class="bg-[#222030]" v-slot="{ errors }">
          <FormSignUpHeader />
          <div class="flex flex-col ml-16 w-[21rem] mr-36 pb-2 font-helvetica-neue text-[#FFFFFF]">
            <label class="pb-2"
              >{{ $t('landing.name') }}<span class="text-[#DC3545]">*</span></label
            >
            <div class="relative">
              <Field
                name="name"
                rules="required|min:3|max:15|engLetters"
                type="text"
                class="mb-2 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
                :placeholder="$t('landing.sign_up.name_placeholder')"
                v-model="name"
              />
              <IconValidInput
                v-if="!Object.keys(errors).includes('name') && name.length !== 0"
                class="absolute right-1 top-5 transform -translate-y-1/2"
              />
              <IconInvalidInput
                v-if="Object.keys(errors).includes('name')"
                class="absolute right-1 top-5 transform -translate-y-1/2"
              />
            </div>
            <ErrorMessage name="name" class="text-red-500 mb-2"></ErrorMessage>
            <label class="pb-2"
              >{{ $t('landing.email') }}<span class="text-[#DC3545]">*</span></label
            >
            <div class="relative">
              <Field
                name="email"
                rules="required|email"
                type="email"
                class="mb-2 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
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
            <ErrorMessage name="email" class="text-red-500 mb-2"></ErrorMessage>
            <label class="pb-2"
              >{{ $t('landing.password') }}<span class="text-[#DC3545]">*</span></label
            >
            <div class="relative">
              <Field
                name="password"
                rules="required|min:8|max:15|password"
                :type="passwordVisible ? 'text' : 'password'"
                class="mb-2 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
                :placeholder="$t('landing.password_placeholder')"
                v-model="password"
              />
              <IconEye
                class="absolute right-1 top-5 transform -translate-y-1/2"
                @click="passwordVisible = !passwordVisible"
              />
            </div>
            <ErrorMessage name="password" class="text-red-500 mb-2"></ErrorMessage>
            <label class="pb-2"
              >{{ $t('landing.confirm_password') }}<span class="text-[#DC3545]">*</span></label
            >
            <div class="relative">
              <Field
                name="password_confirmation"
                rules="required"
                :type="repeatPasswordVisible ? 'text' : 'password'"
                :placeholder="$t('landing.sign_up.confirm_password_placeholder')"
                class="h-10 w-[21rem] pl-1 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded-md"
                v-model="passwordConfirmation"
              />
              <IconEye
                class="absolute right-1 top-5 transform -translate-y-1/2"
                @click="repeatPasswordVisible = !repeatPasswordVisible"
              />
            </div>
            <ErrorMessage name="password_confirmation" class="text-red-500 mb-2"></ErrorMessage>
            <button class="mb-2 w-[21rem] h-10 bg-[#E31221] text-white rounded mt-6">
              {{ $t('landing.sign_up.button') }}
            </button>
          </div>
        </Form>
        <div class="flex flex-col bg-[#222030]">
          <div class="ml-16 w-[21rem] mr-36 pb-12">
            <button
              class="mb-4 h-10 bg-[#222030] w-[21rem] text-white border border-[#CED4DA] rounded flex justify-center items-center"
            >
              <IconGoogle />
              <span class="pl-2"> {{ $t('landing.sign_up.sign_up_google') }}</span>
            </button>
            <div
              class="flex justify-center align-center font-helvetica-neue text-lg pt-4 font-normal"
            >
              <span class="font-normal text-xs text-[#6C757D]">{{
                $t('landing.sign_up.already_have_an_account')
              }}</span>
              <RouterLink to="/login" class="font-normal text-xs text-[#0D6EFD] underline">{{
                $t('landing.log_in.button')
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
import IconEye from '@/components/icons/IconEye.vue'
import IconValidInput from '@/components/icons/IconValidInput.vue'
import IconInvalidInput from '@/components/icons/IconInvalidInput.vue'
import FormSignUpHeader from '@/components/landing/forms/registration/FormSignUpHeader.vue'
import { onMounted, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios/index.js'

const isPopupOpen = ref(false)
const router = useRouter()

let name = ref('')
let email = ref('')
let password = ref('')
let passwordConfirmation = ref('')

let passwordVisible = ref('')
let repeatPasswordVisible = ref('')

onMounted(() => {
  isPopupOpen.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, 100)
})

function submitRegistrationForm() {
  axios
    .post(
      'users/create',
      {
        username: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      },
      { timeout: 8000 }
    )
    .then(() => {
      router.push({ name: 'registration-email' })
    })
}

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
