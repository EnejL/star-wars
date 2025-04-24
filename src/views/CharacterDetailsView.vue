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
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h4">{{ character.name }}</v-card-title>

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

              <v-list-item>
                <v-list-item-title>Height</v-list-item-title>
                <v-list-item-subtitle>{{ character.height }} cm</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Mass</v-list-item-title>
                <v-list-item-subtitle>{{ character.mass }} kg</v-list-item-subtitle>
              </v-list-item>

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
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">Additional Information</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Homeworld</v-list-item-title>
                <v-list-item-subtitle>
                  <v-btn
                    variant="text"
                    color="primary"
                    @click="$router.push(`/planets/${getPlanetId(character.homeworld)}`)"
                  >
                    View Homeworld
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Films</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="film in character.films"
                    :key="film"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                  >
                    Film {{ getFilmId(film) }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Starships</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="starship in character.starships"
                    :key="starship"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                    @click="$router.push(`/starships/${getStarshipId(starship)}`)"
                  >
                    Starship {{ getStarshipId(starship) }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Vehicles</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="vehicle in character.vehicles"
                    :key="vehicle"
                    class="ma-1"
                    color="primary"
                    variant="outlined"
                  >
                    Vehicle {{ getVehicleId(vehicle) }}
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCharactersStore } from '@/stores/characters'
import type { Character } from '@/types/star-wars'

const route = useRoute()
const store = useCharactersStore()
const { loading, error } = storeToRefs(store)
const character = ref<Character | null>(null)

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

onMounted(async () => {
  const id = route.params.id as string
  character.value = await store.fetchCharacterById(id)
})
</script> 