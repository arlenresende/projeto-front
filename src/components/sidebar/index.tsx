import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  User,
} from 'lucide-react';
import { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSidebar } from './context';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: BarChart3, label: 'Análises', to: '/dashboard/analises' },
  { icon: Package, label: 'Produtos', to: '/dashboard/produtos' },
  { icon: ShoppingCart, label: 'Pedidos', to: '/dashboard/pedidos' },
  { icon: FileText, label: 'Relatórios', to: '/dashboard/relatorios' },
  { icon: Settings, label: 'Configurações', to: '/dashboard/configuracoes' },
  { icon: User, label: 'Perfil', to: '/dashboard/profile' },
];

export default function Sidebar() {
  const { isExpanded, toggle, isMobileOpen, setMobileOpen } = useSidebar();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in', { replace: true });
  };

  const handleNavigate = (to: string) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-[#465fff] to-[#3a50e6] transition-all duration-300 ease-in-out flex flex-col shadow-lg',
          'lg:translate-x-0 lg:static lg:z-auto',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isExpanded ? 'w-64' : 'w-[72px]',
        )}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          {isExpanded && (
            <button
              onClick={() => handleNavigate('/dashboard')}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Cataloguei</span>
            </button>
          )}
          <button
            onClick={toggle}
            className="ml-auto p-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label={isExpanded ? 'Recolher menu' : 'Expandir menu'}
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {isExpanded && (
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              Menu
            </p>
          )}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Fragment key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-white/70 hover:bg-white/10 hover:text-white',
                      !isExpanded && 'justify-center px-2',
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {isExpanded && <span>{item.label}</span>}
                </NavLink>
              </Fragment>
            ))}
          </div>
        </nav>

        {/* User Footer */}
        <div className="shrink-0 border-t border-white/10 p-3">
          {isExpanded ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-1">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name ?? 'Usuário'}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {user?.email ?? 'user@email.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm font-semibold text-white">
                  {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-white transition-colors"
                aria-label="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
