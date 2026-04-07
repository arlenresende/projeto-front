import { Helmet } from 'react-helmet-async';
import RegisterForm from './form';

export default function Register() {
  return (
    <>
      <Helmet title="Criar conta | Cataloguei" />
      <RegisterForm />
    </>
  );
}
