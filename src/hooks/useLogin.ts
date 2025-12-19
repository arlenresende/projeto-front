import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../api/auth';

export function useLogin() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      signIn(data.token, data.user);
    },
  });
}
