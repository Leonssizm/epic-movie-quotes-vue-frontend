
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'

// Vee-validate
import "@/plugins/vee-validate/rules.js";
import "@/plugins/vee-validate/messages.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
