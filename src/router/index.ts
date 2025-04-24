import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
    {
      path: '/characters/:id',
      name: 'character-details',
      component: () => import('../views/CharacterDetailsView.vue'),
    },
    {
      path: '/planets',
      name: 'planets',
      component: () => import('../views/PlanetsView.vue'),
    },
    {
      path: '/planets/:id',
      name: 'planet-details',
      component: () => import('../views/PlanetDetailsView.vue'),
    },
    {
      path: '/starships',
      name: 'starships',
      component: () => import('../views/StarshipsView.vue'),
    },
    {
      path: '/starships/:id',
      name: 'starship-details',
      component: () => import('../views/StarshipDetailsView.vue'),
    },
  ],
})

export default router
