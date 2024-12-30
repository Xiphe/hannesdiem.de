import { Admin } from "@/payload-types";
import { superadmin } from "@payload/access/superadmin";
import { superadminOrTenantAdmin } from "@payload/access/superadminOrTenantAdmin";
import {
  BasePayload,
  CollectionConfig,
  Config,
  GlobalConfig,
  JobsConfig,
  Locale,
  LocalizationConfigWithLabels,
  PayloadComponent,
} from "payload";

type AdminComponents = NonNullable<NonNullable<Config["admin"]>["components"]>;
type Providers = NonNullable<AdminComponents["providers"]>;
export type Tenant = NonNullable<Admin["tenants"]>[number];

export type TenantConfig = Pick<Config, "collections" | "globals"> & {
  locales?: Locale[];

  jobs?: Pick<JobsConfig, "tasks" | "workflows">;
  providers?: PayloadComponent<{
    children?: React.ReactNode;
  }>[];
  devSeed?: (payload: BasePayload) => Promise<void> | void;
};

const WITH_CONFIGURED_TENANT_HOOK = Symbol("ON_TENANT_CONFIG_CREATED");

export function tenant({
  name,
  prefix,
  collections,
  globals,
  jobs,
  ...rest
}: TenantConfig & { name: Tenant; prefix: string }): TenantConfig {
  return {
    ...rest,
    collections: collections?.map((collection) =>
      finished(lock(name, group(name, brand(prefix, collection)))),
    ),
    globals: globals?.map((global) =>
      finished(lock(name, group(name, brand(prefix, global)))),
    ),
    jobs: {
      tasks: jobs?.tasks?.map((task) => finished(brand(prefix, task))) || [],
      workflows:
        jobs?.workflows?.map((task) => finished(brand(prefix, task))) || [],
    },
  };
}

type ConfigWithTenantHooks<T extends Record<string, unknown>> = {
  hooks?: {
    [WITH_CONFIGURED_TENANT_HOOK]: ((config: T) => T)[];
  };
};

export function withConfiguredTenant<T extends Record<string, unknown>>(
  config: T,
  callback: (config: T) => T,
): ConfigWithTenantHooks<T> & T {
  return {
    ...config,
    hooks: {
      ...(config.hooks as any),
      [WITH_CONFIGURED_TENANT_HOOK]: [
        ...((config as ConfigWithTenantHooks<T>).hooks?.[
          WITH_CONFIGURED_TENANT_HOOK
        ] || []),
        callback,
      ],
    },
  };
}

function finished<T extends Record<string, unknown>>(config: T) {
  return (
    (config as ConfigWithTenantHooks<T>).hooks?.[WITH_CONFIGURED_TENANT_HOOK] ||
    []
  ).reduce((memo, callback) => callback(memo), config);
}

function brand<T extends { slug: string }>(prefix: string, config: T): T {
  return {
    ...config,
    slug: [prefix, config.slug].filter(Boolean).join("-"),
  };
}

function group<T extends CollectionConfig | GlobalConfig>(
  tenant: Tenant,
  config: T,
): T {
  return {
    ...config,
    admin: { group: tenant, ...config.admin },
  };
}

function lock<T extends CollectionConfig | GlobalConfig>(
  tenant: Tenant,
  config: T,
): T {
  const adminAccessHandler = superadminOrTenantAdmin(tenant);
  return {
    ...config,
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
  };
}

export type BaseConfig = Omit<Config, "localization"> & {
  localization?: LocalizationConfigWithLabels;
};

export function mergeTenants(base: BaseConfig, ...configs: TenantConfig[]) {
  const mergedConfig: Config = {
    ...base,
    admin: {
      ...base.admin,
      components: {
        ...base.admin?.components,
        providers: [
          base.admin?.components?.providers,
          ...configs.map((config) => config.providers),
        ]
          .filter((val): val is Providers => Boolean(val))
          .flat(),
      },
    },
    localization: !base.localization
      ? false
      : {
          ...base.localization,
          locales: Array.from(
            new Set(
              [
                ...base.localization.locales,
                ...configs.map((config) => config.locales),
              ]
                .filter(Boolean)
                .flat() as Locale[],
            ),
          ),
        },
    collections: [
      ...(base.collections || []),
      ...configs.map((config) => config.collections || []).flat(),
    ],
    globals: [
      ...(base.globals || []),
      ...configs.map((config) => config.globals || []).flat(),
    ],
    jobs: {
      ...base.jobs,
      tasks: [
        ...(base.jobs?.tasks || []),
        ...configs.map((config) => config.jobs?.tasks || []).flat(),
      ],
      workflows: [
        ...(base.jobs?.workflows || []),
        ...configs.map((config) => config.jobs?.workflows || []).flat(),
      ],
    },
  };

  return mergedConfig;
}
