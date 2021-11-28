import { enumType, objectType } from "nexus";
import { User } from "nexus-prisma";

export const role = enumType({
  name: "Role",
  // members: ["ADMIN", "USER", ],
  members: {
    ADMIN: 0,
    USER: 1,
  },
});

export const userObject = objectType({
  name: User.$name,
  description: User.$description,
  definition: (t) => {
    t.field(User.id);
    t.field(User.username);
    t.field(User.nickname);
    t.field(User.email);
    t.field("role", { type: "Role" });
    // t.string("role");
    // t.field(Role);
    // t.field("status", { type: user });
    t.field(User.createdAt);
    t.field(User.updatedAt);
  },
});
