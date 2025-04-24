<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          variant="text"
          @click="$router.push('/starships')"
          class="mb-4"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Back to Starships
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

    <v-row v-else-if="starship">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            {{ starship.name }}
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
                <v-list-item-title>Cost in Credits</v-list-item-title>
                <v-list-item-subtitle>{{ starship.cost_in_credits }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Length</v-list-item-title>
                <v-list-item-subtitle>{{ starship.length }} meters</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Crew</v-list-item-title>
                <v-list-item-subtitle>{{ starship.crew }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Passengers</v-list-item-title>
                <v-list-item-subtitle>{{ starship.passengers }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Cargo Capacity</v-list-item-title>
                <v-list-item-subtitle>{{ starship.cargo_capacity }} kg</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Consumables</v-list-item-title>
                <v-list-item-subtitle>{{ starship.consumables }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Hyperdrive Rating</v-list-item-title>
                <v-list-item-subtitle>{{ starship.hyperdrive_rating }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>MGLT</v-list-item-title>
                <v-list-item-subtitle>{{ starship.MGLT }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Starship Class</v-list-item-title>
                <v-list-item-subtitle>{{ starship.starship_class }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">Additional Information</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Pilots</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="pilot in starship.pilots"
                    :key="pilot"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                    @click="$router.push(`/characters/${getCharacterId(pilot)}`)"
                  >
                    Character {{ getCharacterId(pilot) }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Films</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="film in starship.films"
                    :key="film"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                  >
                    Film {{ getFilmId(film) }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStarshipsStore } from '@/stores/starships'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Starship } from '@/types/star-wars'

const route = useRoute()
const starshipsStore = useStarshipsStore()
const favoritesStore = useFavoritesStore()
const { loading, error } = storeToRefs(starshipsStore)
const starship = ref<Starship | null>(null)

const isFavorite = computed(() => {
  if (!starship.value) return false
  return favoritesStore.isFavorite(getStarshipId(starship.value.url), 'starship')
})

function getStarshipId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getCharacterId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function getFilmId(url: string): string {
  return url.split('/').filter(Boolean).pop() || ''
}

function toggleFavorite() {
  if (!starship.value) return
  const id = getStarshipId(starship.value.url)
  if (isFavorite.value) {
    favoritesStore.removeFavorite(id, 'starship')
  } else {
    favoritesStore.addFavorite({
      id,
      type: 'starship',
      data: starship.value
    })
  }
}

onMounted(async () => {
  const id = route.params.id as string
  starship.value = await starshipsStore.fetchStarshipById(id)
})
</script> 