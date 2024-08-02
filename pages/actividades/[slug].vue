<template>
  <div>
    <div v-if="!loading && !error && activity" class="banner-city" :style="{ backgroundImage: `url(${activity.images[0]})` }">
      <div class="wrapper-banner">
        <h1 class="title-city">{{ activity.name }}</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20">Cargando...</div>
    <div v-else-if="error" class="text-center py-20 text-red-500">{{ error }}</div>
    <div v-else class="wrapper-contenido">
      <h1 class="text-3xl font-bold mb-4 text-center">{{ activity?.name }}</h1>

      <div v-if="activity?.images && activity.images.length" class="my-8">
        <swiper :modules="[Navigation, Pagination]" navigation pagination class="mySwiper">
          <swiper-slide v-for="(image, index) in activity.images" :key="index">
            <div class="image-wrapper">
              <img :src="image" :alt="`Imagen ${index + 1}`" class="carousel-image" />
            </div>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </div>

      <div class="activity-details">
        <p class="text-lg mb-4">{{ activity?.description }}</p>
        <p class="text-md mb-4"><strong>Duración:</strong> {{ activity?.duration }} minutos</p>
        <p class="text-md mb-4"><strong>Precio:</strong> ${{ activity?.cost }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useActivity } from '~/composables/useActivity';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

// Route params
const route = useRoute();
const slug = ref(route.params.slug as string);

// Composables
const { fetchActivityBySlug, activity, loading, error } = useActivity();

// Fetch activity data on component mount
onMounted(async () => {
  if (slug.value) {
    try {
      await fetchActivityBySlug(slug.value);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error('No activity slug provided');
  }
});
</script>

<style scoped>
.wrapper-contenido {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;

}
.banner-city {
  height: 400px;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-city {
  position: absolute;
  top: 60px;
  left: 40px;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 8px;
}
.swiper-button-next,
.swiper-button-prev {
  color: #000;
}
.swiper-pagination-bullet {
  background: #000;
}
.activity-details {
  padding: 20px;
}
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  overflow: hidden;
}
.carousel-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
