export interface Theme {
  htmlStyles?: string;
  bodyStyles?: string;
}

export const electrocuteTheme = {
  htmlStyles: "dark:bg-blue-900 text-black dark:text-white",
  bodyStyles:
    "bg-gradient-to-b electrocute-gradient-full prose-zinc min-h-screen",
} satisfies Theme;

export const beachTheme: Theme = {
  htmlStyles: "dark:bg-blue-900 text-black dark:text-white",
  bodyStyles:
    "bg-gradient-to-b beach-gradient-full prose-stone dark:prose-gray",
};
