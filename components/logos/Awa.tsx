import { ComponentPropsWithoutRef } from "react";

export function AwaLogo(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 104 24"
      fill="currentColor"
      {...props}
    >
      <path d="m36.2 10.2-2.6 4.7H37l-.6-4.7Zm1.2 8.1h-5.7L30.2 21H25L35.1 3h5.4l2.6 18h-5.3l-.4-2.7Zm35-8.1L70 14.9h3.3l-.7-4.7Zm1.2 8.1H68L66.4 21h-5.2L71.3 3h5.4l2.6 18H74l-.4-2.7ZM41.8 3h5.4l1.2 9 4.2-9h5l1 10 5.6-10h5.7l-10 18h-5.3l-.9-9-4.1 9h-5.2L41.8 3Z"></path>
    </svg>
  );
}
