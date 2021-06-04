import { ApolloServer } from 'apollo-server-micro';
import { createContext } from './context';
import resolvers from './resolvers';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema("./pages/api/schema.graphql");
const Context = createContext();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return {
      ...request,
      ...Context,
    }
  },

  subscriptions: {
    path: '/api/ws',
    keepAlive: 9000,
    onConnect: () => console.log('connected'),
    onDisconnect: () => console.log('disconnected'),
  },
  playground: {
    subscriptionEndpoint: '/api/ws',
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const graphqlWithSubscriptionHandler = (req, res, next) => {
  if (!res.socket.server.apolloServer) {
    console.log(`* apolloServer first use *`);

    apolloServer.installSubscriptionHandlers(res.socket.server);
    const handler = apolloServer.createHandler({ path: '/api' });
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;
