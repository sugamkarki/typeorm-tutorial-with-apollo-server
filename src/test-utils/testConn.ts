import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typegraphql-example_test",
    synchronize: true,
    entities: [__dirname + "/../src/entity/*.*"],
    dropSchema: true,
  });
};
