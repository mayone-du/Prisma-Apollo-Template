import { DateTimeResolver } from "graphql-scalars";
import {
  arg,
  asNexusMethod,
  enumType,
  inputObjectType,
  makeSchema,
  nonNull,
  objectType,
} from "nexus";

import type { Context } from "./context";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context: Context, _info) => {
        return context.prisma.user.findMany();
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nonNull.field("signupUser", {
      type: "User",
      resolve: (_parent, args, context: Context, _info) => {
        return context.prisma.user.create({
          data: {
            email: args.data.email,
          },
        });
      },
      args: {
        data: nonNull(
          arg({
            type: "UserCreateInput",
          }),
        ),
      },
    });
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.string("email");
  },
});

const SortOrder = enumType({
  name: "SortOrder",
  members: ["asc", "desc"],
});

const UserUniqueInput = inputObjectType({
  name: "UserUniqueInput",
  definition(t) {
    t.int("id");
    t.string("email");
  },
});

const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("email");
    t.string("name");
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, UserUniqueInput, UserCreateInput, SortOrder, DateTime],
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
});
