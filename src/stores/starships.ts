import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Starship, ApiResponse } from '@/types/star-wars'

const BASE_URL = 'https://swapi.tech/api'

export const useStarshipsStore = defineStore('starships', () => {
  const starships = ref<Starship[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = 10

  async function fetchStarships(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/starships?page=${page}&limit=${itemsPerPage}`)
      if (!response.ok) throw new Error('Failed to fetch starships')
      const data: ApiResponse<Starship> = await response.json()
      starships.value = data.results
      totalCount.value = data.count
      currentPage.value = page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  async function fetchStarshipById(id: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/starships/${id}`)
      if (!response.ok) throw new Error('Failed to fetch starship')
      const data = await response.json()
      return data.result.properties
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    starships,
    loading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    fetchStarships,
    fetchStarshipById
  }
}) 