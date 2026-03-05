import { LinkItem, ShortenApiResponse } from "./types";

export const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const formatLinkDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export const createLinkItem = (
  originalLink: string,
  shortLink: string,
  date = new Date()
): LinkItem => ({
  id: crypto.randomUUID(),
  shortLink,
  originalLink,
  clicks: 0,
  status: "Active",
  date: formatLinkDate(date),
  createdAt: date.getTime(),
  expiresAt: date.getTime() + TWENTY_FOUR_HOURS_MS,
});

export const parseShortenResponse = async (
  response: Response
): Promise<ShortenApiResponse> => {
  const payload = (await response.json()) as ShortenApiResponse;
  return payload;
};
