<script setup lang="ts">
import { useTripStore } from '../../store/trip';
import { useAuth } from '../../store/auth';
const TripStore = useTripStore();
const AuthStore = useAuth();

const favoriteTripsId = AuthStore.user?.favoriteTrips as string[]; // Add type assertion

const favoriteTrips = await TripStore.getTrips(favoriteTripsId); // Add type assertion
</script>

<template>
  <div v-if="favoriteTrips" v-for="trip in favoriteTrips" class="">
    <trip-card :trip="trip" :is-from-favorite="true" />
  </div>
</template>

<style scoped></style>
