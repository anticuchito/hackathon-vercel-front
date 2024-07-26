import { useAccommodationStore } from '~/store/accommodation';
import { storeToRefs } from 'pinia';
import type { Accommodation } from '~/types';

export const useAccommodation = () => {
  const accommodationStore = useAccommodationStore();

  const { accommodation, accommodations, loading, error } = storeToRefs(accommodationStore);

  const fetchAccommodationById = async (id: string) => {
    await accommodationStore.fetchAccommodationById(id);
  };

  const fetchAccommodationsByCity = async (city: string) => {
    await accommodationStore.fetchAccommodationsByCity(city);
  };

  const createAccommodation = async (accommodationData: Accommodation) => {
    await accommodationStore.createAccommodation(accommodationData);
  };

  return {
    accommodation,
    accommodations,
    loading,
    error,
    fetchAccommodationById,
    fetchAccommodationsByCity,
    createAccommodation,
  };
};
