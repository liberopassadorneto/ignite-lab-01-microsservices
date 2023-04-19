import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { GetServerSidePropsContext, NextPage } from 'next';

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject // ssrCache
) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/api',
    fetch,
  });

  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
}

// HIF - High Order Function: A function that receives a function as an argument
// HOC - High Order Component: A component that receives a component as an argument
// Any page that uses this HOC will have access to the Apollo client
export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
