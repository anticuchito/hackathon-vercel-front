<template>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ pointOfInterest?.name }}</h1>
      <p>{{ pointOfInterest?.description }}</p>
      <p>Tipo: {{ pointOfInterest?.type }}</p>
      <p>Ciudad: {{ pointOfInterest?.city }}</p>
      <div v-if="pointOfInterest?.images && pointOfInterest.images.length">
        <h2>Imágenes</h2>
        <div v-for="(image, index) in pointOfInterest.images" :key="index">
          <img :src="image" :alt="`Imagen ${index + 1}`" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePointOfInterest } from '~/composables/usePointOfInterest';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const { pointOfInterest, loading, error, fetchPointOfInterestBySlug } = usePointOfInterest();
  
      onMounted(async () => {
        const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
        if (slug) {
          try {
            await fetchPointOfInterestBySlug(slug);
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error('No point of interest slug provided');
        }
      });
  
      return {
        pointOfInterest,
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
  