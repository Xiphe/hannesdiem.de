import { Admin } from "@/payload-types";
import { superadmin } from "@payload/access/superadmin";
import { superadminOrTenantAdmin } from "@payload/access/superadminOrTenantAdmin";
import { CollectionConfig } from "payload";

export function toTenant(
  tenant: NonNullable<Admin["tenants"]>[number],
  prefix?: string,
) {
  const adminAccessHandler = superadminOrTenantAdmin(tenant);

  return (config: CollectionConfig): CollectionConfig => ({
    ...config,
    slug: [prefix, config.slug].filter(Boolean).join("-"),
    admin: { group: tenant, ...config.admin },
    access: {
      read: adminAccessHandler,
      update: adminAccessHandler,
      create: adminAccessHandler,
      delete: adminAccessHandler,
      readVersions: adminAccessHandler,
      admin: superadmin,
      unlock: superadmin,
      ...config.access,
    },
  });
}
