<template>
  <div class="bg-[#11101A]">
    <div class="flex justify-between pt-9 px-6 lg:pt-9 lg:px-16">
      <h1
        class="uppercase text-[#DDCCAA] font-helvetica-neue font-normal font-medium text-base leading-6"
      >
        Movie Quotes
      </h1>
      <div class="flex flex-row-reverse lg:flex-row">
        <LanguageDropDown />
        <SignUpButton @click="openLoginOrSignUpForm('signUp')" />
        <ButtonLogin @click="openLoginOrSignUpForm('login')" />
        <div class="relative z-10">
          <RouterView />
        </div>
      </div>
    </div>
    <div class="flex items-center lg:justify-center flex-col mt-48 lg:mt-96 lg:mb-72">
      <h1 class="text-center text-[#DDCCAA] font-montserrat font-bold text-3xl lg:text-6xl">
        Find any qoute in <br />
        Millions of movie lines
      </h1>
      <GetStartedButton @click="openLoginOrSignUpForm('signUp')" />
    </div>
    <LandingImages />
  </div>
</template>
<script setup>
import ButtonLogin from '@/components/landing/buttons/ButtonLogin.vue'
import SignUpButton from '@/components/landing/buttons/ButtonSignUp.vue'
import GetStartedButton from '@/components/landing/buttons/ButtonGetStarted.vue'
import LanguageDropDown from '@/components/LanguageDropdown.vue'
import LandingImages from '@/components/landing/LandingImages.vue'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
document.title = 'Epic Movie Quotes'
const locale = useI18n().locale
const router = useRouter()

function openLoginOrSignUpForm(form) {
  form === 'login' ? router.push({ name: 'login' }) : router.push({ name: 'sign-up' })
}

onMounted(() => {
  localStorage.getItem('locale') === 'en' ? (locale.value = 'en') : (locale.value = 'ka')
})
</script>
