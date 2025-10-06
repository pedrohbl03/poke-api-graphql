import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { GraphQLContext } from './types/graphql-context.type';
import typeDefs from './schema';
import resolvers from './resolvers';
import errorPlugin from './middlewares/errorPlugin';
import { GraphQLError } from 'graphql';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Create Apollo server
const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [errorPlugin],
  formatError: (err) => {
    return {
      message: err.message,
      code: err.extensions?.code || 'BAD_REQUEST',
      details: err.extensions?.details,
      path: err.path,
    };
  },
});

await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
}));

// send back a 404 error for any unknown api request
app.use((req, res) => {
  res
    .status(404)
    .json({
      path: req.originalUrl,
      success: false,
      message: 'Resource not found',
    });
});

export default app;