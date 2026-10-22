import { authClient, clearToken, getToken } from "@/lib/authClient";
import { ErrorResponse } from "@/types/api-response-type";
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: ErrorResponse,
  ) {
    super(message);
  }
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: false,
});

// attach the better-auth session cookie to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// normalize errors, and sign out on 401
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ErrorResponse>) => {
    const status = err.response?.status ?? 0;
    if (status === 401) {
      await clearToken();
      await authClient.signOut(); // Stack.Protected sends the user to login
    }

    throw new ApiError(
      status,
      err.response?.data?.message ?? err.message,
      err.response?.data,
    );
  },
);
