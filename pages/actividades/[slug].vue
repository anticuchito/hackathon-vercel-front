<template>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ activity?.name }}</h1>
      <p>{{ activity?.description }}</p>
      <p>Duración: {{ activity?.duration }} horas</p>
      <p>Ciudad: {{ activity?.city }}</p>
      <div v-if="activity?.images && activity.images.length">
        <h2>Imágenes</h2>
        <div v-for="(image, index) in activity.images" :key="index">
          <img :src="image" :alt="`Imagen ${index + 1}`" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useActivity } from '~/composables/useActivity';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const { activity, loading, error, fetchActivityBySlug } = useActivity();
  
      onMounted(async () => {
        const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
        if (slug) {
          try {
            await fetchActivityBySlug(slug);
          } catch (e) {
            console.error(e);
          }
        } else {
          console.error('No activity slug provided');
        }
      });
  
      return {
        activity,
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
  