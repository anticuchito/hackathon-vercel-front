import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';
import type { Trip } from '~/types/trips';
import type { TripCreation } from '~/types';

export const useTripStore = defineStore('trip', {
  state: () => ({
    trip: null as Trip | null,
    trips: [] as Trip[],
    tripsByUser: [] as Trip[],
    tripIds: [] as string[],
    favoriteTrips: [] as Trip[],
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
        const response = await axiosAdminInstance.get(
          `/trips?limit=${limit}&uniqueDestinations=true`
        );
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
        const resp = await axiosAdminInstance
          .post('/trips', tripData)
          .then((res) => res.data as Trip);
        await this.fetchTripsByCity(tripData.destination);

        return resp.id;
      } catch (error: any) {
        this.error = 'Failed to create trip';
      } finally {
        this.loading = false;
      }
    },

    async getTrips(tripsIds: string[]) {
      const { axiosAdminInstance } = useAxios();
      console.log('tripsIds', tripsIds);
      if (!tripsIds) return;
      try {
        //   getting all trips from the user
        const tripsData = await Promise.all(
          tripsIds.map(
            async (id) =>
              await axiosAdminInstance
                .get<Trip>(`trips/${id}`)
                .then((res) => res.data)
          )
        );
        return tripsData;
      } catch (err) {
        console.log(err);
      }
    },

    async getfavoriteTrips(tripsIds: string[]) {
      const { axiosAdminInstance } = useAxios();
      try {
        //   getting all trips from the user
        this.getTrips(tripsIds);
      } catch (err) {
        console.log(err);
      }
    },
    async getTrip(id: string) {
      console.log('id', id);
      const { axiosAdminInstance } = useAxios();
      const tripData = await axiosAdminInstance
        .get<Trip>(`trips/${id}`)
        .then((res) => res.data);
      this.trip = tripData;
      return tripData;
    },
  },
  getters: {
    isTripLoaded: (state) => !!state.trip,
  },
});
