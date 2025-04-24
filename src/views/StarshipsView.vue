<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-center mb-6">Star Wars Starships</h1>
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
        v-for="starship in starships"
        :key="starship.url"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push(`/starships/${getStarshipId(starship.url)}`)"
        >
          <v-card-title>{{ starship.name }}</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Model</v-list-item-title>
                <v-list-item-subtitle>{{ starship.model }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Manufacturer</v-list-item-title>
                <v-list-item-subtitle>{{ starship.manufacturer }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Starship Class</v-list-item-title>
                <v-list-item-subtitle>{{ starship.starship_class }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push(`/starships/${getStarshipId(starship.url)}`)"
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
          @update:model-value="fetchStarships"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStarshipsStore } from '@/stores/starships'
import { storeToRefs } from 'pinia'

const store = useStarshipsStore()
const { starships, loading, error, totalCount, currentPage, itemsPerPage } = storeToRefs(store)
const { fetchStarships } = store

function getStarshipId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

onMounted(() => {
  fetchStarships()
})
</script> 