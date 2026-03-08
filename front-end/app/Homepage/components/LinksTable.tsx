"use client";

import { useState } from "react";
import styles from "../Homepage.module.css";
import { LinkItem } from "../types";

interface LinksTableProps {
  links: LinkItem[];
}

export default function LinksTable({ links }: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section className={styles.tableSection}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Short Link</th>
              <th>Original Link</th>
              <th>QR Code</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>
                  No links yet. Shorten your first URL above.
                </td>
              </tr>
            ) : (
              links.map((link) => (
                <tr key={link.id}>
                  <td className={styles.urlCell}>
                    <a
                      href={link.shortLink}
                      target="_blank"
                      rel="noreferrer"
                      title={link.shortLink}
                    >
                      {link.shortLink}
                    </a>
                  </td>
                  <td className={styles.urlCell} title={link.originalLink}>
                    {link.originalLink}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.qrBtn}
                      disabled
                      aria-label="Generate QR (coming soon)"
                      title="Generate QR — Coming soon"
                    >
                      <span aria-hidden="true">▦</span> Generate QR
                    </button>
                  </td>
                  <td
                    className={
                      link.status === "Active" ? styles.active : styles.inactive
                    }
                  >
                    {link.status}
                  </td>
                  <td>{link.date}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => copyText(link.id, link.shortLink)}
                      aria-label={`Copy short link ${link.shortLink}`}
                    >
                      {copiedId === link.id ? "Copied" : "Copy"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
