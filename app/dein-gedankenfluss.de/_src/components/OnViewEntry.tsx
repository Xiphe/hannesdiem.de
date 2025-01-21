"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface OnViewEntryProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function OnViewEntry({
  children,
  threshold = 0.1,
  className,
  style,
}: OnViewEntryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {isVisible ? children : null}
    </div>
  );
}
