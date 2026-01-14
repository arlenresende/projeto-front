import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '../components/page-header';
import dashboardProfileController from './form-controller';

export default function DashboardProfile() {
  const { handleSubmit, register, setValue, errors, loading } = dashboardProfileController();

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <PageHeader title="Meu Perfil" description="Atualize seus dados de conta." />

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Nome" {...register('name')} error={errors.name?.message} />
                  <Input label="E-mail" {...register('email')} error={errors.email?.message} />
                  <Input
                    label="Avatar URL"
                    {...register('avatar')}
                    error={errors.avatar?.message as string | undefined}
                  />
                  <Input
                    label="Documento"
                    {...register('document')}
                    error={errors.document?.message as string | undefined}
                  />
                  <Input
                    label="Celular"
                    {...register('cellPhone', {
                      onChange: (e) => {
                        const raw = e.target.value ?? '';
                        const digits = raw.replace(/\D/g, '').slice(0, 11);
                        if (digits.length <= 2) {
                          setValue('cellPhone', `(${digits}`);
                          return;
                        }
                        const area = digits.slice(0, 2);
                        const rest = digits.slice(2);
                        const isMobile = digits.length > 10;
                        const prefixLen = isMobile
                          ? Math.min(5, rest.length)
                          : Math.min(4, rest.length);
                        const prefix = rest.slice(0, prefixLen);
                        const suffix = rest.slice(prefixLen);
                        const formatted = `(${area}) ${prefix}${suffix ? '-' + suffix : ''}`;
                        setValue('cellPhone', formatted);
                      },
                    })}
                    error={errors.cellPhone?.message as string | undefined}
                  />
                  <Input
                    label="Data de Nascimento"
                    type="date"
                    {...register('birthDate')}
                    error={errors.birthDate?.message as string | undefined}
                  />
                  <Select
                    label="Gênero"
                    {...register('gender')}
                    name="gender"
                    error={errors.gender?.message as string | undefined}
                  >
                    <option value="">Selecione</option>
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Feminino</option>
                    <option value="OTHER">Outro</option>
                    <option value="PREFER_NOT_TO_SAY">Prefiro não informar</option>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="CEP"
                      {...register('address.zip_code', {
                        onChange: (e) => {
                          const raw = e.target.value ?? '';
                          const digits = raw.replace(/\D/g, '').slice(0, 8);
                          const formatted =
                            digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
                          setValue('address.zip_code', formatted, { shouldValidate: true });
                        },
                        onBlur: async (e) => {
                          const raw = e.target.value || '';
                          const cep = raw.replace(/\D/g, '');
                          if (/^\d{8}$/.test(cep)) {
                            const formatted = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
                            setValue('address.zip_code', formatted, { shouldValidate: true });
                            try {
                              const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                              const data = await res.json();
                              if (!data?.erro) {
                                setValue('address.street', data.logradouro || '');
                                setValue('address.neighborhood', data.bairro || '');
                                setValue('address.city', data.localidade || '');
                                setValue('address.state', data.uf || '');
                              }
                            } catch {
                              void 0;
                            }
                          }
                        },
                      })}
                      error={errors.address?.zip_code?.message as string | undefined}
                    />
                    <Input
                      label="Rua"
                      {...register('address.street')}
                      error={errors.address?.street?.message as string | undefined}
                    />
                    <Input
                      label="Número"
                      {...register('address.number')}
                      error={errors.address?.number?.message as string | undefined}
                    />
                    <Input
                      label="Bairro"
                      {...register('address.neighborhood')}
                      error={errors.address?.neighborhood?.message as string | undefined}
                    />
                    <Input
                      label="Cidade"
                      {...register('address.city')}
                      error={errors.address?.city?.message as string | undefined}
                    />
                    <Input
                      label="Estado"
                      {...register('address.state')}
                      error={errors.address?.state?.message as string | undefined}
                    />
                    <Input
                      label="País"
                      {...register('address.country')}
                      error={errors.address?.country?.message as string | undefined}
                    />
                    <Input
                      label="Complemento"
                      {...register('address.complement')}
                      error={errors.address?.complement?.message as string | undefined}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar alterações'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
