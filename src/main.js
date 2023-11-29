import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Teams from './components/Teams.vue'
import TeamDetail from './components/TeamDetail.vue'
import Competitions from './components/Competitions.vue'
import Players from './components/Players.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { path: '/', component: Competitions },
    { path: '/teams-by-country/:id', component: Teams, props: true },
    { path: '/teams/:teamId', component: TeamDetail, props: true }
    // { path: '/persons/:personId', component: Players, props: true }
  ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


createApp(App).use(router).mount('#app')
