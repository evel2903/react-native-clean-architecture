import { AxiosRequestConfig } from "axios";

export const IHttpClientToken = Symbol("IHttpClient");

export default interface IHttpClient {
  get<ResponseType>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  post<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  patch<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;

  delete<ResponseType>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType>;
  
  // Add these new methods for token management
  storeTokens(accessToken: string, refreshToken: string): Promise<void>;
  
  clearTokens(): Promise<void>;
}