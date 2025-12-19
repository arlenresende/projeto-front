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
