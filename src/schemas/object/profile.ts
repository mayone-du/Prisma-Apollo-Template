import { objectType } from "nexus";
import { Profile } from "nexus-prisma";

export const profileObject = objectType({
  name: Profile.$name,
  description: Profile.$description,
  definition: (t) => {
    t.field(Profile.id);
    t.field(Profile.name);
    t.field(Profile.intro);
    t.field(Profile.user);
  },
});
