import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const storeSchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira um nome para sua loja' }),
  url: z.string().min(1, { message: 'Por favor, insira uma url para sua loja' }),
  whatsApp: z.string().min(1, {
    message: 'Por favor, insira o número do WhatsApp da sua loja.',
  }),
  description: z.string().min(1, {
    message: 'Por favor, insira a descrição da sua loja.',
  }),
});
type FormData = z.infer<typeof storeSchema>;

function slugify(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function createStore(data: {
  name: string;
  url: string;
  description: string;
  whatsappUrl: string;
}) {
  console.log(data);
  return { success: true };
}

export default function FormAction(activeConfetti: (bool: boolean) => void) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(storeSchema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const fullUrl = `https://catalogeui.com.br/${slugify(data.url)}`;
    const formatedData = {
      name: data.name.trim(),
      url: fullUrl,
      description: data.description.trim(),
      whatsappUrl: data.whatsApp.trim(),
    };
    const result = await createStore(formatedData);
    if (result.success) {
      reset();
      activeConfetti(true);
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    reset,
    isSubmitting,
  };
}
