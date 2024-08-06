import { useCityStore } from '~/store/city';
import { storeToRefs } from 'pinia';

export const useCity = () => {
  const cityStore = useCityStore();

  const { city, cities, loading, error } = storeToRefs(cityStore);

  const fetchCityByName = async (cityName: string) => {
    await cityStore.fetchCityByName(cityName);
  };

  const fetchFirstCities = async (limit: number) => {
    await cityStore.fetchFirstCities(limit);
    return cityStore.cities;
  };

  return {
    city,
    cities,
    loading,
    error,
    fetchCityByName,
    fetchFirstCities,
  };
};
