import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import VueClipboard from 'vue-clipboard2'

const app = createApp(App)

app.use(VueClipboard)
app.mount('#app')