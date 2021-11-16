import { objectType } from "nexus";

export const userObject = objectType({
  name: "User",
  description: "User Object",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
  },
});
