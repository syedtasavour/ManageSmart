import type { AxiosRequestConfig } from 'axios';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface ApiClientOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> {
  method?: HttpMethod;
  body?: any;
}
