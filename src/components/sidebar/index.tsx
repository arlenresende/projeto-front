import { useAuth } from '@/context/AuthContext';
import {
  BarChart3,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Sidebar() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: BarChart3, label: 'Análises', to: '/dashboard/analises' },
    { icon: Package, label: 'Produtos', to: '/dashboard/produtos' },
    { icon: ShoppingCart, label: 'Pedidos', to: '/dashboard/pedidos' },
    { icon: FileText, label: 'Relatórios', to: '/dashboard/relatorios' },
    { icon: Settings, label: 'Configurações', to: '/dashboard/configuracoes' },
    { icon: User, label: 'Profile', to: '/dashboard/profile' },
    { icon: ChevronLeft, label: 'Sair', to: '/logout' },
  ];

  return (
    <aside
      className={`${
        sidebarExpanded ? 'w-64' : 'w-20'
      } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r border-sidebar-border`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {sidebarExpanded && (
          <span className="font-bold text-xl text-sidebar-primary-foreground">Cataloguei</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300 ${!sidebarExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <div className="px-4 mb-2 text-xs tracking-wide uppercase text-muted-foreground">Menu</div>
        {menuItems.map((item, index) =>
          item.to === '/logout' ? (
            <button
              key={index}
              onClick={() => {
                signOut();
                navigate('/sign-in', { replace: true });
              }}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sidebar-accent/10 hover:text-sidebar-foreground text-left rounded-md"
            >
              <item.icon className="h-5 w-5 shrink-0 text-sidebar-primary" />
              {sidebarExpanded && <span className="font-medium text-sm">Sair</span>}
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 transition-colors rounded-md ${
                  isActive
                    ? 'bg-sidebar-accent/20 text-sidebar-foreground'
                    : 'hover:bg-sidebar-accent/10 hover:text-sidebar-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0 text-sidebar-primary" />
              {sidebarExpanded && <span className="font-medium text-sm">{item.label}</span>}
            </NavLink>
          ),
        )}
      </nav>

      {sidebarExpanded && (
        <>
          <div className="p-4 border-t border-sidebar-border">
            <div className="px-0 mb-2 text-xs tracking-wide uppercase text-muted-foreground">
              Account
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center font-semibold">
                U
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Usuário</p>
                <p className="text-xs text-muted-foreground">user@email.com</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
