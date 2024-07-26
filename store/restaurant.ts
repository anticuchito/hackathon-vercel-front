import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Restaurant } from '~/types';

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurant: null as Restaurant | null,
    restaurants: [] as Restaurant[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchRestaurantById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/restaurants/${id}`);
        this.restaurant = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch restaurant data';
      } finally {
        this.loading = false;
      }
    },
    async fetchRestaurantsByCity(city: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/restaurants/city/${city}`);
        this.restaurants = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch restaurants data';
      } finally {
        this.loading = false;
      }
    },
    async createRestaurant(restaurantData: Restaurant) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/restaurants', restaurantData);
        await this.fetchRestaurantsByCity(restaurantData.city);
      } catch (error: any) {
        this.error = 'Failed to create restaurant';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isRestaurantLoaded: (state) => !!state.restaurant,
  },
});
