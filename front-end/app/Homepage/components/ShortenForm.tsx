import { FormEvent, useId, useState } from "react";
import styles from "../Homepage.module.css";

interface ShortenFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function ShortenForm({
  onSubmit,
  loading,
  error,
  success,
}: ShortenFormProps) {
  const [url, setUrl] = useState("");
  const inputId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(url.trim());
    if (!error) {
      setUrl("");
    }
  };

  return (
    <>
      <form className={styles.inputBox} onSubmit={handleSubmit} aria-label="Shorten URL form">
        <label htmlFor={inputId} className={styles.srOnly}>
          URL to shorten
        </label>
        <input
          id={inputId}
          type="url"
          placeholder="Enter the link here"
          className={styles.input}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          disabled={loading}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "shorten-error" : undefined}
        ></input>
        <button
          className={styles.primaryBtn}
          type="submit"
          disabled={loading}
          aria-label="Shorten URL"
        >
          {loading ? "Shortening..." : "Shorten URL!"}
        </button>
      </form>

      <div className={styles.hint}>
        <span className={styles.dot} aria-hidden="true" />
        Auto Paste from Clipboard
      </div>

      {error ? (
        <p id="shorten-error" className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className={styles.success} role="status" aria-live="polite">
          {success}
        </p>
      ) : null}
    </>
  );
}
