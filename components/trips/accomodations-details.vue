<script setup lang="ts">
import type { AccommodationElement } from '@/types/trips';
const props = defineProps({
  accomodation: {
    type: Object as PropType<AccommodationElement>,
    required: true,
  },
});

const { accomodation } = toRefs(props);
</script>

<template>
  <div
    class="grid grid-cols-[1fr_auto] gap-4 items-center rounded border rounded-lg border-gray-300 p-4"
  >
    <div>
      <h3 class="text-lg font-semibold">
        {{ accomodation.accommodation.name }}
      </h3>
      <div class="text-muted-foreground">
        {{ accomodation.accommodation.rating }}
        <Icon
          name="line-md:star-filled"
          class="w-4 h-4 inline-block fill-primary"
        />
      </div>
      <p class="text-muted-foreground">
        {{ accomodation.accommodation.description }}
      </p>
    </div>
    <div class="text-right">
      <div class="text-2xl font-bold">
        {{ accomodation.accommodation.price }} $
      </div>
      <div class="text-sm text-muted-foreground">per night</div>
      <button variant="outline" size="sm" class="mt-2">
        Check availability
      </button>
    </div>
  </div>
</template>

<style scoped></style>
