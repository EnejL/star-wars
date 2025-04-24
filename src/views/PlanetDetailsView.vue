<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          variant="text"
          @click="$router.push('/planets')"
          class="mb-4"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Back to Planets
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12" class="text-center">
        <v-alert
          type="error"
          variant="tonal"
        >
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="planet">
      <v-col cols="12" class="mx-auto">
        <v-card>
          <v-card-title class="d-flex align-center">
            {{ planet.name }}
            <v-spacer></v-spacer>
            <v-btn
              :color="isFavorite ? 'error' : 'grey'"
              variant="text"
              @click="toggleFavorite"
            >
              <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Diameter</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.diameter }} km</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Rotation Period</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.rotation_period }} hours</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Orbital Period</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.orbital_period }} days</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Gravity</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.gravity }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Population</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.population }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Climate</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.climate }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Terrain</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.terrain }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Surface Water</v-list-item-title>
                    <v-list-item-subtitle>{{ planet.surface_water }}%</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanetsStore } from '@/stores/planets'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Planet } from '@/types/star-wars'

const route = useRoute()
const planetsStore = usePlanetsStore()
const favoritesStore = useFavoritesStore()
const { loading, error } = storeToRefs(planetsStore)
const planet = ref<Planet | null>(null)

const isFavorite = computed(() => {
  if (!planet.value) return false
  return favoritesStore.isFavorite(getPlanetId(planet.value.url), 'planet')
})

function getPlanetId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getCharacterId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getFilmId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function toggleFavorite() {
  if (!planet.value) return
  const id = getPlanetId(planet.value.url)
  if (isFavorite.value) {
    favoritesStore.removeFavorite(id, 'planet')
  } else {
    favoritesStore.addFavorite({
      id,
      type: 'planet',
      data: planet.value
    })
  }
}

onMounted(async () => {
  const id = route.params.id as string
  planet.value = await planetsStore.fetchPlanetById(id)
})
</script> 