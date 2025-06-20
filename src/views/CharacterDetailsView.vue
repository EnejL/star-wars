<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          variant="text"
          @click="$router.push('/characters')"
          class="mb-4"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Back to Characters
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

    <v-row v-else-if="character">
      <v-col cols="12" class="mx-auto">
        <v-card>
          <v-card-title class="d-flex align-center">
            {{ character.name }}
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
                    <v-list-item-title>Birth Year</v-list-item-title>
                    <v-list-item-subtitle>{{ character.birth_year }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Gender</v-list-item-title>
                    <v-list-item-subtitle>{{ character.gender }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Height</v-list-item-title>
                    <v-list-item-subtitle>{{ character.height }} cm</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Mass</v-list-item-title>
                    <v-list-item-subtitle>{{ character.mass }} kg</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Eye Color</v-list-item-title>
                    <v-list-item-subtitle>{{ character.eye_color }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Hair Color</v-list-item-title>
                    <v-list-item-subtitle>{{ character.hair_color }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Skin Color</v-list-item-title>
                    <v-list-item-subtitle>{{ character.skin_color }}</v-list-item-subtitle>
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
import { useCharactersStore } from '@/stores/characters'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Character } from '@/types/star-wars'

const route = useRoute()
const charactersStore = useCharactersStore()
const favoritesStore = useFavoritesStore()
const { loading, error } = storeToRefs(charactersStore)
const character = ref<Character | null>(null)

const isFavorite = computed(() => {
  if (!character.value) return false
  return favoritesStore.isFavorite(getCharacterId(character.value.url), 'character')
})

function getCharacterId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getPlanetId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getFilmId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getStarshipId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getVehicleId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function toggleFavorite() {
  if (!character.value) return
  const id = getCharacterId(character.value.url)
  if (isFavorite.value) {
    favoritesStore.removeFavorite(id, 'character')
  } else {
    favoritesStore.addFavorite({
      id,
      type: 'character',
      data: character.value
    })
  }
}

onMounted(async () => {
  const id = route.params.id as string
  character.value = await charactersStore.fetchCharacterById(id)
})
</script> 