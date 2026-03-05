"use client";

import { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Hero from "./components/Hero";
import LinksTable from "./components/LinksTable";
import Navbar from "./components/Navbar";
import { LinkItem } from "./types";
import {
  createLinkItem,
  isValidHttpUrl,
  parseShortenResponse,
} from "./utils";

const STORAGE_KEY = "rglinkly_links";

const getActiveLinks = (links: LinkItem[]) => {
  const now = Date.now();
  return links.filter((link) => link.expiresAt > now);
};

export default function Homepage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as LinkItem[];
      const activeLinks = getActiveLinks(parsed);
      setLinks(activeLinks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeLinks));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getActiveLinks(links)));
  }, [links]);

  const handleShorten = async (url: string) => {
    setError(null);
    setSuccess(null);

    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    if (!isValidHttpUrl(url)) {
      setError("Enter a valid URL starting with http:// or https://");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const payload = await parseShortenResponse(response);

      if (!response.ok || !payload.shortUrl) {
        setError(payload.error ?? "Failed to shorten URL.");
        return;
      }

      const newLink = createLinkItem(url, payload.shortUrl);
      setLinks((prev) => [newLink, ...getActiveLinks(prev)]);
      setSuccess("Link shortened successfully. This short link is kept for 24 hours.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.wrapper}>
      <Navbar />
      <Hero
        onShorten={handleShorten}
        loading={loading}
        error={error}
        success={success}
      />

      <p className={styles.storageNote}>
        Note: Each shortened URL is valid for 24 hours and both the original URL
        and shortened URL are saved in your browser local storage.
      </p>

      <LinksTable links={links} />
    </main>
  );
}
