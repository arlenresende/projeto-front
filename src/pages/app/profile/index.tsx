import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '../components/page-header';
import Form from './form';

export default function DashboardProfile() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <PageHeader title="Meu Perfil" description="Atualize seus dados de conta." />
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </div>
  );
}
