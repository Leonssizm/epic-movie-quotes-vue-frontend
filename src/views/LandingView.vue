<template>
  <div class="bg-black">
    <div class="flex justify-between pt-9 px-6 lg:pt-9 lg:px-16">
      <h1
        class="uppercase text-[#DDCCAA] font-helvetica-neue font-normal font-medium text-base leading-6"
      >
        Movie Quotes
      </h1>
      <div class="flex flex-row-reverse lg:flex-row">
        <LanguageDropDown />
        <SignUpForm />
        <LoginButton />
      </div>
    </div>
    <div class="flex items-center lg:justify-center flex-col mt-48 lg:mt-96 lg:mb-72">
      <h1 class="text-center text-[#DDCCAA] font-montserrat font-bold text-3xl lg:text-6xl">
        Find any qoute in <br />
        Millions of movie lines
      </h1>
      <GetStartedButton />
    </div>
    <LandingImages />
  </div>
  <LandingFooter />
</template>
<script setup>
import LoginButton from '@/components/landing/buttons/ButtonLogin.vue'
import SignUpForm from '@/components/landing/forms/FormsSignUp.vue'
import GetStartedButton from '@/components/landing/buttons/ButtonGetStarted.vue'
import LanguageDropDown from '@/components/landing/LandingLanguageDropdown.vue'
import LandingImages from '@/components/landing/LandingImages.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>
