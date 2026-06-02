import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { StatCard } from './stat-card';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Clientes"
        value={new Intl.NumberFormat('pt-BR').format(3782)}
        change={11.01}
        icon={<Users className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
      />
      <StatCard
        title="Pedidos"
        value={new Intl.NumberFormat('pt-BR').format(5359)}
        change={9.05}
        icon={<ShoppingCart className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
      />
      <StatCard
        title="Receita"
        value={new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
        }).format(32870)}
        change={-2.15}
        icon={<DollarSign className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
      />
      <StatCard
        title="Produtos Vendidos"
        value={new Intl.NumberFormat('pt-BR').format(1348)}
        change={3.18}
        icon={<Package className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
      />
    </div>
  );
}
