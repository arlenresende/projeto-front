import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

type RevenueCardProps = {
  title: string;
  value: string;
  change: string;
  icon?: React.ReactNode;
};
export default function RevenueCard({ title, value, change, icon }: RevenueCardProps) {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {change.includes('+') ? (
            <TrendingUp className="h-3 w-3 text-chart-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive" />
          )}
          <span className={change.includes('+') ? 'text-chart-1' : 'text-destructive'}>
            {change}
          </span>{' '}
          desde o último mês
        </p>
      </CardContent>
    </Card>
  );
}
