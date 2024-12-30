import { type Access } from "payload";

export const superadmin = (({ req: { user } }) => {
  return Boolean(user?.superadmin);
}) satisfies Access;
