import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

function LogIn() {
  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">
          Log In
        </h1>
        <form className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto">
          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>

          <Button>Submit</Button>
        </form>
      </Container>
    </Layout>
  )
}

export default LogIn;