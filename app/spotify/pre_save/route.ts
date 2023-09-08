import { buttonStyles, getOrigin, primaryButtonStyles } from "@/utils";
import { safeRedirect } from "@/utils/safeRedirect";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  getSpotifyAccessToken,
  initiateSpotifyLogin,
  saveAlbumsForUser,
} from "../spotifyApi";
import { NextResponse } from "next/server";

// interface Props {
//   params: { id: string };
//   searchParams: { return_uri?: string };
// }

// export default async function PreSave({ params, searchParams }: Props) {
//   const returnUrl = safeRedirect(searchParams.return_uri);
//   const success_redirect = `${getOrigin()}/spotify/pre_save/${
//     params.id
//   }?return_uri=${searchParams.return_uri}`;

//   const accessToken = await getSpotifyAuthToken();
//   // const loginParams = new URLSearchParams({

//   // }):

//   return (
//     <main className="min-h-screen bg-gradient-to-b gradient-full dark:text-white">
//       <div className="container max-w-screen-sm mx-auto py-8">
//         <h1 className="text-5xl mb-5">Spotify Pre-Save</h1>

//         <p>
//           In order to perform the pre-save for you, I will need some permissions
//           on your Spotify account.
//         </p>

//         <form className="mt-8" method="POST" action="/spotify/login_init">
//           <div className="flex gap-4">
//             <input
//               type="hidden"
//               name="success_redirect"
//               value={success_redirect}
//             />
//             <input type="hidden" name="error_redirect" value={returnUrl} />
//             <Link href={returnUrl} className={buttonStyles}>
//               I&apos;d rather not pre-save then
//             </Link>
//             <button className={primaryButtonStyles} type="submit">
//               Ok, let&apos;s go
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("album_id");

  if (!id) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const loginStatus = url.searchParams.get("spotify_login_status");
  const returnUrl = safeRedirect(url.searchParams.get("return_uri"));
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    /* prevent infinite auth loop */
    if (loginStatus) {
      const nextUrl = new URL(returnUrl);
      nextUrl.searchParams.append("spotify_login_status", loginStatus);

      return NextResponse.redirect(nextUrl, {
        status: 302,
      });
    }

    const successRedirect = new URL(url.origin);
    successRedirect.pathname = url.pathname;
    successRedirect.searchParams.append("return_uri", returnUrl);
    successRedirect.searchParams.append("album_id", id);

    return initiateSpotifyLogin({
      successUrl: successRedirect.toString(),
      errorUrl: returnUrl,
    });
  }

  await saveAlbumsForUser(accessToken, [id]);

  const nextUrl = new URL(returnUrl);
  nextUrl.searchParams.append("spotify_pre_save_status", "success");
  return NextResponse.redirect(nextUrl, { status: 302 });
}
