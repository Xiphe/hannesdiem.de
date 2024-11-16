import { PropsWithChildren } from "react";
import { default as BaseLayout } from "../(common)/layout";
import { getPost } from "./getPost";
import { Params } from "@/utils";
import { beachTheme } from "../themes";
export { generateMetadata } from "../(common)/layout";

export default async function Layout(
  props: PropsWithChildren<Params<{ slug: string | string[] }>>,
) {
  const params = await props.params;

  const { slug } = params;

  const { children } = props;

  const { theme: themeName } = getPost(slug) || {};

  return (
    <BaseLayout theme={themeName === "beach" ? beachTheme : undefined}>
      {children}
    </BaseLayout>
  );
}
