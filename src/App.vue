<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import FavoritesButton from '@/components/FavoritesButton.vue'

const navigationItems = [
  { title: 'Characters', path: '/characters' },
  { title: 'Planets', path: '/planets' },
  { title: 'Starships', path: '/starships' }
]
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <router-link to="/" class="text-decoration-none text-white">
          Star Wars Explorer
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        variant="text"
        class="text-white"
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app class="bg-primary text-center d-flex flex-column">
      <div>
        <strong>Star Wars Explorer</strong> - Explore the vast universe of Star Wars
      </div>
      <div class="text-caption">
        Data provided by <a href="https://swapi.tech/" target="_blank" class="text-white">SWAPI</a>
      </div>
    </v-footer>

    <FavoritesButton />
  </v-app>
</template>

<style>
.v-application {
  background: #121212 !important;
}
</style>
