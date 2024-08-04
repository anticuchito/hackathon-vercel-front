import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { PointOfInterest } from '~/types';

export const usePointOfInterestStore = defineStore('pointOfInterest', {
  state: () => ({
    pointOfInterest: null as PointOfInterest | null,
    pointsOfInterest: [] as PointOfInterest[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchPointOfInterestById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/pointsOfInterest/${id}`);
        this.pointOfInterest = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch point of interest data';
      } finally {
        this.loading = false;
      }
    },
    async fetchPointOfInterestBySlug(slug: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/pointsOfInterest/slug/${slug}`);
        this.pointOfInterest = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch point of interest data';
      } finally {
        this.loading = false;
      }
    },
    async fetchPointsOfInterestByCity(city: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/pointsOfInterest/city/${city}`);
        this.pointsOfInterest = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch points of interest data';
      } finally {
        this.loading = false;
      }
    },
    async createPointOfInterest(pointOfInterestData: PointOfInterest) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/pointsOfInterest', pointOfInterestData);
        await this.fetchPointsOfInterestByCity(pointOfInterestData.city);
      } catch (error: any) {
        this.error = 'Failed to create point of interest';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isPointOfInterestLoaded: (state) => !!state.pointOfInterest,
  },
});
