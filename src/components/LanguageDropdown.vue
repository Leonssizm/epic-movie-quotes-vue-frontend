<template>
  <div class="flex items-center">
    <div class="relative" :class="{ 'mb-10': router.currentRoute.value.path === '/' }">
      <select
        v-model="$i18n.locale"
        class="px-3 py-1.5 w-14 lg:w-20 h-9 rounded-md text-white text-base leading-6 bg-transparent appearance-none outline-none"
        @click="changeLocale($i18n.locale)"
      >
        <option value="en" class="font-helvetica-neue text-black">Eng</option>
        <option value="ka" class="font-helvetica-neue text-black">Geo</option>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center pointer-events-none flex items-center justify-center"
      >
        <IconArrowDown class="lg:w-4 lg:h-4 text-white mt-1" />
      </div>
    </div>
  </div>
</template>
<script setup>
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { setLocale } from '@vee-validate/i18n'
import { changeLocaleInTheBackend } from '@/services/api.js'
import { useRouter } from 'vue-router'
import { localize } from '@vee-validate/i18n'

const router = useRouter()

function changeLocale(locale) {
  if (locale === 'en') {
    localStorage.setItem('locale', locale)
    changeLocaleInTheBackend('en')
    localize('en')
  } else {
    changeLocaleInTheBackend('ka')
    localStorage.removeItem('locale')
    localStorage.setItem('locale', locale)
    localize('ka')
  }

  locale === 'en' ? setLocale(locale) : setLocale(locale)
}
</script>
