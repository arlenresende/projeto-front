import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import signInController from './form-controller';

export default function SignInForm() {
  const { form, isPending, onSubmit } = signInController();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    setApiError(null);
    try {
      await onSubmit(data);
    } catch {
      setApiError('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth (Firebase Auth or NextAuth)
    console.log('Google sign-in clicked');
  };

  return (
    <div className="animate-fade-in w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Entrar na sua conta
        </h1>
        <p className="text-sm text-gray-500">Informe seu e-mail e senha para acessar o dashboard</p>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isPending}
          className="w-full font-medium"
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="w-full font-medium opacity-60 cursor-not-allowed"
        >
          <XIcon className="mr-2 h-4 w-4" />X (Twitter)
        </Button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#f4f3f3] px-4 text-gray-500">ou continue com e-mail</span>
        </div>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800/50 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              ref={emailInputRef}
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
                placeholder="Digite sua senha"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <Checkbox
                checked={keepLoggedIn}
                onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              Manter conectado
            </Label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Entrar
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>

      {/* Back to Dashboard Link */}
      <div className="mt-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
        >
          Voltar para o dashboard
        </Link>
      </div>
    </div>
  );
}

// Inline SVG Icons
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
