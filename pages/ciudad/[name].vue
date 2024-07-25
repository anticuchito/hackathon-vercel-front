<template>
  <div>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="cityData">
      <div class="banner-city">
        <div class="wrapper-banner">
          <h1 class="text-4xl font-bold mb-4 title-city">{{ cityData.name }}</h1>
        </div>
        <img :src="cityData.images[0]" alt="Banner image" class="w-full h-full object-cover" />
      </div>
      <div class="wrapper-contenido">
        <h2 class="text-2xl font-semibold mb-2 h2-city">Descripción</h2>
        <div class="contenido-texto-city">
          <p class="mb-4 p-contenido-city">{{ cityData.description }}</p>
          <img :src="cityData.images[1]" alt="City description image" class="w-full h-64 object-cover mb-4 image-city" />
        </div>

        <h2 class="text-2xl font-semibold mb-2 text-end h2-city">Best Travel Time</h2>
        <div class="contenido-texto-city-inverse">
          <p class="mb-4 p-contenido-city">{{ cityData.bestTravelTime }}</p>
          <img :src="cityData.images[2]" alt="Best travel time image" class="w-full h-64 object-cover mb-4 image-city" />
        </div>

        <h2 class="text-2xl font-semibold mb-2 h2-city">Reasons to Visit</h2>
        <div class="contenido-texto-city">
          <p class="mb-4 p-contenido-city">{{ cityData.reasonToVisit }}</p>
          <img :src="cityData.images[3]" alt="Reasons to visit image" class="w-full h-64 object-cover mb-4 image-city" />
        </div>

        <h2 class="text-2xl font-semibold mb-2 h2-city">Points of Interest</h2>
        <swiper :slides-per-view="1" :space-between="10" :breakpoints="swiperBreakpoints">
          <swiper-slide v-for="poi in cityData.pointsOfInterest" :key="poi.id">
            <div class="card-city">
            <img :src="poi.images[0]" alt="Point of Interest image" class="w-full h-64 object-cover mt-2" />
            <div class="body-card-city">
            <h3 class="text-xl font-semibold ">{{ poi.name }}</h3>
            <p>{{ poi.description }}</p>
            </div>
          </div>
          </swiper-slide>
        </swiper>

        <h2 class="text-2xl font-semibold mb-2 h2-city">Activities</h2>
        <swiper :slides-per-view="1" :space-between="10" :breakpoints="swiperBreakpoints">
          <swiper-slide v-for="activity in cityData.activities" :key="activity.id">
            <div class="card-city">
            <img :src="activity.images[0]" alt="Activity image" class="w-full h-64 object-cover mt-2" />
            <div class="body-card-city">
            <h3 class="text-xl font-semibold mb-2">{{ activity.name }}</h3>
            <p>{{ activity.description }}</p>
          </div>
            </div>
          </swiper-slide>
        </swiper>

        <h2 class="text-2xl font-semibold mb-2 h2-city">Restaurants</h2>
        <swiper :slides-per-view="1" :space-between="10" :breakpoints="swiperBreakpoints">
          <swiper-slide v-for="restaurant in cityData.restaurants" :key="restaurant.id">
            <div class="card-city">
              <img :src="restaurant.images[0]" alt="Restaurant image" class="w-full h-64 object-cover mt-2" />
              <div class="body-card-city">
            <h3 class="text-xl font-semibold mb-2">{{ restaurant.name }}</h3>
            <p>{{ restaurant.description }}</p>
          </div>
            </div>
          </swiper-slide>
        </swiper>

        <h2 class="text-2xl font-semibold mb-2 h2-city">Accommodations</h2>
        <swiper :slides-per-view="1" :space-between="10" :breakpoints="swiperBreakpoints">
          <swiper-slide v-for="accommodation in cityData.accommodations" :key="accommodation.id">
            <div class="card-city">
              <img :src="accommodation.images[0]" alt="Accommodation image" class="w-full h-64 object-cover mt-2" />
              <div class="body-card-city">
            <h3 class="text-xl font-semibold mb-2">{{ accommodation.name }}</h3>
            <p>{{ accommodation.description }}</p>
            <p><strong>Price:</strong> ${{ accommodation.price }}</p>
            <p><strong>Rating:</strong> {{ accommodation.rating }}</p>
          </div>
            </div>
          </swiper-slide>
        </swiper>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

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

const swiperBreakpoints = computed(() => ({
  480: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1280: {
    slidesPerView: 4,
  },
}));
</script>

<style scoped>
.banner-city {
  height: 400px;
}
/* descripciones */
.title-city {
  position: absolute;
  margin-top: 60px;
  padding: 20px 40px;
}
.contenido-texto-city {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 60px;
}
.contenido-texto-city-inverse {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 60px;
}
.image-city {
  width: 30%;
  border-radius: 8px;
}
.p-contenido-city {
  width: 70%;
}
.wrapper-contenido {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}
.wrapper-banner {
  max-width: 1400px;
  margin: 0 auto;
}
.h2-city {
  margin-top: 40px;
}






.carousel-slide {
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}
.body-card-city{
  background-color: #ebebeb;
    padding: 20px 40px;
    border-radius: 0px 0px 8px 8px;
    min-height: 180px;
    text-align: center;
}
.card-city img{
  border-radius: 8px 8px 0px 0px;
}
</style>
