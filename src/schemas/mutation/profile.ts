import { arg, extendType, inputObjectType, nonNull } from "nexus";

import { profileObject } from "../";

const createProfileInput = inputObjectType({
  name: "CreateProfileInput",
  definition: (t) => {
    t.nonNull.bigint("userId");
    t.nonNull.string("name");
    t.nonNull.string("intro");
  },
});

export const profileMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    // create
    t.field("createProfile", {
      type: profileObject,
      args: { input: nonNull(arg({ type: createProfileInput })) },
      resolve: async (_root, args, ctx) => {
        return await ctx.prisma.profile.create({
          // TODO: ctxにログイン中のuser情報を詰めて、それをもとにprofileを作成する
          data: {
            ...args.input,
          },
        });
      },
    });
  },
});
