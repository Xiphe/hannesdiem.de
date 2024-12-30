import { type Access } from "payload";

export const superadminOrSelf = (({ req: { user } }) => {
  if (!user) {
    return false;
  }

  return user.superadmin || { id: { equals: user.id } };
}) satisfies Access;
