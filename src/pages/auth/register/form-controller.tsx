import { useRegister } from '@/hooks/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(1, { message: 'Nome obrigatório' }),
    email: z.string().min(1, { message: 'E-mail inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem',
  });

type FormData = z.infer<typeof schema>;

export default function registerController() {
  const registerMutation = useRegister();
  const loading = registerMutation.isPending;

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
    const { name, email, password } = data;
    await registerMutation.mutateAsync({ name, email, password });
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
