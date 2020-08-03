var express = require('express');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hero: String,
    a: Query
  }
`);

var root = { hero: () => 'Hello world!', a: () => ({ a1: 1, a2: 2 }) };

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
