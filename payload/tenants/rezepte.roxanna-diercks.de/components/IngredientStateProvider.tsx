"use client";

import { Recipe } from "@/payload-types";
import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type IngredientSections = NonNullable<Recipe["ingredient-sections"]>;

const IngredientContext = createContext<IngredientSections>([]);
const IngredientSetContext = createContext<
  Dispatch<SetStateAction<IngredientSections>>
>(() => {});

export default function IngredientStateProvider({
  children,
}: PropsWithChildren) {
  const [sections, setSections] = useState<IngredientSections>([]);

  return (
    <IngredientSetContext.Provider value={setSections}>
      <IngredientContext.Provider value={sections}>
        {children}
      </IngredientContext.Provider>
    </IngredientSetContext.Provider>
  );
}

export function useIngredientSections() {
  return useContext(IngredientContext) || [];
}

export function useSetIngredientSections() {
  return useContext(IngredientSetContext);
}
