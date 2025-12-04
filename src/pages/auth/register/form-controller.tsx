import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    console.log('Register data', data);
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
