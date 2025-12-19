import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '@/hooks/useLogin';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, { message: 'Email obrigatório' }),
  password: z.string().min(1, { message: 'Senha obrigatória' }),
});

type FormData = z.infer<typeof schema>;

export default function signInController() {
  const loginMutation = useLogin();
  const loading = loginMutation.isPending;

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await loginMutation.mutateAsync(data);
  });

  return {
    handleSubmit,
    register,
    errors,
    control,
    loading,
    reset,
  };
}
