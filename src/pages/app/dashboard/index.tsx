import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import type { ApexOptions } from 'apexcharts';
import { BadgeCheck, TrendingDown, TrendingUp } from 'lucide-react';
import Chart from 'react-apexcharts';
import { Navigate } from 'react-router-dom';
import CountryMap from '../../../../tema/src/components/ecommerce/CountryMap';
import PageHeader from '../components/page-header';
import OnBoard from '../on-board';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/sign-in" replace />;

  if (!user.profileCompleted) return <OnBoard />;

  const monthlySalesOptions: ApexOptions = {
    colors: ['#465fff'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  };

  const monthlySalesSeries = [
    { name: 'Sales', data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112] },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-xs text-muted-foreground">Dashboard / eCommerce</div>
          <PageHeader title="eCommerce" description="Resumo de performance da sua operação" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">3,782</p>
                  <span className="flex items-center gap-1 text-chart-1 text-sm">
                    <TrendingUp className="h-4 w-4" /> 11.01%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">5,359</p>
                  <span className="flex items-center gap-1 text-chart-1 text-sm">
                    <TrendingUp className="h-4 w-4" /> 9.05%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">$32,870</p>
                  <span className="flex items-center gap-1 text-destructive text-sm">
                    <TrendingDown className="h-4 w-4" /> 2.15%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Product Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-foreground">1,348</p>
                  <span className="flex items-center gap-1 text-chart-1 text-sm">
                    <TrendingUp className="h-4 w-4" /> 3.18%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-2">
            <CardHeader className="pb-2">
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>Vendas por mês no ano</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart
                options={monthlySalesOptions}
                series={monthlySalesSeries}
                type="bar"
                height={180}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Monthly Target</CardTitle>
                <CardDescription>Target you’ve set for each month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                  <span className="text-sm font-medium text-chart-1 flex items-center gap-2">
                    +10% <BadgeCheck className="h-4 w-4 text-chart-1" />
                  </span>
                  <p className="text-sm text-muted-foreground">
                    You earn $3287 today, it's higher than last month. Keep up your good work!
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-foreground">$20K</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-foreground">$20K</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-foreground">$20K</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Target you’ve set for each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">January</div>
                <div className="mt-2 grid grid-cols-7 gap-1 text-xs text-muted-foreground">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md border border-border bg-card text-center text-xs text-muted-foreground flex items-center justify-center"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customers Demographic</CardTitle>
                <CardDescription>Number of customer based on country</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-card px-4 py-3">
                  <div className="w-full overflow-hidden">
                    <div className="h-[220px]">
                      <CountryMap />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">USA</span>
                    <span className="text-xs text-muted-foreground">2,379 Customers</span>
                  </div>
                  <div className="h-2 rounded-md bg-muted">
                    <div className="h-2 rounded-md bg-chart-1" style={{ width: '79%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">79%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">France</span>
                    <span className="text-xs text-muted-foreground">589 Customers</span>
                  </div>
                  <div className="h-2 rounded-md bg-muted">
                    <div className="h-2 rounded-md bg-chart-2" style={{ width: '23%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">23%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                  <span>Products</span>
                  <span>Category</span>
                  <span>Price</span>
                  <span>Status</span>
                </div>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-md bg-muted" />
                      <div>
                        <div className="font-medium text-foreground">Macbook pro 13”</div>
                        <div className="text-xs text-muted-foreground">2 Variants</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">Laptop</span>
                    <span className="text-foreground">$2399.00</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-chart-1/10 text-chart-1">
                      Delivered
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-md bg-muted" />
                      <div>
                        <div className="font-medium text-foreground">Apple Watch Ultra</div>
                        <div className="text-xs text-muted-foreground">1 Variant</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">Watch</span>

                    <span className="text-foreground">$879.00</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-foreground/80">
                      Pending
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-md bg-muted" />
                      <div>
                        <div className="font-medium text-foreground">iPhone 15 Pro Max</div>
                        <div className="text-xs text-muted-foreground">2 Variants</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">SmartPhone</span>
                    <span className="text-foreground">$1869.00</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-chart-1/10 text-chart-1">
                      Delivered
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-md bg-muted" />
                      <div>
                        <div className="font-medium text-foreground">iPad Pro 3rd Gen</div>
                        <div className="text-xs text-muted-foreground">2 Variants</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">Electronics</span>
                    <span className="text-foreground">$1699.00</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-destructive/10 text-destructive">
                      Canceled
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-md bg-muted" />
                      <div>
                        <div className="font-medium text-foreground">Airpods Pro 2nd Gen</div>
                        <div className="text-xs text-muted-foreground">1 Variant</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground">Accessories</span>
                    <span className="text-foreground">$240.00</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-chart-1/10 text-chart-1">
                      Delivered
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
