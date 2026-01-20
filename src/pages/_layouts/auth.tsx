import { Outlet } from 'react-router';
import Logo from '../app/components/Logo';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/3 bg-accent text-white flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <Logo url="/" />
        </div>

        <div className="space-y-4">
          <blockquote className="text-lg font-medium text-balance">
            "Esta plataforma transformou completamente a forma como gerenciamos nosso negócio."
          </blockquote>
          <div className="text-sm">
            <p className="font-medium">Maria Silva</p>
            <p>CEO, Empresa XYZ</p>
          </div>
        </div>

        <div className="text-sm">© 2025 Todos os direitos reservados</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#f4f3f3]">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-balance">Bem-vindo de volta</h1>
            <p className="text-muted-foreground text-balance">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
