import { objectType } from "nexus";
import { User } from "nexus-prisma";

export const userObject = objectType({
  name: User.$name,
  description: User.$description,
  definition: (t) => {
    t.field(User.id);
    t.field(User.username);
    t.field(User.nickname);
    t.field(User.email);
    t.field(User.role.name, { type: "Role" });
    t.field(User.status.name, { type: "Status" });
    t.field(User.createdAt);
    t.field(User.updatedAt);
  },
});
