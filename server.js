import {ApolloServer} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import {resolvers} from './graphql/resolvers.js'
import {typeDefs} from './graphql/schema.js'


// Create Apollo Server instance
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});