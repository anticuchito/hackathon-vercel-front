<template>
  <div>
    <LMap
      id="map"
      style="height: 450px; width: 100%"
      :zoom="zoom"
      :center="result ? result : [0, 0]"
      :use-global-leaflet="false"
    >
      <!-- Base Layer -->
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <!-- Marker -->
      <div v-for="point in pointsOfInterests" :key="point.pointOfInterest.id">
        <LMarker
          :latLng="trasnformLatLng(point.pointOfInterest.coordinates)"
          @click="openModal(point.pointOfInterest)"
        >
          <LPopup>{{ point.pointOfInterest.name ?? 'some' }}</LPopup>
        </LMarker>
      </div>

      <marker-modal
        v-if="currentMarker"
        v-model:show-modal="showModal"
        :active-marker="currentMarker"
      />
    </LMap>
    <!-- mergear esta rama con la del loquito -->
    <!-- crear componetes de usuario i agregar boton de favorito -->
  </div>
</template>

<script setup lang="ts">
import type { Trip, PointOfInterest } from '@/types/trips';
import { ref, toRefs } from 'vue';

const showModal = ref(false);
const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});

const { trip } = toRefs(props);

const currentMarker = ref<PointOfInterest | null>(null);

const pointsOfInterests = trip.value.itineraryDetails
  .map((itinerary) => {
    return itinerary.pointsOfInterest;
  })
  .flat();
const result = await getCordinates(trip.value.destination);

console.log(result);

const zoom = ref(12);

const trasnformLatLng = (coordinates: string) => {
  return coordinates.split(',').map((coordinate) => parseFloat(coordinate));
};

const openModal = (marker: PointOfInterest) => {
  currentMarker.value = marker;
  showModal.value = true;
};
</script>

<style scoped></style>
