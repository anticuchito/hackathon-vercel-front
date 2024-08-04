<script setup lang="ts">
import type { PointOfInterest } from '@/types/trips'; // Import the Trip type from the appropriate location

const props = defineProps({
  activeMarker: {
    type: Object as PropType<PointOfInterest>,
    required: true,
  },
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const { activeMarker, showModal } = toRefs(props);

const emits = defineEmits(['update:showModal']);

const closeModal = () => {
  emits('update:showModal', false);
};
</script>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content shadow-lg">
      <span class="close" @click="closeModal">&times;</span>
      <div class="content-container">
        <h2 class="text-2xl font-bold">{{ activeMarker.name }}</h2>
        <img
          :src="activeMarker.images[0]"
          alt="Point of interest"
          class="w-full h-48 object-cover rounded-lg"
        />
        <!-- !fix this styles -->
        <p class="text-muted-foreground">{{ activeMarker.description }}</p>

        <div class="text-muted-foreground">
          <span>Hours: {{ activeMarker.openingHours }}</span>
          <span>Price: {{ activeMarker.ticketPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  /* Make the modal visible */
  /* position: fixed; Fixed position to overlap the map */
  position: relative;
  z-index: 1000; /* High z-index to be on top of the map */
  /* left: 13.5vh;
  top: 20vh; */
  width: 100%;
  /* width: 808px; Full width */
  height: 450px; /* Full height */
  /*overflow-x: auto; /* Add scrollbars if needed */
  background-color: rgb(0 0 0 / 32%); /* Fallback color */
}

.modal-content {
  background-color: #fefefe;
  margin: 0; /* Remove margin to align with map */
  padding: 20px;
  height: 450px; /* Match the height of the map */
  width: 40%; /* Full width to match the map */
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.content-container {
  margin-top: 20px;
}
</style>
