const mocks = vi.hoisted(() => {
  const getMock = vi.fn();
  const docMock = vi.fn(() => ({ get: getMock }));
  const collectionMock = vi.fn(() => ({ doc: docMock }));

  return { getMock, docMock, collectionMock };
});

vi.mock("@/lib/firebaseAdmin", () => ({
  db: {
    collection: mocks.collectionMock,
  },
}));

import { GET } from "./route";

describe("GET /r/[slug]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 when slug is not found", async () => {
    mocks.getMock.mockResolvedValueOnce({ exists: false });

    const res = await GET(new Request("http://localhost/r/abc"), {
      params: Promise.resolve({ slug: "abc" }),
    });

    expect(res.status).toBe(404);
  });

  it("returns 410 for expired links", async () => {
    mocks.getMock.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        originalUrl: "https://example.com",
        expiresAt: Date.now() - 1,
      }),
    });

    const res = await GET(new Request("http://localhost/r/abc"), {
      params: Promise.resolve({ slug: "abc" }),
    });

    expect(res.status).toBe(410);
  });

  it("redirects active links", async () => {
    mocks.getMock.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        originalUrl: "https://example.com",
        expiresAt: Date.now() + 60_000,
      }),
    });

    const res = await GET(new Request("http://localhost/r/abc"), {
      params: Promise.resolve({ slug: "abc" }),
    });

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://example.com/");
  });
});
