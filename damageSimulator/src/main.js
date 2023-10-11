import { createApp } from 'vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import '../index.css'
import App from './App.vue'

// const routes = [
//     { path: '/Skill', component: Skill },
//     { path: '/Skill2', component:  Skill2 },
//   ]
// const router = createRouter({
//     history: createWebHashHistory(),
//     routes:routes
// })
const app=createApp(App)
// app.use(router)
app.mount('#app')
