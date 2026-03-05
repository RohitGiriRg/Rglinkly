import { NextResponse } from "next/server";

interface ShortenResponse {
  shortUrl: string;
}

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

    const shortenerUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(
      parsedUrl.toString()
    )}`;

    const response = await fetch(shortenerUrl, {
      method: "GET",
      headers: { Accept: "text/plain" },
      cache: "no-store",
    });

    const text = (await response.text()).trim();

    if (!response.ok || !text || text.startsWith("Error:")) {
      return NextResponse.json(
        { error: "Shortening service failed. Try again." },
        { status: 502 }
      );
    }

    const payload: ShortenResponse = { shortUrl: text };
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
