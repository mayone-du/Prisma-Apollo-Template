import { arg, extendType, inputObjectType, nonNull } from "nexus";

import { userObject } from "../";

const createUserInput = inputObjectType({
  name: "CreateUserInput",
  definition: (t) => {
    t.nonNull.string("email");
  },
});

const updateUserInput = inputObjectType({
  name: "UpdateUserInput",
  definition: (t) => {
    t.nonNull.string("email");
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create
    t.field("createUser", {
      type: userObject,
      args: { input: nonNull(arg({ type: createUserInput })) },
      resolve: async (_root, args, ctx) => {
        const result = await ctx.prisma.user.create({
          data: {
            ...args.input,
          },
        });
        return result;
      },
    });

    // update
    t.field("updateUser", {
      type: userObject,
      args: { input: nonNull(arg({ type: updateUserInput })) },
      resolve: async (_root, args, ctx) => {
        const result = await ctx.prisma.user.update({
          where: {
            email: args.input.email,
          },
          data: {
            ...args.input,
          },
        });
        return result;
      },
    });
  },
});
