import axios from 'axios';

import type { AxiosInstance, AxiosResponse } from 'axios';

interface API extends AxiosInstance {
  uploadFile<T>(url: string, file: File): Promise<AxiosResponse<T>>;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
}) as API;

api.uploadFile = async function <T>(url: string, file: File): Promise<AxiosResponse<T>> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await this.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
