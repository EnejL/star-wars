<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-center mb-6">My Favorites</h1>
      </v-col>
    </v-row>

    <v-row v-if="totalFavorites === 0">
      <v-col cols="12" class="text-center">
        <v-alert
          type="info"
          variant="tonal"
        >
          You haven't added any favorites yet. Start exploring and add some items to your favorites!
        </v-alert>
      </v-col>
    </v-row>

    <template v-else>
      <!-- Characters Section -->
      <v-row v-if="characterFavorites.length > 0">
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Characters</h2>
        </v-col>
        <v-col
          v-for="favorite in characterFavorites"
          :key="favorite.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="mx-auto"
            max-width="400"
            @click="$router.push(`/characters/${favorite.id}`)"
          >
            <v-card-title>{{ (favorite.data as Character).name }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Birth Year</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Character).birth_year }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Gender</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Character).gender }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="error"
                variant="text"
                @click.stop="removeFavorite(favorite.id, 'character')"
              >
                <v-icon>mdi-heart</v-icon>
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Planets Section -->
      <v-row v-if="planetFavorites.length > 0">
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Planets</h2>
        </v-col>
        <v-col
          v-for="favorite in planetFavorites"
          :key="favorite.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="mx-auto"
            max-width="400"
            @click="$router.push(`/planets/${favorite.id}`)"
          >
            <v-card-title>{{ (favorite.data as Planet).name }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Climate</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Planet).climate }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Terrain</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Planet).terrain }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="error"
                variant="text"
                @click.stop="removeFavorite(favorite.id, 'planet')"
              >
                <v-icon>mdi-heart</v-icon>
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Starships Section -->
      <v-row v-if="starshipFavorites.length > 0">
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Starships</h2>
        </v-col>
        <v-col
          v-for="favorite in starshipFavorites"
          :key="favorite.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="mx-auto"
            max-width="400"
            @click="$router.push(`/starships/${favorite.id}`)"
          >
            <v-card-title>{{ (favorite.data as Starship).name }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Model</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Starship).model }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Manufacturer</v-list-item-title>
                  <v-list-item-subtitle>{{ (favorite.data as Starship).manufacturer }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="error"
                variant="text"
                @click.stop="removeFavorite(favorite.id, 'starship')"
              >
                <v-icon>mdi-heart</v-icon>
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Character, Planet, Starship } from '@/types/star-wars'

const store = useFavoritesStore()
const { totalFavorites } = storeToRefs(store)
const { removeFavorite } = store

const characterFavorites = computed(() => store.getFavoritesByType('character'))
const planetFavorites = computed(() => store.getFavoritesByType('planet'))
const starshipFavorites = computed(() => store.getFavoritesByType('starship'))
</script> 