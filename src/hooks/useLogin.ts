import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { loginRequest, type LoginPayload, type LoginResponse } from '../api/auth';

export function useLogin() {
  const { signIn } = useAuth();

  type ApiEnvelope<T> = {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
  };

  return useMutation<LoginResponse, AxiosError<ApiEnvelope<unknown>>, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      signIn(data.token, data.user);
      toast.success('Login realizado com sucesso', {
        className: '!bg-green-400 !text-white',
      });
    },

    onError: () => {
      const message = 'Erro ao realizar login';
      toast.error(message, {
        className: '!bg-red-400 !text-white',
      });
    },
  });
}
