import { extendType } from "nexus";
import { User } from "nexus-prisma";

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    // TODO: 多分全部はだめ $から始まるやつとかはいらないとかスコープ確認
    for (const value of Object.values(User)) t.field(value);
  },
});
