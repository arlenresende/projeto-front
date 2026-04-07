import { ShoppingBag } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-primary to-primary/80 text-white flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <ShoppingBag size={32} />
            <span className="text-2xl font-bold">Cataloguei</span>
          </a>
        </div>

        {/* Testimonial */}
        <div className="space-y-4 max-w-md">
          <blockquote className="text-lg font-medium text-balance leading-relaxed">
            "Esta plataforma transformou completamente a forma como gerenciamos nosso negócio.
            Aumentamos nossas vendas em 300% no primeiro mês."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              MS
            </div>
            <div>
              <p className="font-semibold">Maria Silva</p>
              <p className="text-sm text-white/80">CEO, Empresa XYZ</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-white/70">
          © 2025 Cataloguei. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
