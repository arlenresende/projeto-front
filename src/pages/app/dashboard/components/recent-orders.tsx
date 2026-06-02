import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { useMemo } from 'react';
import { OrderStatusBadge } from './order-status-badge';

interface Order {
  product: string;
  category: string;
  price: string;
  status: string;
}

export function RecentOrders() {
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

  return (
    <Card className="border border-gray-200 rounded-2xl transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-gray-900 text-base font-semibold tracking-tight">
              Pedidos Recentes
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Últimas transações realizadas
            </CardDescription>
          </div>

          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-1.5"
          >
            Ver todos
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-3 text-xs font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-200 pb-3">
          <span>Produto</span>
          <span>Categoria</span>
          <span>Preço</span>
          <span>Status</span>
        </div>

        {/* Table Rows */}
        <div className="mt-2">
          {orders.map((order, index) => (
            <div
              key={index}
              className="group grid grid-cols-1 sm:grid-cols-5 gap-3 items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors duration-200"
            >
              {/* Produto */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 transition-colors duration-200">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{order.product}</p>
                  <p className="text-xs text-gray-500 sm:hidden">
                    {order.category} · {order.price}
                  </p>
                </div>
              </div>

              {/* Categoria */}
              <span className="hidden sm:block">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                  {order.category}
                </span>
              </span>

              {/* Preço */}
              <span className="hidden sm:block text-sm font-semibold text-gray-900">
                {order.price}
              </span>

              {/* Status mobile */}
              <div className="sm:hidden">
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Status desktop */}
              <span className="hidden sm:block">
                <OrderStatusBadge status={order.status} />
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
