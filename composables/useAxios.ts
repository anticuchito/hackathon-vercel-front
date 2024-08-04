import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useAuth } from '~/store/auth';
const baseURL = process.env.API_URL || 'http://localhost:3001';
const adminURL = `${baseURL}/api`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

const authenticatedApiAxios: AxiosInstance = axios.create({
  baseURL: adminURL,
  withCredentials: true, // Permitir el envío de cookies
});

authenticatedApiAxios.interceptors.request.use((config: any) => {
  if (!process.client) return config;
  const token = useCookie('auth_token').value;
  console.log('Token from cookies:', token); // Verificar el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request config:', config);
  return config;
});

authenticatedApiAxios.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.log('Unauthorized');
    // Redirigir a la página de inicio de sesión
    useRouter().push('/');
    // and clear the token and persisted state
    useAuth().cleanStore();
  }

  return response;
});

export const useAxios = (): {
  axiosInstance: AxiosInstance;
  axiosAdminInstance: AxiosInstance;
} => {
  return { axiosInstance, axiosAdminInstance: authenticatedApiAxios };
};
