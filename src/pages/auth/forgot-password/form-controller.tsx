import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
});

type FormData = z.infer<typeof schema>;

export default function forgotPasswordController() {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);
    console.log('Forgot password data', data);
  });

  return {
    handleSubmit,
    register,
    errors,
    loading,
  };
}
