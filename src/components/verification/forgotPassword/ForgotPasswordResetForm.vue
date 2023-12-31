<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <ForgotPasswordSuccess v-if="passwordIsChanged" />
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16 text-[#FFFFFF]"
          v-else
        >
          <h1 class="text-2xl text-[#FFFFFF] text-medium font-helvetica-neue">
            {{ $t('landing.change_password.create_new_password') }}
          </h1>
          <p class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-2">
            {{ $t('landing.change_password.instruction') }}
          </p>
          <Form class="mt-4 flex flex-col items-start" @submit="setNewPassword">
            <label class="pb-2">{{ $t('landing.password') }}</label>
            <div class="relative">
              <Field
                name="password"
                rules="required|min:8|max:15"
                :type="passwordVisible ? 'text' : 'password'"
                class="mb-2 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
                :placeholder="$t('landing.password_placeholder')"
                v-model="password"
              />
              <IconEye
                class="absolute right-1 top-5 transform -translate-y-1/2"
                @click="passwordVisible = !passwordVisible"
              />
              <ErrorMessage name="password" class="text-red-500 mb-2"></ErrorMessage>
            </div>
            <label class="pb-2">{{ $t('landing.confirm_password') }}</label>
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
              <ErrorMessage name="password_confirmation" class="text-red-500 mb-2"></ErrorMessage>
            </div>
            <button
              class="mt-6 w-[21rem] h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >
              {{ $t('landing.change_password.reset_password') }}
            </button>
          </Form>
          <RouterLink :to="{ name: 'login' }" class="flex items-center mt-6 col-reverse"
            ><IconArrowBack class="mr-2" />
            <span class="font-normal text-xs text-[#6C757D] font-helvetica-neue">
              {{ $t('landing.forgot_password.go_back') }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconEye from '@/components/icons/IconEye.vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import ForgotPasswordSuccess from '@/components/verification/forgotPassword/ForgotPasswordSuccess.vue'

import { Field, Form, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { resetPassword } from '@/services/api.js'
import { useI18n } from 'vue-i18n'

const locale = useI18n().locale

const router = useRouter()
let password = ref('')
let passwordConfirmation = ref('')

let passwordVisible = ref('')
let repeatPasswordVisible = ref('')

let passwordIsChanged = ref(false)

function setNewPassword() {
  resetPassword(
    router.currentRoute.value.query.token,
    password.value,
    passwordConfirmation.value
  ).then(() => {
    passwordIsChanged.value = true
  })
}

onMounted(() => {
  locale.value = localStorage.getItem('locale')
})
</script>
