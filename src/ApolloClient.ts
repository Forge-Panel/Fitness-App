import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/api/graphql',
})

// Create the apollo client
export default new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      ExerciseType: {
        keyFields: ["id"],
      }
    }
  }),
})