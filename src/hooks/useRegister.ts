import { registerRequest, type LoginResponse, type RegisterPayload } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export function useRegister() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError<ApiEnvelope<unknown>>, RegisterPayload>({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      signIn(data.token, data.user);
      toast.success('Cadastro realizado com sucesso', {
        className: '!bg-green-400 !text-white',
      });
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      const message = error.response?.data?.message ?? 'Erro ao realizar cadastro';
      toast.error(message, {
        className: '!bg-red-400 !text-white',
      });
    },
  });
}
