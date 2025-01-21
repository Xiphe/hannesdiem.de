"use client";

import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  createContext,
  use,
} from "react";

interface DirectionUpdate {
  mouseX: number;
  mouseY: number;
  pageWidth: number;
  pageHeight: number;
}

const LightDirectionContext = createContext<
  ((listener: (update: DirectionUpdate) => void) => () => void) | null
>(null);

export function LightDirectionProvider({ children }: PropsWithChildren) {
  const { listeners, register } = useMemo(() => {
    const listeners: ((update: DirectionUpdate) => void)[] = [];

    return {
      listeners,
      register(listener: (update: DirectionUpdate) => void): () => void {
        listeners.push(listener);
        return () => {
          listeners.splice(listeners.indexOf(listener), 1);
        };
      },
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    let lastScrollTop = window.scrollY;
    let lastScrollLeft = window.scrollX;
    let mousePos: { x: number; y: number } = {
      x: document.documentElement.scrollWidth / 2,
      y: document.documentElement.scrollHeight / 2,
    };
    handleMove();

    function handleMove() {
      requestAnimationFrame(() => {
        listeners.forEach((cb) => {
          cb({
            mouseX: mousePos.x,
            mouseY: mousePos.y,
            pageHeight: document.documentElement.scrollHeight,
            pageWidth: document.documentElement.scrollWidth,
          });
        });
      });
    }

    document.addEventListener(
      "mousemove",
      (ev) => {
        mousePos.x = ev.pageX;
        mousePos.y = ev.pageY;
        handleMove();
      },
      {
        signal: abortController.signal,
      },
    );
    document.addEventListener(
      "scroll",
      (ev) => {
        const currentScrollTop = window.scrollY;
        const currentScrollLeft = window.scrollX;

        const deltaY = currentScrollTop - lastScrollTop;
        const deltaX = currentScrollLeft - lastScrollLeft;

        lastScrollTop = currentScrollTop;
        lastScrollLeft = currentScrollLeft;

        mousePos.x += deltaX;
        mousePos.y += deltaY;
        handleMove();
      },
      {
        signal: abortController.signal,
      },
    );

    return abortController.abort;
  }, [listeners]);

  return (
    <LightDirectionContext value={register}>{children}</LightDirectionContext>
  );
}

function useLightDirectionContext() {
  const register = use(LightDirectionContext);

  if (!register) {
    throw new Error(
      "useGlobalLightDirection has to be used within LightDirectionProvider",
    );
  }

  return register;
}

export function useGlobalLightDirection() {
  const register = useLightDirectionContext();
  const ref = useRef<HTMLElement>(null);

  useEffect(
    () =>
      register(({ mouseX, mouseY, pageHeight, pageWidth }) => {
        if (ref.current) {
          const centerX = pageWidth / 2;
          const centerY = pageHeight / 2;

          const offsetX = mouseX - centerX;
          const offsetY = mouseY - centerY;

          ref.current.style.setProperty(
            "--tw-light-dir-x",
            String(Math.round((offsetX / pageWidth) * -2 * 1000) / 1000),
          );
          ref.current.style.setProperty(
            "--tw-light-dir-y",
            String(Math.round((offsetY / pageHeight) * -2 * 1000) / 1000),
          );
        }
      }),
    [register],
  );

  return useMemo(
    () => ({
      ref,
      style: {
        "--tw-light-dir-x": "0",
        "--tw-light-dir-y": "0",
      } as CSSProperties,
    }),
    [],
  );
}

export type Strength = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export function useRelativeLightDirection<Element extends HTMLElement>(
  strength: Strength | number = 1,
) {
  const register = useLightDirectionContext();
  const ref = useRef<Element>(null);

  const strengthTop =
    typeof strength === "object" ? (strength.top ?? 1) : strength;
  const strengthRight =
    typeof strength === "object" ? (strength.right ?? 1) : strength;
  const strengthBottom =
    typeof strength === "object" ? (strength.bottom ?? 1) : strength;
  const strengthLeft =
    typeof strength === "object" ? (strength.left ?? 1) : strength;

  useEffect(
    () =>
      register(({ mouseX, mouseY }) => {
        if (ref.current) {
          const box = ref.current.getBoundingClientRect();
          const padding = 50;

          // Calculate boundaries with padding
          const bounds = {
            minX: box.left + scrollX - padding,
            maxX: box.left + scrollX + box.width + padding,
            minY: box.top + scrollY - padding,
            maxY: box.top + scrollY + box.height + padding,
          };

          ref.current.style.setProperty(
            "--tw-light-dir-x",
            normalizeAxis(
              mouseX,
              bounds.minX,
              bounds.maxX,
              strengthLeft,
              strengthRight,
            ),
          );
          ref.current.style.setProperty(
            "--tw-light-dir-y",
            normalizeAxis(
              mouseY,
              bounds.minY,
              bounds.maxY,
              strengthTop,
              strengthBottom,
            ),
          );
        }
      }),
    [register, strengthTop, strengthRight, strengthBottom, strengthLeft],
  );

  return useMemo(
    () => ({
      ref,
      style: {
        "--tw-light-dir-x": "0",
        "--tw-light-dir-y": "0",
      } as CSSProperties,
    }),
    [],
  );
}

// Clamp mouse position to boundaries and normalize to -1 to 1
function normalizeAxis(
  value: number,
  min: number,
  max: number,
  strengthPos: number,
  strengthNeg: number,
) {
  const clamped = Math.max(min, Math.min(value, max));
  const normalized = -1 * (((clamped - min) / (max - min)) * 2 - 1);
  return String(
    Math.round(
      normalized * (normalized > 0 ? strengthPos : strengthNeg) * 1000,
    ) / 1000,
  );
}
