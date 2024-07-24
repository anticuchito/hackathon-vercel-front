import { useCityStore } from '~/store/city';
import { storeToRefs } from 'pinia';

export const useCity = () => {
  const cityStore = useCityStore();

  const { city, loading, error } = storeToRefs(cityStore);
  const fetchCityByName = async (cityName: string) => {
    await cityStore.fetchCityByName(cityName);
  };

  return {
    city,
    loading,
    error,
    fetchCityByName,
  };
};
