import { useTripStore } from '~/store/trip';
import { storeToRefs } from 'pinia';
import type { TripCreation } from '~/types';

export const useTrip = () => {
  const tripStore = useTripStore();

  const { trip, trips, loading, error } = storeToRefs(tripStore);

  const fetchTripById = async (id: string) => {
    await tripStore.fetchTripById(id);
  };

  const fetchTripsByCity = async (city: string) => {
    await tripStore.fetchTripsByCity(city);
  };

  const fetchFirstUniqueTrips = async (limit: number) => {
    await tripStore.fetchFirstUniqueTrips(limit);
    return tripStore.trips;
  };

  const createTrip = async (tripData: TripCreation) => {
    await tripStore.createTrip(tripData);
  };

  return {
    trip,
    trips,
    loading,
    error,
    fetchTripById,
    fetchTripsByCity,
    fetchFirstUniqueTrips,
    createTrip,
  };
};
