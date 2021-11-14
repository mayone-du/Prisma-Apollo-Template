import { ApolloServer } from "apollo-server";
import { context } from "src/context";
import { schema } from "src/schema";

const server = new ApolloServer({
  cors: true,
  schema: schema,
  context: context,
});

server.listen().then(async ({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});
