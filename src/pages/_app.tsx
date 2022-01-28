import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { parseCookies } from 'nookies'
import { Layout } from '../components/Layout'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/graphql',
    headers: {
      authorization: 'Bearer ' + parseCookies()['api_token'],
    },
  }),
  cache: cache
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp