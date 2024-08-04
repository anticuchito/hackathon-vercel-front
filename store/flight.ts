import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Flight } from '~/types';

export const useFlightStore = defineStore('flight', {
  state: () => ({
    flight: null as Flight | null,
    flights: [] as Flight[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchFlightById(id: string) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get(`/flights/${id}`);
        this.flight = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch flight data';
      } finally {
        this.loading = false;
      }
    },
    async fetchAllFlights() {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        const response = await axiosAdminInstance.get('/flights');
        this.flights = response.data;
      } catch (error: any) {
        this.error = 'Failed to fetch flights data';
      } finally {
        this.loading = false;
      }
    },
    async createFlight(flightData: Flight) {
      this.loading = true;
      this.error = null;
      const { axiosAdminInstance } = useAxios();
      try {
        await axiosAdminInstance.post('/flights', flightData);
        await this.fetchAllFlights();
      } catch (error: any) {
        this.error = 'Failed to create flight';
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isFlightLoaded: (state) => !!state.flight,
  },
});
