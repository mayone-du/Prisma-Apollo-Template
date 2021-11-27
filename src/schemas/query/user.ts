import { extendType } from "nexus";

import { user } from "../interfaces";

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: user,
      args: {
        id: "Int",
      },
      resolve: (_root, args, ctx) => {
        if (typeof args.id === "number")
          return ctx.prisma.user.findFirst({ where: { id: args.id } });
      },
    });
  },
});
