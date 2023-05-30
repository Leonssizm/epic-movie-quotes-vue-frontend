<template>
  <div class="bg-blurred-landing h-screen">
    <div class="flex justify-center h-full items-center">
      <div class="form fixed inset-0 flex items-center justify-center">
        <div
          class="rounded-md shadow-lg max-w-md bg-[#222030] text-center flex justify-center flex-col items-center px-20 py-16 text-[#FFFFFF]"
        >
          <h1 class="text-2xl text-[#FFFFFF] text-medium font-helvetica-neue">
            Create new Password
          </h1>
          <p class="font-normal text-xs text-[#6C757D] font-helvetica-neue mt-2">
            Your new password must be different from previous used passwords
          </p>
          <Form class="mt-4" @submit="setNewPassword">
            <label class="pb-2 mr-64">{{ $t('landing.password') }}</label>
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
            <label class="pb-2 mr-48">{{ $t('landing.confirm_password') }}</label>
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
              Reset Password
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
import IconEye from '@/components/icons/IconEye.vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'

import { Field, Form, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from '@/plugins/axios/index.js'

const router = useRouter()
let password = ref('')
let passwordConfirmation = ref('')

let passwordVisible = ref('')
let repeatPasswordVisible = ref('')

function setNewPassword() {
  axios
    .post(
      'reset-password/change',
      {
        token: router.currentRoute.value.query.token,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      },
      {
        timeout: 8000
      }
    )
    .then((response) => {
      if (response.status === 200) {
        router.push({ name: 'password-changed' })
      }
    })
}
</script>
