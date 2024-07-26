import { useFlightStore } from '~/store/flight';
import { storeToRefs } from 'pinia';
import type { Flight } from '~/types';

export const useFlight = () => {
  const flightStore = useFlightStore();

  const { flight, flights, loading, error } = storeToRefs(flightStore);

  const fetchFlightById = async (id: string) => {
    await flightStore.fetchFlightById(id);
  };

  const fetchAllFlights = async () => {
    await flightStore.fetchAllFlights();
  };

  const createFlight = async (flightData: Flight) => {
    await flightStore.createFlight(flightData);
  };

  return {
    flight,
    flights,
    loading,
    error,
    fetchFlightById,
    fetchAllFlights,
    createFlight,
  };
};
