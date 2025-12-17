import {
  BarChart3,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function Sidebar() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Análises' },
    { icon: Users, label: 'Usuários' },
    { icon: Package, label: 'Produtos' },
    { icon: ShoppingCart, label: 'Pedidos' },
    { icon: FileText, label: 'Relatórios' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside
      className={`${
        sidebarExpanded ? 'w-64' : 'w-20'
      } text-white bg-primary transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-secondary">
        {sidebarExpanded && (
          <span className="font-bold text-xl text-sidebar-foreground">Dashboard</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="text-secondary hover:bg-sidebar-accent"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-300 ${!sidebarExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
              item.active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {sidebarExpanded && <span className="font-medium text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {sidebarExpanded && (
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary font-semibold">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-secondary">Usuário</p>
              <p className="text-xs text-secondary">user@email.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
