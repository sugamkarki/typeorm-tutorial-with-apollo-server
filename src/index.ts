import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
//
@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello world!!!";
  }
}
//
const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const app = express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server started  in http://localhost:4000");
  });
};
main();
