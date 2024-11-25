"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { CheckCircle, ExclamationCircle, XMark } from "@hd/components/icons";
import { SPOTIFY_STATUS } from "@hd/utils/spotify/status";
import { baseFocusStyles } from "@hd/utils/styles";

type FeedbackType = "success" | "error";
interface Feedback {
  type: FeedbackType;
  content: ReactNode;
}

export default function SpotifyFeedback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState<null | {
    type: FeedbackType;
    content: ReactNode;
  }>(null);
  const preSaveStatus = searchParams.get("spotify_pre_save_status");
  const spotifyLoginStatus = searchParams.get("spotify_login_status");

  useEffect(() => {
    if (preSaveStatus || spotifyLoginStatus) {
      setFeedback(
        (preSaveStatus && getPreSaveStatusFeedback(preSaveStatus)) ||
          getLoginStatusFeedback(spotifyLoginStatus),
      );
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete("spotify_pre_save_status");
      nextUrl.searchParams.delete("spotify_login_status");

      router.replace(nextUrl.toString());
    }
  }, [preSaveStatus, spotifyLoginStatus, router]);

  return feedback ? (
    <div
      className={clsx(
        "flex items-center gap-4 shadow-xl bg-opacity-90 backdrop-blur",
        "rounded-lg p-4 max-w-screen-xl fixed bottom-4 left-1/2 -translate-x-1/2",
        feedback.type === "error"
          ? "bg-pink-600 dark:bg-pink-500 text-pink-50"
          : "bg-blue-200 text-blue-700",
      )}
    >
      {feedback.type === "error" ? (
        <ExclamationCircle aria-hidden className="h-10 " />
      ) : (
        <CheckCircle aria-hidden className="h-10" />
      )}
      <div>{feedback.content}</div>
      <button
        className={clsx(
          "self-start rounded-full p-1",
          baseFocusStyles,
          "focus-visible:outline-blue-800 transition-colors hover:transition-none",
          feedback.type === "error" ? "hover:bg-pink-800" : "hover:bg-blue-300",
        )}
        onClick={() => setFeedback(null)}
      >
        <XMark role="img" aria-label="Close" className="h-6" />
      </button>
    </div>
  ) : null;
}

function getPreSaveStatusFeedback(status: string | null): Feedback | null {
  switch (status) {
    case "success":
      return {
        type: "success",
        content: (
          <>
            <h3 className="text-3xl bold mb-2">Pre-Save Successful!</h3>
            <p>Awesome! Now we&apos;re both excited! </p>
          </>
        ),
      };
    default:
      return null;
  }
}

function getLoginStatusFeedback(status: string | null): Feedback | null {
  if (status === null) {
    return null;
  }

  switch (status) {
    case SPOTIFY_STATUS.SUCCESS:
      return {
        type: "success",
        content: (
          <>
            <h3 className="text-3xl bold mb-2">Login Successful!</h3>
            <p>
              Awesome! Your Spotify Account is now connected and we can do cool
              stuff with it!
            </p>
          </>
        ),
      };
    case SPOTIFY_STATUS.ACCESS_DENIED:
      return {
        type: "error",
        content: (
          <>
            <h3 className="text-3xl bold mb-2">Access Denied</h3>
            <p>I wasn&apos;t able to get access to your Spotify, sorry.</p>
          </>
        ),
      };
    case SPOTIFY_STATUS.COOKIE_MISSING:
      return {
        type: "error",
        content: (
          <>
            <h3 className="text-3xl bold mb-2">Please activate Cookies</h3>
            <p>
              I would like to store your spotify login in a cookie. Please allow
              cookies for this page.{" "}
              <em>
                (Don&apos;t worry, I will never track you using cookies (or
                anything else). I hate tracking! Still cookies are a great tool
                to store things like login-data
              </em>
            </p>
          </>
        ),
      };
    default:
      return {
        type: "error",
        content: (
          <>
            <h3 className="text-3xl bold mb-2">Something went wrong</h3>
            <p>
              I don&apos;t know what happened. Please try again later or{" "}
              <a
                href="mailto:support@hannesdiem.de"
                className={clsx(
                  baseFocusStyles,
                  "focus-visible:outline-blue-800 rounded underline",
                )}
              >
                contact me
              </a>
            </p>
          </>
        ),
      };
  }
}
