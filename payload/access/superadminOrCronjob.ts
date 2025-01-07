import { type Access } from "payload";

export const superadminOrCronjob = (({ req: { headers, user } }) => {
  if (user?.superadmin) {
    return true;
  }

  const authHeader = headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}) satisfies Access;
