<template>
  <v-btn
    icon
    color="error"
    size="large"
    class="favorites-button"
    @click="$router.push('/favorites')"
  >
    <v-badge
      :content="totalFavorites"
      color="error"
      :model-value="totalFavorites > 0"
      class="favorites-badge"
    >
      <v-icon>mdi-heart</v-icon>
    </v-badge>
  </v-btn>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'

const store = useFavoritesStore()
const { totalFavorites } = storeToRefs(store)
</script>

<style scoped>
.favorites-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 99999;
}

.favorites-badge :deep(.v-badge__badge) {
  background-color: white !important;
  color: #1976D2 !important;
}
</style> 