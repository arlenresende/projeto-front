import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

export function SalesChart() {
  const chartOptions: ApexOptions = useMemo(
    () => ({
      colors: ['#465fff'],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 320,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout' as const,
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 8,
          borderRadiusApplication: 'end' as const,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 6, colors: ['transparent'] },
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
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '12px',
          },
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
        },
      },
      legend: { show: false },
      grid: {
        yaxis: { lines: { show: true } },
        stroke: { width: 0 },
        padding: { left: 0, right: 0 },
      },
      fill: {
        opacity: 1,
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.1,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: 'dark',
        x: { show: false },
        y: {
          formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
          title: {
            formatter: () => 'Vendas',
          },
        },
        marker: {
          show: false,
        },
      },
      states: {
        hover: { filter: { type: 'darken' as const, value: 0.85 } },
      },
    }),
    [],
  );

  const chartSeries = useMemo(
    () => [{ name: 'Vendas', data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112] }],
    [],
  );

  return (
    <Card className="border border-gray-200 rounded-2xl transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-gray-900 text-base font-semibold tracking-tight">
              Vendas Mensais
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Performance de vendas no último ano
            </CardDescription>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-gray-200">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-xs font-medium text-gray-600">+24% este mês</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={300} />
      </CardContent>
    </Card>
  );
}
