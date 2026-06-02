import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="relative p-6 rounded-2xl border border-border/60 bg-background transition-all duration-300 hover:border-border hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          {/* Title */}
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>

          {/* Value */}
          <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>

          {/* Change */}
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            )}

            <span className="text-sm font-medium text-foreground">
              {isPositive ? '+' : ''}
              {change.toFixed(2)}%
            </span>

            <span className="text-sm text-muted-foreground">vs mês anterior</span>
          </div>
        </div>

        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
          {icon}
        </div>
      </div>

      {/* subtle bottom line */}
      <div className="absolute inset-x-6 bottom-0 h-px bg-border/60 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </Card>
  );
}
