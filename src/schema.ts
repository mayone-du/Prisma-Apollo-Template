import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, connectionPlugin, makeSchema } from "nexus";

import * as types from "./schemas";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
  types,
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
