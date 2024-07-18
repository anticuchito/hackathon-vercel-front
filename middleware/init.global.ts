import { useAuth } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const AuthStore = useAuth();
    AuthStore.checkAuth();

    if (!AuthStore.isAuthenticated && to.meta.layout !== 'not-logged-in') {
      AuthStore.redirectIfNotLogged(true);
    }
  }
});
