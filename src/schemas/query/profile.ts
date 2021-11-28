import { extendType } from "nexus";

import { profileObject } from "../object";

export const profileQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("profile", {
      type: profileObject,
      args: {
        id: "BigInt",
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.profile.findFirst({ where: { id: Number(args.id) } });
      },
    });

    // TODO: connection field
  },
});
