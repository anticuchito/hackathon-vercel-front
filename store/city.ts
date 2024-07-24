import { defineStore } from 'pinia';
import type { City } from '~/types';
import { useAxios } from '~/composables/useAxios';
export const useCityStore = defineStore('city', {
    state: () => ({
      city: null as City | null,
      loading: false,
      error: null as string | null,
    }),
    actions: {
      async fetchCityByName(cityName: string) {
        this.loading = true;
        this.error = null;
        const { axiosAdminInstance } = useAxios();
        try {
          const response = await axiosAdminInstance.get(`/city/name/${cityName}`);
          console.log('City fetched:', response.data);
          this.city = response.data;
        } catch (error: any) {
          console.error('Error fetching city:', error);
          this.error = 'Failed to fetch city data';
        } finally {
          this.loading = false;
        }
      },
    },
    getters: {
      isCityLoaded: (state) => !!state.city,
    },
  });