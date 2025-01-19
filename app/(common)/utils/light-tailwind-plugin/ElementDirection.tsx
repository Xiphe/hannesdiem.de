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
    let lastScrollTop = window.scrollY;
    let lastScrollLeft = window.scrollX;
    let mousePos: { x: number; y: number } = {
      x: document.documentElement.scrollWidth / 2,
      y: document.documentElement.scrollHeight / 2,
    };
    handleMove();

    function handleMouseMove(ev: MouseEvent) {
      mousePos.x = ev.pageX;
      mousePos.y = ev.pageY;
      handleMove();
    }

    function handleScroll(ev: Event) {
      const currentScrollTop = window.scrollY;
      const currentScrollLeft = window.scrollX;

      const deltaY = currentScrollTop - lastScrollTop;
      const deltaX = currentScrollLeft - lastScrollLeft;

      lastScrollTop = currentScrollTop;
      lastScrollLeft = currentScrollLeft;

      mousePos.x += deltaX;
      mousePos.y += deltaY;
      handleMove();
    }

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

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("scroll", handleScroll);
    };
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
            String((offsetX / pageWidth) * -2),
          );
          ref.current.style.setProperty(
            "--tw-light-dir-y",
            String((offsetY / pageHeight) * -2),
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

export function useRelativeLightDirection<Element extends HTMLElement>() {
  const register = useLightDirectionContext();
  const ref = useRef<Element>(null);

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
            normalizeAxis(mouseX, bounds.minX, bounds.maxX),
          );
          ref.current.style.setProperty(
            "--tw-light-dir-y",
            normalizeAxis(mouseY, bounds.minY, bounds.maxY),
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
// Clamp mouse position to boundaries and normalize to -1 to 1
function normalizeAxis(value: number, min: number, max: number) {
  const clamped = Math.max(min, Math.min(value, max));
  return String(-1 * (((clamped - min) / (max - min)) * 2 - 1));
}
