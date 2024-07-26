import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Accommodation } from '~/types';

export const useAccommodationStore = defineStore('accommodation', {
  state: () => ({
    accommodation: null as Accommodation | null,
    accommodations: [] as Accommodation[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAccommodationById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/accommodations/${id}`);
        this.accommodation = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch accommodation data';
      } finally {
        this.loading = false;
      }
    },
    async fetchAccommodationsByCity(city: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/accommodations/city/${city}`);
        this.accommodations = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch accommodations data';
      } finally {
        this.loading = false;
      }
    },
    async createAccommodation(accommodationData: Accommodation) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/accommodations', accommodationData);
        await this.fetchAccommodationsByCity(accommodationData.city);
      } catch (error: any) {
        this.error = 'Failed to create accommodation';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isAccommodationLoaded: (state) => !!state.accommodation,
  },
});
