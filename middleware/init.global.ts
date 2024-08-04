import { useAuth } from '~/store/auth';
import { useTrips } from '~/store/trips';
import type { User } from '~/store/types';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const AuthStore = useAuth();
    const TripStore = useTrips();

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
        TripStore.getTrips(user.tripsCreated);
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
