import { interfaceType } from "nexus";

export const user = interfaceType({
  name: "Node",
  definition(t) {
    t.id("id");
  },
  resolveType(_root, _context, _info) {
    return "User";
  },
});
