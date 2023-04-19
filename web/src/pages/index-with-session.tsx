import { getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  } else {
    console.log(session);
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }
};
