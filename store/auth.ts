// import axiosClient from '../plugins/axios-client';
import type { LoginResponse, User } from './types';
import { useAxios } from '@/composables/useAxios';

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const token = ref<string | null | undefined>(null);

  //? 2. Define the getters

  //? 3. Define the actions

  const login = async (email: string, password: string) => {
    console.log('entered login');
    const { data } = await useAxios().axiosInstance.post<LoginResponse>(
      'auth/login',
      {
        email,
        password,
      }
    );

    user.value = data.user;
    const tokenCookie = useCookie('auth_token', {
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    tokenCookie.value = data.token;
    // aca las cosas se guardan en cookies por
    isAuthenticated.value = true;
    useRouter().replace('/home');
    console.log('user logged in', user.value);
  };

  const register = async (dataRegister: dataRegister) => {
    console.log('entered register', dataRegister);
    const resp = await useAxios()
      .axiosInstance.post('auth/register', dataRegister)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    //maibe redircet to login page
    console.log('user registered', resp);

    useRouter().replace('/login');
  };

  const checkAuth = () => {
    const tokenCookie = useCookie('auth_token');
    console.log('Token from cookies:', tokenCookie.value);
    isAuthenticated.value = !!token.value;
    if (tokenCookie.value) {
      token.value = tokenCookie.value;
    } else {
      token.value = null as string | null;
    }
  };

  const redirectIfNotLogged = (reload = false) => {
    if (reload) {
      window.location.href = '/';
    } else {
      useRouter().replace('/');
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    checkAuth,
    redirectIfNotLogged,
    register,
  };
});

type dataRegister = {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
};
