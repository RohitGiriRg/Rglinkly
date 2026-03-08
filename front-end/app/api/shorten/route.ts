import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const LINKS_COLLECTION = "links";
const LINK_TTL_MS = 24 * 60 * 60 * 1000;

interface ShortenResponse {
  shortUrl: string;
}

interface LinkDocument {
  slug: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: number;
  expiresAt: number;
  status: "active" | "expired";
}

const getBaseUrl = (requestUrl: string) => {
  const configured = process.env.NEXT_PUBLIC_APP_BASE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  return new URL(requestUrl).origin;
};

const createUniqueSlug = async (maxAttempts = 5) => {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const slug = nanoid(7);
    const docRef = db.collection(LINKS_COLLECTION).doc(slug);
    const doc = await docRef.get();

    if (!doc.exists) {
      return { slug, docRef };
    }
  }

  throw new Error("Unable to generate a unique short URL slug");
};

export async function POST(req: Request) {
  try {
    const { url } = (await req.json()) as { url?: string };

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    if (!/^https?:$/.test(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "URL must start with http:// or https://" },
        { status: 400 }
      );
    }

    const { slug, docRef } = await createUniqueSlug();
    const now = Date.now();
    const baseUrl = getBaseUrl(req.url);
    const shortUrl = `${baseUrl}/r/${slug}`;

    const payload: LinkDocument = {
      slug,
      originalUrl: parsedUrl.toString(),
      shortUrl,
      createdAt: now,
      expiresAt: now + LINK_TTL_MS,
      status: "active",
    };

    await docRef.set(payload);

    const response: ShortenResponse = { shortUrl };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
