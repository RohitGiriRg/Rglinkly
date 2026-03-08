const mocks = vi.hoisted(() => {
  const getMock = vi.fn();
  const setMock = vi.fn();
  const docMock = vi.fn(() => ({ get: getMock, set: setMock }));
  const collectionMock = vi.fn(() => ({ doc: docMock }));

  return { getMock, setMock, docMock, collectionMock };
});

vi.mock("@/lib/firebaseAdmin", () => ({
  db: {
    collection: mocks.collectionMock,
  },
}));

vi.mock("nanoid", () => ({
  nanoid: vi.fn(() => "abc1234"),
}));

import { POST } from "./route";

describe("POST /api/shorten", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_APP_BASE_URL = "http://localhost:3000";
  });

  it("returns 400 when URL is missing", async () => {
    const req = new Request("http://localhost/api/shorten", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when URL is invalid", async () => {
    const req = new Request("http://localhost/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url: "abc" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns a Firebase-backed short URL", async () => {
    mocks.getMock.mockResolvedValueOnce({ exists: false });
    mocks.setMock.mockResolvedValueOnce(undefined);

    const req = new Request("http://localhost/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    });

    const res = await POST(req);
    const data = (await res.json()) as { shortUrl: string };

    expect(res.status).toBe(200);
    expect(data.shortUrl).toBe("http://localhost:3000/r/abc1234");
    expect(mocks.collectionMock).toHaveBeenCalledWith("links");
    expect(mocks.docMock).toHaveBeenCalledWith("abc1234");
    expect(mocks.setMock).toHaveBeenCalledTimes(1);
  });
});
