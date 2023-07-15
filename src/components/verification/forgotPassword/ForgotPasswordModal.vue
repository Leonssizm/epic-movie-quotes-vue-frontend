<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <ForgotPasswordEmail v-if="verificationEmailIsSent" />
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
          v-else
        >
          <h1 class="text-3xl text-[#FFFFFF] text-medium font-helvetica-neue">
            {{ $t('landing.forgot_password.forgot_password') }}
          </h1>
          <p class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-2">
            {{ $t('landing.forgot_password.instructions_info') }}
          </p>
          <Form class="mt-4 flex flex-col items-start" @submit="handleForgotPasswordEmail">
            <label class="pb-2 text-[#FFFFFF]">{{ $t('landing.email') }}</label>
            <Field
              name="email"
              rules="required|email"
              type="email"
              class="mb-2 mt-2 pl-1 w-[21rem] h-10 placeholder:pl-3 bg-[#CED4DA] text-black border border-gray-300 rounded"
              :placeholder="$t('landing.email_placeholder')"
              v-model="email"
            />
            <ErrorMessage name="email" class="text-red-500 mb-2"></ErrorMessage>
            <button
              target="_blank"
              class="mt-6 w-[21rem] h-10 bg-[#E31221] text-white border border-[#E31221] rounded flex justify-center items-center"
            >
              {{ $t('landing.forgot_password.instructions_button') }}
            </button>
          </Form>
          <RouterLink to="/login" class="flex items-center mt-6 col-reverse"
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
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import ForgotPasswordEmail from '@/components/verification/forgotPassword/ForgotPasswordEmail.vue'

import { Form, Field, ErrorMessage } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { forgotPassword } from '@/services/api.js'

import { useI18n } from 'vue-i18n'

const locale = useI18n().locale

let email = ref('')
let verificationEmailIsSent = ref(false)
function handleForgotPasswordEmail() {
  forgotPassword(email.value)
    .then(() => {
      verificationEmailIsSent.value = true
    })
    .catch((error) => {
      alert(error.response.data)
    })
}

onMounted(() => (locale.value = localStorage.getItem('locale')))
</script>
