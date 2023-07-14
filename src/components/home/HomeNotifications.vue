<template>
  <div class="absolute z-50 top-0 right-0 bottom-0 lg:mr-7 mt-14 flex flex-col items-end">
    <IconTriangle class="mr-3 lg:mr-[12.45rem]" />
    <div class="px-4 bg-[#000000] pb-10 lg:w-[60rem] w-[25rem]">
      <div class="flex items-top justify-between">
        <h1
          class="text-white mt-10 font-helvetica-neue font-normal font-medium text-2xl leading-6 capitalize text-white"
        >
          Notifications
        </h1>
        <button
          type="button"
          class="text-white mt-10 font-helvetica-neue text-base leading-6 underline text-white"
          @click="makeAllNotificationRead"
        >
          Mark all as read
        </button>
      </div>
      <div
        class="px-4 py-2 border-2 rounded border-gray-800 mt-4"
        v-for="(notification, index) in notificationsStore.notifications"
        :key="index"
      >
        <RouterLink
          :to="{ name: 'individual-quote', params: { id: notification.notifiable.id } }"
          @click="readNotifications(notification.id)"
          class="z-50"
        >
          <div class="flex justify-between">
            <div class="flex py-5">
              <img
                :src="
                  notification.sender.profile_picture
                    ? notification.sender.google_id
                      ? notification.sender.profile_picture
                      : 'http://127.0.0.1:8000/storage/' + notification.sender.profile_picture
                    : 'https://picsum.photos/300'
                "
                alt="profile-picture"
                class="rounded-full h-14 w-14 object-cover"
              />
              <div class="flex flex-col ml-4">
                <p class="text-white">{{ notification.sender.username }}</p>
                <div v-if="notification.is_like" class="flex mt-2">
                  <IconRedHeart />
                  <p class="text-[#CED4DA] font-helvetica-neue ml-2">reacted to your quote</p>
                </div>
                <div v-else class="flex mt-2">
                  <IconCitation />
                  <p class="text-[#CED4DA] font-helvetica-neue ml-2">
                    commented to your movie quote
                  </p>
                </div>
                <div class="text-white lg:hidden">
                  <p class="mt-2 text-[#D9D9D9] font-helvetica-neue">
                    {{ formatTime(notification.created_at) }} ago
                  </p>
                  <p class="mt-2 text-green-700 font-helvetica-neue" v-if="notification.is_new">
                    New
                  </p>
                </div>
              </div>
            </div>
            <div class="text-white hidden lg:block">
              <p class="mt-2 text-[#D9D9D9] font-helvetica-neue">
                {{ formatTime(notification.created_at) }} ago
              </p>
              <p class="mt-2 text-green-700 font-helvetica-neue" v-if="notification.is_new">New</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconTriangle from '@/components/icons/IconTriangle.vue'
import IconCitation from '@/components/icons/IconCitation.vue'
import IconRedHeart from '@/components/icons/IconRedHeart.vue'
import { useNotificationsStore } from '@/stores/useNotificationsStore'
import { readNotifications, readAllNotifications } from '@/services/api.js'

const notificationsStore = useNotificationsStore()

function makeAllNotificationRead() {
  readAllNotifications().then((response) => {
    notificationsStore.initNotifications(response.data)
  })
}
const formatTime = (createdAt) => {
  const currentTime = new Date()
  const notificationTime = new Date(createdAt)
  const elapsedMinutes = Math.floor((currentTime - notificationTime) / (1000 * 60))

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes`
  } else if (elapsedMinutes < 24 * 60) {
    const elapsedHours = Math.floor(elapsedMinutes / 60)
    return `${elapsedHours} ${elapsedHours === 1 ? 'hour' : 'hours'}`
  } else {
    const elapsedDays = Math.floor(elapsedMinutes / (24 * 60))
    return `${elapsedDays} ${elapsedDays === 1 ? 'day' : 'days'}`
  }
}
</script>
