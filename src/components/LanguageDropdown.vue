<template>
  <div class="hidden lg:flex">
    <div class="relative">
      <select
        v-model="$i18n.locale"
        class="px-3 py-1.5 w-24 h-9 rounded-md text-white text-base leading-6 bg-transparent appearance-none"
        @click="changeLocale($i18n.locale)"
      >
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
          class="font-helvetica-neue text-black"
        >
          {{ locale }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
        <IconArrowDown class="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
</template>
<script setup>
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import axios from '@/plugins/axios/index.js'
import { setLocale } from '@vee-validate/i18n'

function changeLocale(locale) {
  if (locale === 'en') {
    localStorage.setItem('locale', locale)
    axios.get('/change-locale/en')
  } else {
    axios.get('/change-locale/ka')
    localStorage.removeItem('locale')
    localStorage.setItem('locale', locale)
  }

  locale === 'en' ? setLocale(locale) : setLocale(locale)
}
</script>
