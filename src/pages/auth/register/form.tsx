import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import registerController from './form-controller';

export default function RegisterForm() {
  const { handleSubmit, register, errors, loading } = registerController();

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Digite seu nome"
              label="Nome"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Digite seu e-mail"
              label="E-mail"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Crie sua senha"
              label="Senha"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Confirme sua senha"
              label="Confirmar senha"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </>
  );
}
