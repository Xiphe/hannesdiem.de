import { PropsWithChildren } from "react";
import { default as BaseLayout } from "../(common)/layout";
import { getPost } from "./getPost";
import { beachTheme } from "../_src/themes";
import { Params } from "@utils/types";
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
