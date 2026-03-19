import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './generated/typeDefs.generated';
import { resolvers } from './generated/resolvers.generated';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors()); 

app.all('/graphql', createHandler({ 
  schema,
}));

app.listen(4000, () => console.log('Server on http://localhost:4000/graphql'));
