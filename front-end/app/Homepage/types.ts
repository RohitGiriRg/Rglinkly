export type LinkStatus = "Active" | "Inactive";

export interface LinkItem {
  id: string;
  shortLink: string;
  originalLink: string;
  clicks: number;
  status: LinkStatus;
  date: string;
  createdAt: number;
  expiresAt: number;
}

export interface ShortenApiResponse {
  shortUrl?: string;
  error?: string;
}
