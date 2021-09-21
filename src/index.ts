import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
//
import { RegisterResolver } from "./modules/user/Register";
//

//
const main = async () => {
  try {
    await createConnection();
    const schema = await buildSchema({
      resolvers: [RegisterResolver],
    });
    const apolloServer = new ApolloServer({ schema });
    const app = express();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log("server started  in http://localhost:4000/graphql");
    });
  } catch (err) {
    console.log("error", err);
  }
};
main();
