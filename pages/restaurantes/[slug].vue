<template>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ restaurant?.name }}</h1>
      <p>{{ restaurant?.address }}</p>
      <p>Cocina: {{ restaurant?.cuisine }}</p>
      <p>Rango de precios: {{ restaurant?.priceRange }}</p>
      <p>Ciudad: {{ restaurant?.city }}</p>
      <div v-if="restaurant?.images && restaurant.images.length">
        <h2>Imágenes</h2>
        <div v-for="(image, index) in restaurant.images" :key="index">
          <img :src="image" :alt="`Imagen ${index + 1}`" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRestaurant } from '~/composables/useRestaurant';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const { restaurant, loading, error, fetchRestaurantBySlug } = useRestaurant();
  
      onMounted(async () => {
        const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
        if (slug) {
          try {
            await fetchRestaurantBySlug(slug);
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error('No restaurant slug provided');
        }
      });
  
      return {
        restaurant,
        loading,
        error,
      };
    },
  });
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  