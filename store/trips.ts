import type { DataTrip, Trip } from '@/types/trips';
import { useAxios } from '../composables/useAxios';
import { ref } from 'vue';

export const useTrips = defineStore('trips', () => {
  const { axiosAdminInstance, axiosInstance } = useAxios();
  const trips = ref<Trip[]>([]);
  const trip = ref<Trip | null>(null); //as current trip
  const tripIds = ref<string[]>([]);
  //   create a middleware to get all trips from the user
  const getTrips = async (tripsIds: string[]) => {
    try {
      //   getting all trips from the user
      const tripsData = await Promise.all(
        tripsIds.map(async (id) => {
          const { data } = await axiosAdminInstance.get<Trip>(`trips/${id}`);
          trips.value.push(data);
          return data;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getTrip = async (id: string) => {
    console.log('id', id);
    const tripData = await axiosAdminInstance
      .get<Trip>(`trips/${id}`)
      .then((res) => res.data);
    trip.value = tripData;
    return tripData;
  };
  //   apply in the form
  const createTrip = async (dataTrip: DataTrip) => {
    console.log('dataTrip', dataTrip);
    try {
      const resp = await useAxios()
        .axiosAdminInstance.post('trips', dataTrip)
        .then((res) => res.data as Trip);

      trips.value.push(resp);
      // maybe redirect to trips page
      console.log('trip created', resp);
      return resp;
    } catch (error) {
      console.error('Ërror:', error);
    }
  };

  const getTripById = (id: string) => {
    return trips.value.find((trip) => trip.id === id);
  };

  return {
    trips,
    trip,
    tripIds,
    getTrips,
    getTrip,
    createTrip,
    getTripById,
  };
});
