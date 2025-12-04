import AuthPrompt from '@/components/auth/authPrompt.tsx';
import RegisterForm from './form.tsx';

export default function Register() {
  return (
    <>
      <RegisterForm />
      <AuthPrompt message="Já tem uma conta?" linkText="Entrar" linkTo="/sign-in" />
    </>
  );
}
