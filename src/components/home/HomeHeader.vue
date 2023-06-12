<template>
  <header>
    <div class="bg-[#24222F] flex items-center justify-between h-20">
      <div>
        <h1 class="text-[#DDCCAA] ml-16 hidden lg:block">Movie Quotes</h1>
        <IconList class="block lg:hidden ml-4" @click="$emit('changeSidebarVisibility')" />
      </div>
      <div class="mr-4 flex">
        <IconQuestionMark
          class="mr-4 w-7 h-8 cursor-pointer lg:hidden"
          @click="isExpanded = !isExpanded"
          v-if="!isExpanded"
        />
        <div
          v-if="isExpanded"
          class="bg-[#12101A] fixed top-0 left-0 w-screen h-3/4 flex items-start justify-center lg:hidden"
        >
          <div class="h-3/4 flex flex-col lg:hidden">
            <div class="flex items-center mt-4 lg:hidden">
              <IconArrowBack @click="isExpanded = false" class="w-6 h-7 ml-4 mr-4 lg:hidden" />
              <input
                class="h-12 bg-[#181624] text-white px-2 lg:hidden"
                type="search"
                placeholder="Search"
              />
            </div>
            <div class="border border-solid border-gray-700 w-screen mt-4 lg:hidden"></div>
            <p class="text-[#CED4DA] flex justify-center mt-6 lg:hidden">
              Enter @ to search movies
            </p>
            <p class="text-[#CED4DA] flex justify-center mt-6 lg:hidden">
              Enter # to search quotes
            </p>
          </div>
        </div>
        <IconNotificationBell />
        <LanguageDropdown class="ml-2" />
        <button
          @click="handleLogout"
          class="lg:ml-4 lg:px-3 lg:py-2 mr-4 w-20 h-8 lg:w-24 lg:h-10 hidden lg:block border border-white rounded-md font-helvetica-neue font-normal text-[#FFFFFF] text-base leading-6"
        >
          Log out
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import IconNotificationBell from '@/components/icons/IconNotificationBell.vue'
import LanguageDropdown from '@/components/LanguageDropdown.vue'
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import IconList from '@/components/icons/IconList.vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/api.js'
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
const router = useRouter()

const store = useAuthStore()

function handleLogout() {
  logout('log-out').then(() => {
    store.authenticateOrLogoutUser(false)
    router.push({ name: 'landing' })
  })
}

let isExpanded = ref(false)
</script>
