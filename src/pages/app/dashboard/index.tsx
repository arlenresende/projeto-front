import { AnalyticsChart } from '../components/analyticsChart';
import PageHeader from '../components/page-header';
import StatsCard from '../components/statsCard';

export default function Dashboard() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Bem-vindo de volta"
            description="Aqui está o que está acontecendo com seu negócio hoje."
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatsCard />
              <StatsCard />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatsCard />
              <StatsCard />
            </div>
            <div>
              <AnalyticsChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
