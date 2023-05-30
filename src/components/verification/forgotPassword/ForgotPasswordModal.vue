<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16"
        >
          <h1 class="text-3xl text-[#FFFFFF] text-medium font-helvetica-neue">Forgot password?</h1>
          <p class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-2">
            Enter the email and we'll send an email with instructions to reset your password
          </p>
          <Form class="mt-4" @submit="handleForgotPasswordEmail">
            <label class="pb-2 text-[#FFFFFF] mr-72">{{ $t('landing.email') }}</label>
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
              Send Instructions
            </button>
          </Form>
          <RouterLink to="/login" class="flex items-center mt-6 col-reverse"
            ><IconArrowBack class="mr-2" />
            <span class="font-normal text-xs text-[#6C757D] font-helvetica-neue"
              >Back to log in</span
            >
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import axios from '@/plugins/axios/index.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
let email = ref('')
function handleForgotPasswordEmail() {
  axios
    .post(
      'reset-password/email',
      {
        email: email.value
      },
      {
        timeout: 8000
      }
    )
    .then((response) => {
      if (response.status === 200) {
        router.push({ name: 'reset-email' })
      }
    })
}
</script>
