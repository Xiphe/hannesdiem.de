import { Admin } from "@/payload-types";
import { type Access } from "payload";

export const superadminOrTenantAdmin = (
  tenant: NonNullable<Admin["tenants"]>[number],
) =>
  (({ req: { user } }) => {
    return Boolean(user?.superadmin || user?.tenants?.includes(tenant));
  }) satisfies Access;
