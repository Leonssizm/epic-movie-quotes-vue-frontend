<template>
  <HomeHeader @changeSidebarVisibility="handleSidebarVisibility" />
  <div class="bg-[#181624]">
    <div class="lg:float-left">
      <transition name="slide-fade">
        <HomeSidebarNavigation v-if="displaySidebar" />
      </transition>
    </div>
    <HomeSearchPanel />
    <div class="text-white flex justify-center items-center flex-col lg:mr-60">
      <NewsFeedQuotesCard />
    </div>
  </div>
</template>
<script setup>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeSearchPanel from '@/components/home/HomeSearchPanel.vue'
import HomeSidebarNavigation from '@/components/home/HomeSidebarNavigation.vue'
import NewsFeedQuotesCard from '@/components/home/newsFeed/NewsFeedQuoteCard.vue'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { useNotificationsStore } from '@/stores/useNotificationsStore'
import { useQuotesStore } from '@/stores/useQuotesStore'
import { getQuoteComments } from '@/services/api.js'

document.title = 'Home'
const notificationsStore = useNotificationsStore()
const quotesStore = useQuotesStore()

let resolution = ref(window.innerWidth)

let displaySidebar = resolution.value <= 768 ? ref(false) : ref(true)

function handleSidebarVisibility() {
  if (document.body.classList.contains('overflow-hidden') && resolution.value <= 768) {
    displaySidebar.value = true
    document.body.classList.remove('overflow-hidden')
  } else if (resolution.value > 768) {
    displaySidebar.value = true
    document.body.classList.remove('overflow-hidden')
  } else {
    displaySidebar.value = false
    document.body.classList.remove('overflow-hidden')
  }
}
let authUserId = localStorage.getItem('authUserId')

onMounted(() => {
  instantiatePusher()
  window.Echo.private(`movie-quotes.${authUserId}`).listen('NotificationSent', (data) => {
    if (!data.notification.unlike) {
      notificationsStore.updateNotifications(data)
      let quote = quotesStore.quotes.filter((quote) => quote.id === data.notification.quote.id)[0]
      if (data.notification.notification.is_like) {
        quote.likes.length += 1
      } else {
        getQuoteComments(quote.id).then((response) => (quote.comments = response.data))
      }
    } else {
      let quote = quotesStore.quotes.filter((quote) => quote.id === data.notification.quote.id)[0]
      quote.likes.length -= 1
    }
  })
  document.body.addEventListener('click', handleSidebarVisibility)
})

onUnmounted(() => {
  document.body.removeEventListener('click', handleSidebarVisibility)
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
