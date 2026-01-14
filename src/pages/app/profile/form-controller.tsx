import { updateProfileRequest, type UpdateProfilePayload } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const cepRegex = /^\d{5}-?\d{3}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Rua obrigatória' }),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().min(2, { message: 'Estado deve ter ao menos 2 caracteres' }),
  zip_code: z
    .string()
    .regex(cepRegex, { message: 'CEP deve estar no formato 00000-000 ou 00000000' }),
  country: z.string().optional(),
  complement: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().optional(),
  avatar: z.string().url({ message: 'URL inválida' }).nullable().optional(),
  document: z
    .string()
    .transform((s) => s.replace(/\D/g, ''))
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val), {
      message: 'Documento deve ter 11 dígitos',
    }),
  cellPhone: z
    .string()
    .transform((s) => s.replace(/\D/g, ''))
    .optional()
    .refine((val) => !val || /^\d{10,11}$/.test(val), {
      message: 'Celular deve ter 10 ou 11 dígitos',
    }),
  birthDate: z
    .string()
    .optional()
    .refine((val) => !val || dateRegex.test(val), {
      message: 'Data deve estar no formato YYYY-MM-DD',
    }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], {
    message: 'Opção inválida: esperado uma de "MALE"|"FEMALE"|"OTHER"|"PREFER_NOT_TO_SAY"',
  }),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  address: addressSchema.optional(),
});

type FormData = z.infer<typeof schema>;

export default function dashboardProfileController() {
  const { user, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const defaultValues = useMemo<FormData>(() => {
    return {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      avatar: user?.avatar ?? null,
      document: user?.document ?? undefined,
      cellPhone: user?.cellPhone ?? undefined,
      birthDate: user?.birthDate ?? undefined,
      gender: (user?.gender as FormData['gender']) ?? undefined,
      role: user?.role ?? undefined,
      isActive: user?.isActive ?? true,
      emailVerified: user?.emailVerified ?? false,
      phoneVerified: user?.phoneVerified ?? false,
      address: user?.address
        ? {
            street: user.address.street ?? '',
            number: user.address.number ?? '',
            neighborhood: user.address.neighborhood ?? '',
            city: user.address.city ?? '',
            state: user.address.state ?? '',
            zip_code: user.address.zip_code ?? '',
            country: user.address.country ?? '',
            complement: user.address.complement ?? '',
          }
        : {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            complement: '',
          },
    };
  }, [user]);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);
    try {
      const sanitizedDocument = data.document ? data.document.replace(/\D/g, '') : undefined;
      const sanitizedCell = data.cellPhone ? data.cellPhone.replace(/\D/g, '') : undefined;
      const addressInput = data.address;
      const trimmedStreet = addressInput?.street?.trim() ?? '';
      const trimmedState = addressInput?.state?.trim().toUpperCase() ?? '';
      const trimmedZip = addressInput?.zip_code?.replace(/\s/g, '') ?? '';

      const addressAllBlank =
        !trimmedStreet &&
        !(addressInput?.number?.trim() ?? '') &&
        !(addressInput?.neighborhood?.trim() ?? '') &&
        !(addressInput?.city?.trim() ?? '') &&
        !trimmedState &&
        !trimmedZip &&
        !(addressInput?.country?.trim() ?? '') &&
        !(addressInput?.complement?.trim() ?? '');

      const payload: UpdateProfilePayload = {
        name: data.name,
        email: data.email,
        password: data.password || undefined,
        avatar: data.avatar ?? null,
        document: sanitizedDocument,
        cellPhone: sanitizedCell,
        birthDate: data.birthDate,
        gender: data.gender,
        role: data.role,
        isActive: data.isActive,
        emailVerified: data.emailVerified,
        phoneVerified: data.phoneVerified,
        address: addressAllBlank
          ? null
          : {
              street: trimmedStreet,
              number: addressInput?.number,
              neighborhood: addressInput?.neighborhood,
              city: addressInput?.city,
              state: trimmedState,
              zip_code: trimmedZip,
              country: addressInput?.country,
              complement: addressInput?.complement,
            },
      };

      if (!user?.id) {
        throw new Error('Usuário não identificado');
      }
      const res = await updateProfileRequest(user.id, payload);
      setProfile(res.data);
      toast.success('Perfil atualizado com sucesso', { className: '!bg-green-400 !text-white' });
    } catch (error) {
      const apiMessage =
        (error as AxiosError<{ message?: string }>).response?.data?.message ??
        'Erro ao atualizar perfil';
      toast.error(apiMessage, { className: '!bg-red-400 !text-white' });
    } finally {
      setLoading(false);
    }
  });

  return {
    handleSubmit,
    register,
    setValue,
    errors,
    loading,
  };
}
