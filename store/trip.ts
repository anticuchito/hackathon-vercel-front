import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Trip, TripCreation } from '~/types';

export const useTripStore = defineStore('trip', {
  state: () => ({
    trip: null as Trip | null,
    trips: [] as Trip[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTripById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/trips/${id}`);
        this.trip = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch trip data';
      } finally {
        this.loading = false;
      }
    },
    async fetchTripsByCity(city: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/trips/city/${city}`);
        this.trips = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch trips data';
      } finally {
        this.loading = false;
      }
    },
    async fetchFirstUniqueTrips(limit: number) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/trips?limit=${limit}&uniqueDestinations=true`);
        this.trips = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch trips data';
      } finally {
        this.loading = false;
      }
    },
    async createTrip(tripData: TripCreation) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/trips', tripData);
        await this.fetchTripsByCity(tripData.destination);
      } catch (error: any) {
        this.error = 'Failed to create trip';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isTripLoaded: (state) => !!state.trip,
  },
});
