import { POST } from "./route";

describe("POST /api/shorten", () => {
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

  it("returns short URL when upstream succeeds", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("https://is.gd/xyz", { status: 200 }));

    const req = new Request("http://localhost/api/shorten", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    });

    const res = await POST(req);
    const data = (await res.json()) as { shortUrl: string };

    expect(res.status).toBe(200);
    expect(data.shortUrl).toBe("https://is.gd/xyz");

    fetchMock.mockRestore();
  });
});
