import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, { message: 'Email obrigatório' }),
  password: z.string().min(1, { message: 'Senha obrigatória' }),
});

type FormData = z.infer<typeof schema>;

export default function signInController() {
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
    console.log(data);
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
