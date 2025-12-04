import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/3 bg-primary text-primary-foreground flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-semibold">Logo</span>
        </div>

        <div className="space-y-4">
          <blockquote className="text-lg font-medium text-balance">
            "Esta plataforma transformou completamente a forma como gerenciamos nosso negócio."
          </blockquote>
          <div className="text-sm text-primary-foreground/80">
            <p className="font-medium">Maria Silva</p>
            <p>CEO, Empresa XYZ</p>
          </div>
        </div>

        <div className="text-sm text-primary-foreground/60">
          © 2025 Todos os direitos reservados
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
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
