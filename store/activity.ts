import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Activity } from '~/types';

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activity: null as Activity | null,
    activities: [] as Activity[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchActivityById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/activities/${id}`);
        this.activity = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch activity data';
      } finally {
        this.loading = false;
      }
    },
    async fetchActivitiesByCity(city: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/activities/city/${city}`);
        this.activities = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch activities data';
      } finally {
        this.loading = false;
      }
    },
    async createActivity(activityData: Activity) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/activities', activityData);
        await this.fetchActivitiesByCity(activityData.city);
      } catch (error: any) {
        this.error = 'Failed to create activity';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isActivityLoaded: (state) => !!state.activity,
  },
});
