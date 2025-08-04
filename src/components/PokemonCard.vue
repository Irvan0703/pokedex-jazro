<template>
  <div class="col" @click="goToDetail" style="cursor: pointer">
    <div class="card h-100 text-center shadow-sm">
      <img
        v-if="pokemon.sprite"
        :src="pokemon.sprite"
        class="card-img-top mx-auto mt-3"
        style="width: 96px; height: 96px"
        :alt="pokemon.name"
      />
      <div class="card-body">
        <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  pokemon: Object
})

const router = useRouter()
const goToDetail = () => {
  router.push(`/pokemon/${props.pokemon.name}`)
}
</script>
