import { NextResponse } from "next/server";
import config from "@payload-config";
import { createPayloadRequest } from "@payloadcms/next/utilities";
import { superadminOrCronjob } from "@payload/access/superadminOrCronjob";

export const GET = async (request: Request) => {
  const req = await createPayloadRequest({
    config,
    request,
  });

  if (!superadminOrCronjob({ req })) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    await req.payload.delete({
      collection: "cache",
      where: {
        and: [
          {
            expires: {
              less_than: Date.now(),
            },
          },
          {
            expires: {
              not_equals: 0,
            },
          },
        ],
      },
    });
  } catch (err) {
    req.payload.logger.error(err);
  }

  return NextResponse.json({ ok: true });
};
