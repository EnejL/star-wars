import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Character, ApiResponse } from '@/types/star-wars'

const BASE_URL = 'https://swapi.tech/api'

export const useCharactersStore = defineStore('characters', () => {
  const characters = ref<Character[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = 10

  async function fetchCharacters(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/people?page=${page}&limit=${itemsPerPage}`)
      if (!response.ok) throw new Error('Failed to fetch characters')
      const data: ApiResponse<Character> = await response.json()
      characters.value = data.results
      totalCount.value = data.count
      currentPage.value = page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  async function fetchCharacterById(id: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${BASE_URL}/people/${id}`)
      if (!response.ok) throw new Error('Failed to fetch character')
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
    characters,
    loading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    fetchCharacters,
    fetchCharacterById
  }
}) 