"use client";

import { useEffect, useState } from "react";

let hasBeenMounted = false;
export function useMounted() {
  const [mounted, setMounted] = useState(hasBeenMounted);
  useEffect(() => {
    hasBeenMounted = true;
    setMounted(true);
  }, []);
  return mounted;
}
