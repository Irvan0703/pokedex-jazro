<template>
  <div class="container py-4">
    <h1 class="mb-4">Pokédex</h1>

    <input
      v-model="search"
      type="text"
      class="form-control mb-3"
      placeholder="Cari Pokémon..."
    />

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Jika hasil pencarian kosong -->
    <div
      v-else-if="filteredPokemon.length === 0"
      class="alert alert-warning text-center"
    >
      Tidak ada Pokémon ditemukan untuk: "{{ search }}"
    </div>

    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      <div
        class="col"
        v-for="pokemon in filteredPokemon"
        :key="pokemon.name"
        @click="goToDetail(pokemon.name)"
        style="cursor: pointer"
      >
        <div class="card h-100 text-center shadow-sm">
          <img
            v-if="pokemon.sprite"
            :src="pokemon.sprite"
            :alt="`Gambar ${pokemon.name}`"
            class="card-img-top mx-auto mt-3"
            style="width: 96px; height: 96px"
            loading="lazy"
          />
          <div class="card-body">
            <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useRouter } from 'vue-router'

const search = ref('')
const router = useRouter()
const store = usePokemonStore()

const isLoading = ref(true)

const fetchData = async () => {
  await store.fetchPokemonList()

  // Ambil detail sprite masing-masing Pokémon
  const promises = store.pokemonList.map(async (p) => {
    try {
      const res = await fetch(p.url)
      const data = await res.json()
      p.sprite = data.sprites.front_default
    } catch (error) {
      console.error(`Gagal ambil data untuk ${p.name}`, error)
      p.sprite = null
    }
  })

  await Promise.all(promises)
  isLoading.value = false
}

onMounted(() => {
  if (store.pokemonList.length === 0) {
    fetchData()
  } else {
    isLoading.value = false
  }
})

const filteredPokemon = computed(() =>
  store.pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const goToDetail = (name) => {
  router.push(`/pokemon/${name}`)
}
</script>
