import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import cors from 'cors';

const schema = buildSchema(`
  type Query {
    forms: [String]
  }
`);


const rootValue = {
  forms: () => ['Form 1', 'Form 2'],
};

const app = express();
app.use(cors()); 

app.all('/graphql', createHandler({ 
  schema, 
  rootValue 
}));

app.listen(4000, () => console.log('Server on http://localhost:4000/graphql'));
