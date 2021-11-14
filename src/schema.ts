import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context: Context) => {
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

const PostOrderByUpdatedAtInput = inputObjectType({
  name: "PostOrderByUpdatedAtInput",
  definition(t) {
    t.nonNull.field("updatedAt", { type: "SortOrder" });
  },
});

const UserUniqueInput = inputObjectType({
  name: "UserUniqueInput",
  definition(t) {
    t.int("id");
    t.string("email");
  },
});

const PostCreateInput = inputObjectType({
  name: "PostCreateInput",
  definition(t) {
    t.nonNull.string("title");
    t.string("content");
  },
});

const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("email");
    t.string("name");
    t.list.nonNull.field("posts", { type: "PostCreateInput" });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + "/../schema.graphql",
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
