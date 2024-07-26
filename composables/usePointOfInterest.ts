import { usePointOfInterestStore } from '~/store/pointOfInterest';
import { storeToRefs } from 'pinia';
import type { PointOfInterest } from '~/types';

export const usePointOfInterest = () => {
  const pointOfInterestStore = usePointOfInterestStore();

  const { pointOfInterest, pointsOfInterest, loading, error } = storeToRefs(pointOfInterestStore);

  const fetchPointOfInterestById = async (id: string) => {
    await pointOfInterestStore.fetchPointOfInterestById(id);
  };

  const fetchPointsOfInterestByCity = async (city: string) => {
    await pointOfInterestStore.fetchPointsOfInterestByCity(city);
  };

  const createPointOfInterest = async (pointOfInterestData: PointOfInterest) => {
    await pointOfInterestStore.createPointOfInterest(pointOfInterestData);
  };

  return {
    pointOfInterest,
    pointsOfInterest,
    loading,
    error,
    fetchPointOfInterestById,
    fetchPointsOfInterestByCity,
    createPointOfInterest,
  };
};
