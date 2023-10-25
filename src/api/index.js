import axios from 'axios';
import Cookies from 'universal-cookie';
import { notifyError } from '../helpers/notification';
import { ACCESS_TOKEN } from '../app/constants';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const cookies = new Cookies();
const httpClient = axios.create({
  baseURL: `http://localhost:8080/`,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = cookies.get(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  ({ response }) => {
    const { status } = response ?? {};

    if (parseInt(status, 10) === 401) {
      notifyError('You are not authorized');
    }

    if (parseInt(status, 10) === 403) {
      notifyError("You don't have permission to this resource!");
    }

    if (parseInt(status, 10) === 500) {
      notifyError('Server-side error 500');
    }

    return Promise.reject(response);
  }
);

export const httpGet = (props) => httpClient.request({ method: 'get', ...props });

export const httpPost = (props) => httpClient.request({ method: 'post', ...props });

export const httpPut = (props) => httpClient.request({ method: 'put', ...props });

export const httpDelete = (props) => httpClient.request({ method: 'delete', ...props });
