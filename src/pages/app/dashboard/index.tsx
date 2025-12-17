import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import PageHeader from '../components/page-header';
import RevenueCard from '../components/revenue-card';

export default function Dashboard() {
  const stats = [
    {
      title: 'Receita Total',
      value: 'R$ 45.231,89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Vendas',
      value: '+2350',
      change: '+180.1%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Usuários Ativos',
      value: '+12.234',
      change: '+19%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Taxa de Conversão',
      value: '+573',
      change: '+201',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    { user: 'João Silva', action: 'Fez uma compra', value: 'R$ 250,00', time: 'há 2 minutos' },
    { user: 'Maria Santos', action: 'Criou uma conta', value: '-', time: 'há 5 minutos' },
    { user: 'Pedro Oliveira', action: 'Fez uma compra', value: 'R$ 450,00', time: 'há 15 minutos' },
    { user: 'Ana Costa', action: 'Atualizou perfil', value: '-', time: 'há 30 minutos' },
    { user: 'Carlos Lima', action: 'Fez uma compra', value: 'R$ 150,00', time: 'há 1 hora' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Bem-vindo de volta"
            description="Aqui está o que está acontecendo com seu negócio hoje."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <RevenueCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={<stat.icon className="h-4 w-4 text-muted-foreground" />}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Visão Geral</CardTitle>
                <CardDescription>Resumo de vendas dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-20 w-20 mx-auto mb-4 opacity-20" />
                  <p>Gráfico de vendas apareceria aqui</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Atividade Recente</CardTitle>
                <CardDescription>Últimas ações dos usuários</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold text-sm flex-shrink-0">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action}
                          {activity.value !== '-' && (
                            <span className="text-foreground font-medium ml-1">
                              {activity.value}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
