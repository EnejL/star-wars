import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character, Planet, Starship } from '@/types/star-wars'

interface FavoriteItem {
  id: string
  type: 'character' | 'planet' | 'starship'
  data: Character | Planet | Starship
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteItem[]>([])

  const totalFavorites = computed(() => favorites.value.length)

  function addFavorite(item: FavoriteItem) {
    if (!favorites.value.some(fav => fav.id === item.id && fav.type === item.type)) {
      favorites.value.push(item)
    }
  }

  function removeFavorite(id: string, type: 'character' | 'planet' | 'starship') {
    favorites.value = favorites.value.filter(
      fav => !(fav.id === id && fav.type === type)
    )
  }

  function isFavorite(id: string, type: 'character' | 'planet' | 'starship'): boolean {
    return favorites.value.some(fav => fav.id === id && fav.type === type)
  }

  function getFavoritesByType(type: 'character' | 'planet' | 'starship') {
    return favorites.value.filter(fav => fav.type === type)
  }

  return {
    favorites,
    totalFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType
  }
}) 