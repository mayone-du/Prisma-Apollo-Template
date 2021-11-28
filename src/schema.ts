import {
  DateTimeResolver,
  GraphQLBigInt,
  GraphQLDateTime,
  GraphQLEmailAddress,
} from "graphql-scalars";
import { asNexusMethod, connectionPlugin, makeSchema } from "nexus";

import * as allTypes from "./schemas";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
  types: [
    allTypes,
    asNexusMethod(GraphQLBigInt, "bigint", "bigint"),
    asNexusMethod(GraphQLDateTime, "datetime", "Date"),
    asNexusMethod(GraphQLEmailAddress, "email", "string"),
  ],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  plugins: [connectionPlugin()],
});
