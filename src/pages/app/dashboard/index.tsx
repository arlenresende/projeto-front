import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import type { ApexOptions } from 'apexcharts';
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Loader2,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { Navigate } from 'react-router-dom';
import CountryMap from '../components/countryMap';
import OnBoard from '../on-board';

// --- Skeleton ---
function SkeletonCard() {
  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

// --- Stat Card ---
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-emerald-600 dark:text-emerald-400'
      : trend === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-600 dark:text-gray-400';

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : null;

  return (
    <Card className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className="w-9 h-9 rounded-lg bg-[#465fff]/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-[#465fff]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className={`flex items-center gap-1 mt-1 text-sm ${trendColor}`}>
          {TrendIcon && <TrendIcon className="h-4 w-4" />}
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Order Status Badge ---
function OrderStatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { variant: 'success' | 'warning' | 'destructive' | 'default' | 'secondary'; label: string }
  > = {
    delivered: { variant: 'success', label: 'Entregue' },
    pending: { variant: 'warning', label: 'Pendente' },
    canceled: { variant: 'destructive', label: 'Cancelado' },
    shipped: { variant: 'default', label: 'Enviado' },
  };

  const { variant, label } = config[status.toLowerCase()] ?? {
    variant: 'secondary',
    label: status,
  };

  return <Badge variant={variant}>{label}</Badge>;
}

// --- Main Dashboard ---
export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return <Navigate to="/sign-in" replace />;
  if (!user.profileCompleted) return <OnBoard />;

  const chartOptions: ApexOptions = useMemo(
    () => ({
      colors: ['#465fff'],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 280,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 6,
          borderRadiusApplication: 'end' as const,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 4, colors: ['transparent'] },
      xaxis: {
        categories: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      legend: { show: false },
      yaxis: { title: { text: undefined } },
      grid: {
        yaxis: { lines: { show: true } },
        stroke: { width: 0 },
      },
      fill: { opacity: 1 },
      tooltip: {
        x: { show: false },
        y: { formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}` },
      },
      states: {
        hover: { filter: { type: 'darken' as const, value: 0.8 } },
      },
    }),
    [],
  );

  const chartSeries = useMemo(
    () => [{ name: 'Vendas', data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112] }],
    [],
  );

  const orders = useMemo(
    () => [
      {
        product: 'Macbook Pro 13"',
        category: 'Notebook',
        price: 'R$ 12.499',
        status: 'delivered',
      },
      {
        product: 'Apple Watch Ultra',
        category: 'Relógio',
        price: 'R$ 7.899',
        status: 'pending',
      },
      {
        product: 'iPhone 15 Pro Max',
        category: 'Smartphone',
        price: 'R$ 9.999',
        status: 'delivered',
      },
      {
        product: 'iPad Pro 3ª Gen',
        category: 'Tablet',
        price: 'R$ 8.499',
        status: 'canceled',
      },
      {
        product: 'AirPods Pro 2ª Gen',
        category: 'Acessório',
        price: 'R$ 1.899',
        status: 'shipped',
      },
    ],
    [],
  );

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="h-72 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Resumo de performance da sua operação
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Clientes"
          value="3.782"
          change="+11,01% vs mês anterior"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Pedidos"
          value="5.359"
          change="+9,05% vs mês anterior"
          trend="up"
          icon={ShoppingCart}
        />
        <StatCard
          title="Receita"
          value="R$ 32.870"
          change="-2,15% vs mês anterior"
          trend="down"
          icon={DollarSign}
        />
        <StatCard
          title="Produtos Vendidos"
          value="1.348"
          change="+3,18% vs mês anterior"
          trend="up"
          icon={Package}
        />
      </div>

      {/* Sales Chart */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Vendas Mensais</CardTitle>
          <CardDescription>Performance de vendas no último ano</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart options={chartOptions} series={chartSeries} type="bar" height={280} />
        </CardContent>
      </Card>

      {/* Targets & Demographics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Target */}
        <Card className="lg:col-span-2 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Meta Mensal</CardTitle>
            <CardDescription>Progresso da sua meta para este mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-[#465fff]/20 bg-[#465fff]/5 dark:bg-[#465fff]/10 px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <TrendingUp className="h-5 w-5 text-[#465fff]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#465fff]">+10% acima da meta</p>
                  <p className="text-sm text-[#465fff]/80 mt-0.5">
                    Você faturou R$ 3.287 hoje. Continue com o ótimo trabalho!
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-gray-500 dark:text-gray-400">Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">R$ 20K</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-gray-500 dark:text-gray-400">
                    Receita
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">R$ 22K</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs text-gray-500 dark:text-gray-400">Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">R$ 3.2K</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Demografia</CardTitle>
            <CardDescription>Clientes por país</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[160px] rounded-lg overflow-hidden">
              <CountryMap />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Brasil</span>
                  <span className="text-gray-500 dark:text-gray-400">2.379 clientes</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 rounded-full bg-[#465fff]" style={{ width: '79%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">EUA</span>
                  <span className="text-gray-500 dark:text-gray-400">589 clientes</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: '23%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Pedidos Recentes</CardTitle>
          <CardDescription>Últimas transações realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-3 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-3">
            <span>Produto</span>
            <span>Categoria</span>
            <span>Preço</span>
            <span>Status</span>
          </div>

          {/* Table Rows */}
          <div className="mt-3 space-y-3">
            {orders.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {order.product}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                      {order.category} · {order.price}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                  {order.category}
                </span>
                <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
                  {order.price}
                </span>
                <div className="sm:hidden">
                  <OrderStatusBadge status={order.status} />
                </div>
                <span className="hidden sm:block">
                  <OrderStatusBadge status={order.status} />
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
