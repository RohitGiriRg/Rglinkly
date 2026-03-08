import { createLinkItem, formatLinkDate, isValidHttpUrl } from "./utils";

describe("Homepage utils", () => {
  it("validates http/https URLs", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true);
    expect(isValidHttpUrl("http://example.com/path")).toBe(true);
    expect(isValidHttpUrl("ftp://example.com")).toBe(false);
    expect(isValidHttpUrl("not-a-url")).toBe(false);
  });

  it("formats date as MMM DD, YYYY", () => {
    const formatted = formatLinkDate(new Date("2026-03-05T00:00:00.000Z"));
    expect(formatted).toMatch(/\w{3}\s\d{2},\s\d{4}/);
  });

  it("creates a default Active link item", () => {
    const item = createLinkItem("https://a.com", "https://is.gd/test", new Date("2026-03-05"));
    expect(item.originalLink).toBe("https://a.com");
    expect(item.shortLink).toBe("https://is.gd/test");
    expect(item.status).toBe("Active");
    expect(item.id).toBeTruthy();
    expect(item.expiresAt - item.createdAt).toBe(24 * 60 * 60 * 1000);
  });
});
