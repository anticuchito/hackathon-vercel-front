<script setup lang="ts">
import { useTripStore } from '../../store/trip';
import { useAuth } from '../../store/auth';
const TripStore = useTripStore();
const AuthStore = useAuth();

const tripsCreatedId = AuthStore.user?.tripsCreated as string[]; // Add type assertion

const createdTrips = await TripStore.getTrips(tripsCreatedId); // Add type assertion
</script>

<template>
  <h3 class="text-2xl font-bold">Viajes Creados</h3>
  <div v-if="createdTrips" v-for="trip in createdTrips" class="">
    <trip-card :trip="trip" />
  </div>
</template>

<style scoped></style>
