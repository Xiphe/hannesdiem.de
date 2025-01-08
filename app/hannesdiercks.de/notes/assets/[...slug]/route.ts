import { Params } from "@utils/types";
import { NextResponse } from "next/server";
import { getDropbox } from "../../getDropbox";
import { DropboxResponseError } from "dropbox";
import { fileTypeFromBuffer } from "file-type";
import { FOUR_WEEKS } from "@utils/time";
import { unstable_cacheLife as cacheLife } from "next/cache";

export async function GET(_: Request, { params }: Params<{ slug: string[] }>) {
  "use cache";
  cacheLife("weeks");

  const { slug } = await params;
  const dbx = getDropbox();
  const path = `/Apps/remotely-save/Hannes/Blog/assets/${slug.join("/")}`;

  try {
    var res = await dbx.filesDownload({ path });
  } catch (err) {
    if (
      !(err instanceof DropboxResponseError) ||
      !err.error.error_summary.startsWith("path/not_found/")
    ) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

  const fileBlob = (res.result as any).fileBlob;
  if (!(fileBlob instanceof Blob)) {
    throw new Error("fileBlob is not a Blob");
  }

  const document = Buffer.from(await fileBlob.arrayBuffer());
  const fileTypeResult = await fileTypeFromBuffer(document);

  return new NextResponse(fileBlob, {
    status: 200,
    headers: {
      "Cache-Control": `public, max-age=${(FOUR_WEEKS * 2) / 1000}`,
      ...(res.result.content_hash
        ? {
            ETag: res.result.content_hash,
          }
        : {}),
      ...(fileTypeResult
        ? {
            "Content-Type": fileTypeResult.mime,
          }
        : {}),
    },
  });
}
