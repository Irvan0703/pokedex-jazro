import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: [],
    pokemonDetails: {},
    editedDescriptions: {}  // untuk simpan deskripsi custom
  }),
  actions: {
    async fetchPokemonList() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      const data = await res.json()
      this.pokemonList = data.results
    },
    async fetchPokemonDetail(name) {
      if (!this.pokemonDetails[name]) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await res.json()
        this.pokemonDetails[name] = data
      }
    },
    editDescription(name, description) {
      this.editedDescriptions[name] = description
    }
  }
})
