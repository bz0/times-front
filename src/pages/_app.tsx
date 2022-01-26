import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
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
  uri: 'https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/graphql',
  cache: cache
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp