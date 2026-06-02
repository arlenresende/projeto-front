import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardLoading, RecentOrders, SalesChart, StatsGrid } from './components';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return <Navigate to="/sign-in" replace />;

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Resumo de performance da sua operação
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">Última atualização</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Hoje, 14:32</p>
          </div>
          <Button className="bg-[#465fff] hover:bg-[#3451e6] text-white shadow-sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Exportar relatório
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Sales Chart */}
      <SalesChart />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
