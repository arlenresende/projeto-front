interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config: Record<
    string,
    {
      label: string;
      bgClass: string;
      textClass: string;
      dotClass: string;
    }
  > = {
    delivered: {
      label: 'Entregue',
      bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
      textClass: 'text-emerald-700 dark:text-emerald-400',
      dotClass: 'bg-emerald-500',
    },
    pending: {
      label: 'Pendente',
      bgClass: 'bg-amber-50 dark:bg-amber-900/20',
      textClass: 'text-amber-700 dark:text-amber-400',
      dotClass: 'bg-amber-500',
    },
    canceled: {
      label: 'Cancelado',
      bgClass: 'bg-red-50 dark:bg-red-900/20',
      textClass: 'text-red-700 dark:text-red-400',
      dotClass: 'bg-red-500',
    },
    shipped: {
      label: 'Enviado',
      bgClass: 'bg-blue-50 dark:bg-blue-900/20',
      textClass: 'text-blue-700 dark:text-blue-400',
      dotClass: 'bg-blue-500',
    },
  };

  const { bgClass, textClass, dotClass, label } = config[status.toLowerCase()] ?? {
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    textClass: 'text-gray-700 dark:text-gray-300',
    dotClass: 'bg-gray-500',
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${bgClass} ${textClass}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${dotClass} ${status === 'pending' ? 'animate-pulse' : ''}`}
      />
      {label}
    </span>
  );
}
