import { Prisma } from "@prisma/client";
import { enumType, objectType } from "nexus";
import { User } from "nexus-prisma";

// import { allEnum } from "../enum";

export const enumTypes = Prisma.dmmf.datamodel.enums.map((e) => {
  return enumType({
    name: e.name,
    members: e.values,
  });
});

// const a = allEnum.find((e) => {
//   return e.name === "Role" || e.name === "Status";
// });

// export const statusEnum = enumType({
//   name: "StatusEnum",
//   members: {
//     ACTIVE: 0,
//     INACTIVE: 10,
//     DELETED: 20,
//   },
// });

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
