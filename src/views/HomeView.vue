<script setup lang="ts">
import peopleImage from '@/assets/images/people.png'
import spaceStationImage from '@/assets/images/space-station.png'
import aircraftImage from '@/assets/images/aircraft.png'
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-center mb-6">Star Wars Explorer</h1>
        <p class="text-h6 text-center mb-12">Explore the vast universe of Star Wars through its characters, planets, and starships.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push('/characters')"
        >
          <v-img
            :src="peopleImage"
            height="200"
            contain
          ></v-img>

          <v-card-title>Characters</v-card-title>

          <v-card-text>
            Discover the heroes, villains, and everything in between from the Star Wars universe. Learn about their backgrounds, affiliations, and adventures.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push('/characters')"
            >
              Explore Characters
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push('/planets')"
        >
          <v-img
            :src="spaceStationImage"
            height="200"
            contain
          ></v-img>

          <v-card-title>Planets</v-card-title>

          <v-card-text>
            Journey through the diverse worlds of the Star Wars galaxy. From desert planets to ice worlds, explore the unique characteristics of each location.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push('/planets')"
            >
              Explore Planets
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="mx-auto"
          max-width="400"
          @click="$router.push('/starships')"
        >
          <v-img
            :src="aircraftImage"
            height="200"
            contain
          ></v-img>

          <v-card-title>Starships</v-card-title>

          <v-card-text>
            Examine the impressive fleet of starships that traverse the galaxy. From small fighters to massive capital ships, learn about their capabilities and history.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="$router.push('/starships')"
            >
              Explore Starships
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
