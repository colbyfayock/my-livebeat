import { useState } from 'react';
import { AppwriteException } from 'appwrite';
import { Redirect, useLocation } from 'wouter'

import { useAuth } from '@/hooks/use-auth';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

function LogIn() {
  const [, navigate] = useLocation();
  const { session, logIn } = useAuth();
  const [sent, setSent] = useState(false);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    }

    try {
      await logIn(target.email.value);
      setSent(true);
    } catch(error: unknown) {
      if ( error instanceof AppwriteException ) {
        navigate(`${window.location.pathname}?error=${error.type}`)
      } else {
        navigate(`${window.location.pathname}?error=unknown_error`)
      }
    }
  }

  if ( session ) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">
          Log In
        </h1>
        {!sent && (
          <form className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
            <FormRow className="mb-5">
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputText id="email" name="email" type="email" />
            </FormRow>

            <Button>Submit</Button>
          </form>
        )}
        {sent && (
          <p className="text-center">Check your email for a magic link!</p>
        )}
      </Container>
    </Layout>
  )
}

export default LogIn;