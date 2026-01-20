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
      } text-white bg-accent transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 ">
        {sidebarExpanded && <span className="font-bold text-xl text-white">Menu</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="text-white hover:bg-sidebar-accent"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300 ${!sidebarExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => {
          if (item.to === '/logout') {
            return (
              <button
                key={index}
                onClick={() => {
                  signOut();
                  navigate('/sign-in', { replace: true });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:border-l-4 hover:border-sidebar-primary text-left"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarExpanded && <span className="font-medium text-sm">Sair</span>}
              </button>
            );
          }
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:border-l-4 hover:border-sidebar-primary'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarExpanded && <span className="font-medium text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {sidebarExpanded && (
        <>
          <div className=" pb-4 p-4">
            {' '}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center  font-semibold">
                U
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium ">Usuário</p>
                <p className="text-xs ">user@email.com</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
