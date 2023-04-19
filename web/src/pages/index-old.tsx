import {
  useListAllProductsQuery,
  useMeQuery,
} from '@/graphql/generated/graphql';
import {
  getServerPageListAllProducts,
  ssrListAllProducts,
} from '@/graphql/generated/page';
import { withApollo } from '@/lib/withApollo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

function Home({ data: any }) {
  // const { loading, error } = useListAllProductsQuery();
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <>
      <h1>hello world</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      <Link href={'api/auth/logout'}>Logout</Link>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return await getServerPageListAllProducts({}, ctx);

    return {
      props: {},
    };
  },
});

// Same as Redux - compose
// HOC - Higher Order Component
export default withApollo(ssrListAllProducts.withPage()(Home));
