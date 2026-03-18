import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
 
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: { 
        type: GraphQLString,
        resolve: () => 'Hello world!'
      },
    },
  }),
});
 
const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
  }),
);
 
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');