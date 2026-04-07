import { Helmet } from 'react-helmet-async';
import SignInForm from './form';

export default function SignIn() {
  return (
    <>
      <Helmet title="Entrar | Cataloguei" />
      <SignInForm />
    </>
  );
}
