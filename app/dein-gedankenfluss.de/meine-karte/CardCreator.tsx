"use client";

import { Card, categoryMap, isCategoryKey } from "@gf/components/Card";
import { cx } from "@gf/cx";
import {
  buttonOutlineStyles,
  buttonPaperStyles,
  focusStyles,
  inputLightStyles,
} from "@gf/styles/styles";
import { useEffect, useState } from "react";
import { getFirst } from "./getFirst";
import { useMounted } from "@utils/useMounted";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface CardCreatorProps {
  owner?: string | string[];
  title?: string | string[];
  body?: string | string[];
  optional?: string | string[];
  category?: string | string[];
}

export function CardCreator(props: CardCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(getFirst(props.title));
  const [body, setBody] = useState(getFirst(props.body));
  const [owner, setOwner] = useState(getFirst(props.owner));

  const [me] = useState(() => {
    if (typeof localStorage === "undefined") {
      return "";
    }
    const existing = localStorage.getItem("gf-my-card-user");

    if (!existing) {
      const newId = crypto.randomUUID();
      localStorage.setItem("gf-my-card-user", newId);
      return newId;
    }

    return existing;
  });
  const isMyCard = me === owner;
  const [optional, setOptional] = useState(getFirst(props.optional));
  const [category, setCategory] = useState(getFirst(props.category));
  const [showClipboardFeedback, setShowClipboardFeedback] = useState(false);
  const isCustomized = !!title || !!body || !!optional || !!category;
  const mounted = useMounted();

  useEffect(() => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries({
      title,
      body,
      owner,
      optional,
      category,
    })) {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    }

    window.history.replaceState({}, "", url.toString());
  }, [title, body, optional, category, owner]);

  return (
    <>
      <div className="h-screen w-screen">
        <Card
          className="mx-auto mt-[5vh] max-w-[90vw] max-h-[90vh] "
          title={title || (isCustomized ? "" : "Deine eigene Karte")}
          body={
            body ||
            (isCustomized
              ? ""
              : "Du kannst hier deine eigene Gedankenfluss Karte schreiben.\n\nKlicke unten auf\n- Eigene Karte Schreiben -\num zu beginnen.")
          }
          optional={
            optional ||
            (isCustomized
              ? ""
              : "Wenn du fertig bist, kannst du auf \'Teilen\' drücken und die Karte an jemanden Senden")
          }
          category={
            isCategoryKey(category)
              ? category
              : isCustomized
                ? undefined
                : "anleitung"
          }
        />
      </div>
      {mounted ? (
        <div className="flex flex-col justify-center pt-8 pb-32 container max-w-screen-md">
          {!isOpen ? (
            <div className="flex text-lg gap-4 justify-center">
              <button
                className={cx(
                  isCustomized ? buttonOutlineStyles : buttonPaperStyles,
                  focusStyles,
                )}
                onClick={() => {
                  if (!isMyCard) {
                    setTitle("");
                    setBody("");
                    setOptional("");
                    setCategory("");
                    setOwner(me);
                  }
                  setIsOpen(true);
                }}
              >
                {isCustomized && isMyCard
                  ? "Karte anpassen"
                  : "Eigene Karte Schreiben"}
              </button>
              {isCustomized && isMyCard ? (
                <button
                  className={cx(buttonPaperStyles, focusStyles)}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShowClipboardFeedback(true);
                    setTimeout(() => {
                      setShowClipboardFeedback(false);
                    }, 2000);
                  }}
                >
                  Karte teilen
                </button>
              ) : null}
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-center mb-16">
                <div className="text-water-300 border-2 bg-water-800 border-water-500 rounded-lg p-4">
                  <p className="font-bold text-water-150 mb-2">
                    <ExclamationTriangleIcon className="w-5 h-5 inline-block" />{" "}
                    Dies ist eine Spielerei, die wir aus Spaß gebaut haben.
                  </p>
                  Teile keine persönlichen oder sensetiven Informationen und sei
                  nett zu anderen.
                </div>
              </div>
              <label className="flex flex-col gap-1.5 mb-4">
                Titel
                <input
                  type="text"
                  className={inputLightStyles}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1.5 mb-4">
                Inhalt
                <textarea
                  className={inputLightStyles}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1.5 mb-4">
                Hinweis
                <input
                  type="text"
                  className={inputLightStyles}
                  value={optional}
                  onChange={(e) => setOptional(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1.5 mb-16">
                Kategorie
                <select
                  className={cx(inputLightStyles, "appearance-none")}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value=""></option>
                  {Object.entries(categoryMap)
                    .filter(([key]) => key !== "anleitung")
                    .map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.title}
                      </option>
                    ))}
                </select>
              </label>
              <div className="flex text-lg gap-4 justify-center">
                <button
                  className={cx(buttonOutlineStyles, focusStyles)}
                  onClick={() => {
                    setTitle("");
                    setBody("");
                    setOptional("");
                    setCategory("");
                  }}
                >
                  Zurücksetzen
                </button>
                <button
                  className={cx(buttonPaperStyles, focusStyles)}
                  onClick={() => setIsOpen(false)}
                >
                  Fertig
                </button>
              </div>
            </div>
          )}
          {showClipboardFeedback ? (
            <div className="text-lg text-center h-0">
              <div className="pt-8">
                Der Link wurde in die Zwischenablage kopiert!
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
