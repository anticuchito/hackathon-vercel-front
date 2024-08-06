import { type } from '../.nuxt/types/imports';

<script setup lang="ts">
import type { ActivityElement } from '@/types/trips';
import { computed } from 'vue';

const props = defineProps({
  activities: {
    type: Array as PropType<ActivityElement[]>,
    required: true,
  },
});

const { activities } = toRefs(props);

const activitiesSorted = computed(() => {
  return activities.value.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
});

const convertTime = (stringDate: string) => {
  const dateObj = new Date(stringDate);

  // Extraer la hora, minutos y segundos
  const hours = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');

  const AmOrPm = parseInt(hours) >= 12 ? 'PM' : 'AM';

  // Formatear la hora en HH:MM:SS
  const hora = `${hours}:${minutes} ${AmOrPm}`;

  return hora;
};
</script>

<template>
  <div className="grid gap-4" v-for="activity in activitiesSorted">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-2xl font-bold">
        {{ convertTime(activity.startTime) }}
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          {{ activity.activity.name }}
        </h3>
        <p className="text-muted-foreground">
          {{ activity.activity.description }}
        </p>
        <div className="text-sm text-muted-foreground">
          estimate durtation {{ activity.activity.duration }} minutes
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
