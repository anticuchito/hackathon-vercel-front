import { useRestaurantStore } from '~/store/restaurant';
import { storeToRefs } from 'pinia';
import type { Restaurant } from '~/types';

export const useRestaurant = () => {
  const restaurantStore = useRestaurantStore();

  const { restaurant, restaurants, loading, error } = storeToRefs(restaurantStore);

  const fetchRestaurantById = async (id: string) => {
    await restaurantStore.fetchRestaurantById(id);
  };

  const fetchRestaurantBySlug = async (slug: string) => {
    await restaurantStore.fetchRestaurantBySlug(slug);
  };

  const fetchRestaurantsByCity = async (city: string) => {
    await restaurantStore.fetchRestaurantsByCity(city);
  };

  const createRestaurant = async (restaurantData: Restaurant) => {
    await restaurantStore.createRestaurant(restaurantData);
  };

  return {
    restaurant,
    restaurants,
    loading,
    error,
    fetchRestaurantById,
    fetchRestaurantBySlug,
    fetchRestaurantsByCity,
    createRestaurant,
  };
};
