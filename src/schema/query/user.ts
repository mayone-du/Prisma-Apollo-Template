import { extendType } from "nexus";
import { user } from "src/schema/interfaces";

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: user,
      args: {
        id: "Int",
      },
      resolve: (_root, args, ctx) => {
        return ctx.prisma.user.findFirst({ where: { id: args.id } });
      },
    });
  },
});
