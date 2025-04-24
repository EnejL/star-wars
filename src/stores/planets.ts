import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Planet, ApiResponse } from '@/types/star-wars'

const BASE_URL = 'https://swapi.tech/api'

export const usePlanetsStore = defineStore('planets', () => {
  const planets = ref<Planet[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = 10

  async function fetchPlanets(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/planets?page=${page}&limit=${itemsPerPage}`)
      if (!response.ok) throw new Error('Failed to fetch planets')
      const data: ApiResponse<Planet> = await response.json()
      planets.value = data.results
      totalCount.value = data.count
      currentPage.value = page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  async function fetchPlanetById(id: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/planets/${id}`)
      if (!response.ok) throw new Error('Failed to fetch planet')
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
    planets,
    loading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    fetchPlanets,
    fetchPlanetById
  }
}) 