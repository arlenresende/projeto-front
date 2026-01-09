import { api } from '@/helpers/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export async function loginRequest(data: LoginPayload): Promise<LoginResponse> {
  const response = await api.post('/auth/login', data);
  const payload = response.data;
  return {
    token: payload?.data?.accessToken,
    user: payload?.data?.user,
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type ForgotPasswordEnvelope = ApiEnvelope<{ message: string }>;

export async function forgotPasswordRequest(
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordEnvelope> {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
}

export async function registerRequest(data: RegisterPayload): Promise<LoginResponse> {
  const response = await api.post('/users/register', data);
  const payload = response.data;
  return {
    token: payload?.data?.accessToken,
    user: payload?.data?.user,
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
