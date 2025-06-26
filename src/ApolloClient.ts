import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'http://localhost:8001/api/app/graphql',
})

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