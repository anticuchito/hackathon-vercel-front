import { useAuth } from '~/store/auth';
import type { User } from '~/store/types';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const AuthStore = useAuth();

    const AuthData = localStorage.getItem('authData');

    const tokenCookie = useCookie('auth_token');

    if (AuthData && tokenCookie.value) {
      const { user, token, isAuthenticated } = JSON.parse(
        AuthData
      ) as AuthDataType;
      AuthStore.user = user;
      AuthStore.token = token;
      AuthStore.isAuthenticated = isAuthenticated;
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
