import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './generated/typeDefs.generated';
import { resolvers } from './generated/resolvers.generated';
import path from 'path';

const PORT = process.env.PORT ?? 4000;
const isProd = process.env.NODE_ENV === 'production';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors());

app.all(
  '/graphql',
  createHandler({
    schema,
  }),
);

if (isProd) {
  const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () =>
  console.log(`Server on port ${PORT}`),
);
