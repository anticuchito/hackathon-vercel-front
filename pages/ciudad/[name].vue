<template>
    <div>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="city">
        <h1 class="text-4xl font-bold mb-4">{{ city.name }}</h1>
        <p class="mb-4">{{ city.description }}</p>
        <h2 class="text-2xl font-semibold mb-2">Best Travel Time</h2>
        <p class="mb-4">{{ city.bestTravelTime }}</p>
        <h2 class="text-2xl font-semibold mb-2">Reasons to Visit</h2>
        <ul class="list-disc pl-5">
          <li v-for="reason in city.reasonToVisit.split('  ')" :key="reason" class="mb-2">{{ reason }}</li>
        </ul>
  
        <h2 class="text-2xl font-semibold mb-2 mt-4">Accommodations</h2>
        <div v-for="accommodation in city.accommodations" :key="accommodation.id" class="mb-4">
          <h3 class="text-xl font-semibold">{{ accommodation.name }}</h3>
          <p>{{ accommodation.description }}</p>
          <p><strong>Price:</strong> ${{ accommodation.price }}</p>
          <p><strong>Rating:</strong> {{ accommodation.rating }}</p>
          <div class="flex space-x-2 mt-2">
            <img v-for="image in accommodation.images" :key="image" :src="image" class="w-32 h-32 object-cover" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>No city found.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCity } from '~/composables/useCityStore';
  
  const route = useRoute();
  const { fetchCityByName, city, loading, error } = useCity();
  const cityName = route.params.name as string;
  
  console.log(`Page loaded for city: ${cityName}`);
  
  const loadCity = async () => {
    await fetchCityByName(cityName);
  };
  
  onMounted(async () => {
    console.log('onMounted: calling loadCity');
    await loadCity();
  });
  
  watch(() => route.params.name, async (newName) => {
    if (newName) {
      console.log(`Route param changed to: ${newName}`);
      await loadCity();
    }
  });
  
  const isLoading = computed(() => loading.value);
  const cityData = computed(() => city.value);
  </script>
  
  <style scoped>
  /* Añade estilos personalizados si es necesario */
  </style>
  