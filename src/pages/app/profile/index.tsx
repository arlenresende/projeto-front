import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '../components/page-header';
import Form from './form';

export default function DashboardProfile() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <PageHeader title="Meu Perfil" description="Atualize seus dados de conta." />
          <Card className="border-0 bg-trasparent">
            <CardHeader>
              <CardTitle className="text-foreground">Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <Form />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
