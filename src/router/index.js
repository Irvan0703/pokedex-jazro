import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PokemonDetail from '../pages/PokemonDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pokemon/:name', name: 'PokemonDetail', component: PokemonDetail }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
