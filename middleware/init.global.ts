import { useAuth } from '~/store/auth';
import { useTripStore } from '~/store/trip';
import type { User } from '~/store/types';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const AuthStore = useAuth();
    const TripStore = useTripStore();

    const AuthData = localStorage.getItem('authData');

    const tokenCookie = useCookie('auth_token');

    if (AuthData && tokenCookie.value) {
      const { user, token, isAuthenticated } = JSON.parse(
        AuthData
      ) as AuthDataType;
      AuthStore.user = user;
      AuthStore.token = token;
      AuthStore.isAuthenticated = isAuthenticated;

      TripStore.tripIds = user.tripsCreated;

      if (TripStore.trips.length === 0) {
        const tripsUser = await TripStore.getTrips(user.tripsCreated);
        TripStore.tripsByUser = tripsUser ?? [];
      }
    } else {
      AuthStore.cleanStore();
      navigateTo('/');
    }
    // AuthStore.checkAuth();

    if (!AuthStore.isAuthenticated && to.meta.layout !== 'not-logged-in') {
      AuthStore.redirectIfNotLogged(true);
    }
  }
});

type AuthDataType = {
  user: User;
  token: string;
  isAuthenticated: boolean;
};
