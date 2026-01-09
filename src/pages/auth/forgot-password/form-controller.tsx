import { forgotPasswordRequest } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
    try {
      const res = await forgotPasswordRequest({ email: data.email });
      const message = res?.data?.message ?? 'Solicitação enviada';
      toast.success(message, { className: '!bg-green-400 !text-white' });
    } catch (error) {
      const apiMessage =
        (error as AxiosError<{ message?: string }>).response?.data?.message ??
        'Erro ao enviar solicitação';
      toast.error(apiMessage, { className: '!bg-red-400 !text-white' });
    } finally {
      setLoading(false);
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    loading,
  };
}
