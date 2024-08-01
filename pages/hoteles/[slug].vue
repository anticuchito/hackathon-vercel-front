<template>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ accommodation?.name }}</h1>
      <p>{{ accommodation?.address }}</p>
      <p>Precio: {{ accommodation?.price }} EUR</p>
      <p>Ciudad: {{ accommodation?.city }}</p>
      <div v-if="accommodation?.images && accommodation.images.length">
        <h2>Imágenes</h2>
        <div v-for="(image, index) in accommodation.images" :key="index">
          <img :src="image" :alt="`Imagen ${index + 1}`" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAccommodation } from '~/composables/useAccommodation';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const { accommodation, loading, error, fetchAccommodationBySlug } = useAccommodation();
  
      onMounted(async () => {
        const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
        if (slug) {
          try {
            await fetchAccommodationBySlug(slug);
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error('No accommodation slug provided');
        }
      });
  
      return {
        accommodation,
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
  