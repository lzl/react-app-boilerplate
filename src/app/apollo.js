import { ApolloClient } from 'apollo-client'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GRAPHQL_URI = 'http://localhost:4000/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = new ApolloLink((operation, forward) => {
  const token = 'Bearer jwt-token-from-web-app' // TODO getTokenFromLocalStorage()
  operation.setContext(() => ({
    headers: {
      Authorization: token,
    },
  }))
  return forward(operation)
})

const httpLink = new HttpLink({ uri: GRAPHQL_URI })

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
