import { useActivityStore } from '~/store/activity';
import { storeToRefs } from 'pinia';
import type { Activity } from '~/types';

export const useActivity = () => {
  const activityStore = useActivityStore();

  const { activity, activities, loading, error } = storeToRefs(activityStore);

  const fetchActivityById = async (id: string) => {
    await activityStore.fetchActivityById(id);
  };

  const fetchActivityBySlug = async (slug: string) => {
    await activityStore.fetchActivityBySlug(slug);
  };

  const fetchActivitiesByCity = async (city: string) => {
    await activityStore.fetchActivitiesByCity(city);
  };

  const createActivity = async (activityData: Activity) => {
    await activityStore.createActivity(activityData);
  };

  return {
    activity,
    activities,
    loading,
    error,
    fetchActivityById,
    fetchActivityBySlug,
    fetchActivitiesByCity,
    createActivity,
  };
};
