import { extendType } from "nexus";

import { userObject } from "../object";

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: userObject,
      args: {
        id: "Int",
      },
      resolve: (_root, args, ctx) => {
        if (typeof args.id === "number")
          return ctx.prisma.user.findFirst({ where: { id: args.id } });
        return ctx.prisma.user.findFirst();
      },
    });
  },
});
