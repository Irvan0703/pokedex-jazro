<template>
  <div class="container py-4">
    <button class="btn btn-secondary mb-3" @click="goBack">← Kembali</button>

    <div v-if="!pokemon" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="card shadow p-4">
      <div class="text-center">
        <img :src="pokemon.sprites.front_default" alt="pokemon" style="width: 128px" />
        <h2 class="text-capitalize mt-3">{{ pokemon.name }}</h2>
        <p class="mb-1"><strong>Tipe:</strong> {{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
        <p class="mb-1"><strong>Tinggi:</strong> {{ pokemon.height / 10 }} m</p>
        <p class="mb-3"><strong>Berat:</strong> {{ pokemon.weight / 10 }} kg</p>
      </div>

      <div>
        <h5>Statistik</h5>
        <ul class="list-group mb-3">
          <li v-for="s in pokemon.stats" :key="s.stat.name" class="list-group-item d-flex justify-content-between">
            <span class="text-capitalize">{{ s.stat.name }}</span>
            <span>{{ s.base_stat }}</span>
          </li>
        </ul>

        <h5>Edit Deskripsi</h5>
        <textarea v-model="customDesc" rows="3" class="form-control mb-2"></textarea>
        <button class="btn btn-primary" @click="saveDescription">Simpan Deskripsi</button>

        <div v-if="saved" class="alert alert-success mt-2 p-2">
          Deskripsi berhasil disimpan!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const name = route.params.name
const store = usePokemonStore()

const pokemon = ref(null)
const customDesc = ref('')
const saved = ref(false)

onMounted(async () => {
  await store.fetchPokemonDetail(name)
  pokemon.value = store.pokemonDetails[name]

  if (store.editedDescriptions[name]) {
    customDesc.value = store.editedDescriptions[name]
  }
})

const saveDescription = () => {
  store.editDescription(name, customDesc.value)
  saved.value = true
  setTimeout(() => (saved.value = false), 1500)
}

const goBack = () => {
  router.back()
}
</script>
