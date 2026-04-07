import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import registerController from './form-controller';

export default function RegisterForm() {
  const { form, isPending, onSubmit } = registerController();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setApiError(null);
    try {
      await onSubmit(data);
    } catch {
      setApiError('Não foi possível criar a conta. Tente novamente.');
    }
  };

  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Criar sua conta</h1>
        <p className="text-sm text-gray-500">Preencha os dados abaixo para começar</p>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800/50 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              ref={nameInputRef}
              placeholder="Seu nome completo"
              label="Nome"
              type="text"
              {...register('name')}
              error={errors.name?.message}
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="voce@exemplo.com"
              label="E-mail"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Crie uma senha"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Confirme sua senha"
                label="Confirmar senha"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Criar conta
            </>
          )}
        </Button>
      </form>

      {/* Terms Notice */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Ao criar sua conta, você concorda com nossos{' '}
        <a href="#" className="text-primary hover:underline">
          Termos de Uso
        </a>{' '}
        e{' '}
        <a href="#" className="text-primary hover:underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
}
