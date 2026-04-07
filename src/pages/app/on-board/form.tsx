import { Input } from '@/components/input';
import { Textarea } from '@/components/textArea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import FormAction from './form-controller';

interface FormProps {
  activeConfetti: (bool: boolean) => void;
}

export default function Form({ activeConfetti }: FormProps) {
  const { handleSubmit, register, errors, isSubmitting } = FormAction(activeConfetti);
  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-4 flex-col">
      <Input label="Name" {...register('name')} error={errors.name?.message} />
      <div>
        <Input label="Url" {...register('url')} error={errors.url?.message} isSlug />
      </div>
      <Input label="WhatsApp" {...register('whatsApp')} error={errors.whatsApp?.message} />

      <Textarea
        label="Descrição"
        {...register('description')}
        error={errors.description?.message}
      />

      <Button
        variant={'default'}
        className="bg-[#DD6E42] hover:bg-[#DD6E42]/90 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Criar minha loja'}
      </Button>
    </form>
  );
}
