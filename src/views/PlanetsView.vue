<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-center mb-6">Star Wars Planets</h1>
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

    <v-row v-else>
      <v-col
        v-for="planet in planets"
        :key="planet.url"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push(`/planets/${getPlanetId(planet.url)}`)"
        >
          <v-card-title>{{ planet.name }}</v-card-title>

          <v-card-text>
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
                <v-list-item-title>Population</v-list-item-title>
                <v-list-item-subtitle>{{ planet.population }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push(`/planets/${getPlanetId(planet.url)}`)"
            >
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!loading && !error">
      <v-col cols="12" class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(totalCount / itemsPerPage)"
          @update:model-value="fetchPlanets"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlanetsStore } from '@/stores/planets'
import { storeToRefs } from 'pinia'

const store = usePlanetsStore()
const { planets, loading, error, totalCount, currentPage, itemsPerPage } = storeToRefs(store)
const { fetchPlanets } = store

function getPlanetId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

onMounted(() => {
  fetchPlanets()
})
</script> 