import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  actions: {
    initNotifications(notifications) {
      this.notifications = notifications
    },
    updateNotifications(notifications) {
      this.notifications.push(notifications.notification)
    }
  }
})
