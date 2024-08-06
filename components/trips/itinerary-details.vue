<script setup lang="ts">
import type { ItineraryDetail } from '@/types/trips';
const props = defineProps({
  itineraryDetails: {
    type: Array as PropType<ItineraryDetail[]>,
    required: true,
  },
});
const { itineraryDetails } = toRefs(props);
</script>
<template>
  <div className="grid gap-6">
    <div className="grid gap-2" v-for="itinerary in itineraryDetails">
      <h2 className="text-2xl font-bold">Dia {{ itinerary.day }}</h2>
      <activities-details :activities="itinerary.activities" />
    </div>
  </div>
</template>

<style scoped></style>
