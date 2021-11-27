import { objectType } from "nexus";
import { User } from "nexus-prisma";

export const userObject = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.email);
  },
});
