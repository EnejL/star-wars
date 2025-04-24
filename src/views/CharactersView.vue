<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-center mb-6">Star Wars Characters</h1>
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
        v-for="character in characters"
        :key="character.url"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push(`/characters/${getCharacterId(character.url)}`)"
        >
          <v-card-title>{{ character.name }}</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Birth Year</v-list-item-title>
                <v-list-item-subtitle>{{ character.birth_year }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Gender</v-list-item-title>
                <v-list-item-subtitle>{{ character.gender }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push(`/characters/${getCharacterId(character.url)}`)"
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
          @update:model-value="fetchCharacters"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharactersStore } from '@/stores/characters'
import { storeToRefs } from 'pinia'

const store = useCharactersStore()
const { characters, loading, error, totalCount, currentPage, itemsPerPage } = storeToRefs(store)
const { fetchCharacters } = store

function getCharacterId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

onMounted(() => {
  fetchCharacters()
})
</script> 