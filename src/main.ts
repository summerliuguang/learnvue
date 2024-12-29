
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'default-passive-events'

declare global {
    interface Window {
        turnstile: any; // 声明 turnstile 对象类型
    }
}

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
