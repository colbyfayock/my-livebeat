import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6">
        <p className="text-center text-slate-500">
          Built with <a className="underline font-medium text-inherit" href="https://appwrite.io/">Appwrite</a> &amp; <a className="underline font-medium text-inherit" href="https://react.dev/">React</a> by <a className="underline font-medium text-inherit" href="https://twitter.com/colbyfayock">Colby Fayock</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;