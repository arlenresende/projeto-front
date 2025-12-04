import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import forgotPasswordController from './form-controller';

export default function ForgotPasswordForm() {
  const { handleSubmit, register, errors, loading } = forgotPasswordController();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Digite seu e-mail"
            label="E-mail"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar link de recuperação'}
      </Button>
    </form>
  );
}
