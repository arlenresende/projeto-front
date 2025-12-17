import AuthPrompt from '@/components/auth/authPrompt';
import SignInForm from './form.tsx';

export default function SignIn() {
  return (
    <>
      <SignInForm />
      <AuthPrompt message="Não tem uma conta?" linkText="Cadastre-se" linkTo="/register" />
    </>
  );
}
