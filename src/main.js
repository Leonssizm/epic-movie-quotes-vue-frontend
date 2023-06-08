
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/router/guards.js';
import '@/assets/tailwind.css'

// Vee-validate
import "@/plugins/vee-validate/rules.js";
import "@/plugins/vee-validate/messages.js";

// i18n
import i18n from '@/plugins/i18n/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
