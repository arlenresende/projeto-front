import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Button } from '@/components/ui/button';
import FormAction from './form-controller';

export default function Form() {
  const { handleSubmit, register, errors, setValue, loading } = FormAction();
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nome" {...register('name')} error={errors.name?.message} />
        <Input label="E-mail" {...register('email')} error={errors.email?.message} />
        <Input
          label="Avatar URL"
          {...register('avatar')}
          error={errors.avatar?.message as string | undefined}
        />
        <Input
          label="Documento"
          {...register('document')}
          error={errors.document?.message as string | undefined}
        />
        <Input
          label="Celular"
          {...register('cellPhone', {
            onChange: (e) => {
              const raw = e.target.value ?? '';
              const digits = raw.replace(/\D/g, '').slice(0, 11);
              if (digits.length <= 2) {
                setValue('cellPhone', `(${digits}`);
                return;
              }
              const area = digits.slice(0, 2);
              const rest = digits.slice(2);
              const isMobile = digits.length > 10;
              const prefixLen = isMobile ? Math.min(5, rest.length) : Math.min(4, rest.length);
              const prefix = rest.slice(0, prefixLen);
              const suffix = rest.slice(prefixLen);
              const formatted = `(${area}) ${prefix}${suffix ? '-' + suffix : ''}`;
              setValue('cellPhone', formatted);
            },
          })}
          error={errors.cellPhone?.message as string | undefined}
        />
        <Input
          label="Data de Nascimento"
          type="date"
          {...register('birthDate')}
          error={errors.birthDate?.message as string | undefined}
        />
        <Select
          label="Gênero"
          {...register('gender')}
          name="gender"
          error={errors.gender?.message as string | undefined}
        >
          <option value="">Selecione</option>
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Feminino</option>
          <option value="OTHER">Outro</option>
          <option value="PREFER_NOT_TO_SAY">Prefiro não informar</option>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  );
}
