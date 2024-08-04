import type { LoginResponse, User } from './types';
import { useAxios } from '@/composables/useAxios';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const { axiosAdminInstance, axiosInstance } = useAxios();
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const token = ref<string | null | undefined>(null);

  //? 2. Define the getters

  //? 3. Define the actions
  //FIXME:add persistance to auth store becaus is not persintant dont redirect to home apropiatly and fix redorect functionality if this first time user enter to the page

  const login = async (email: string, password: string) => {
    console.log('entered login');
    const { data } = await axiosInstance.post<LoginResponse>('auth/login', {
      email,
      password,
    });

    user.value = data.user;
    const tokenCookie = useCookie('auth_token', {
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    tokenCookie.value = data.token;
    // aca las cosas se guardan en cookies por
    isAuthenticated.value = true;

    // persisted state for store

    const storeAuthData = {
      user: user.value,
      token: tokenCookie.value,
      isAuthenticated: isAuthenticated.value,
    };

    localStorage.setItem('authData', JSON.stringify(storeAuthData));

    useRouter().replace('/home');
    console.log('user logged in', user.value);
  };

  const register = async (dataRegister: dataRegister) => {
    console.log('entered register', dataRegister);
    const resp = await axiosInstance
      .post('auth/register', dataRegister)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    //maibe redircet to login page
    console.log('user registered', resp);

    useRouter().replace('/login');
  };

  const checkAuth = async () => {
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

  const cleanStore = () => {
    localStorage.removeItem('authData');
    user.value = null;
    isAuthenticated.value = false;
    token.value = null;
  };

  const persistAuthData = () => {
    const storeData = localStorage.getItem('authData');

    if (!storeData) return;

    const { user, token: tokenData, isAuthenticated } = JSON.parse(storeData);

    user.value = JSON.parse(user);
    token.value = tokenData;
    isAuthenticated.value = isAuthenticated;
  };

  const updatedUserTripsCreated = (tripId: string) => {
    console.log('user trips created', user.value?.tripsCreated);

    user.value?.tripsCreated.push(tripId);

    localStorage.setItem('authData', JSON.stringify(user.value));
  };
  return {
    user,
    isAuthenticated,
    token,
    login,
    checkAuth,
    redirectIfNotLogged,
    register,
    cleanStore,
    persistAuthData,
    updatedUserTripsCreated,
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
type AuthDataType = Record<string, string>;
