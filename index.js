import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './src/schema/schema.js';
import resolvers from './src/resolvers/resolver.js';
const graphQLPlayground = expressPlayground.default;


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.redirect('/playground');
  });

  app.get('/playground', graphQLPlayground({ endpoint: '/graphql', title: 'ReactPress' }));


  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`GraphQL Playground available at http://localhost:${PORT}/playground`);
  });
}

startServer();