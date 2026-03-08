import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

const LINKS_COLLECTION = "links";

interface LinkDocument {
  originalUrl: string;
  expiresAt: number;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const doc = await db.collection(LINKS_COLLECTION).doc(slug).get();

    if (!doc.exists) {
      return new Response("Short link not found.", { status: 404 });
    }

    const data = doc.data() as LinkDocument;

    if (!data?.originalUrl) {
      return new Response("Invalid short link.", { status: 500 });
    }

    if (Date.now() > data.expiresAt) {
      return new Response("This short link has expired.", { status: 410 });
    }

    return NextResponse.redirect(data.originalUrl, 302);
  } catch {
    return new Response("Unexpected server error", { status: 500 });
  }
}
