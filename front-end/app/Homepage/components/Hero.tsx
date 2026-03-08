import styles from "../Homepage.module.css";
import ShortenForm from "./ShortenForm";

interface HeroProps {
  onShorten: (url: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function Hero({ onShorten, loading, error, success }: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Shorten Your <span>Loooong</span> Links :)
      </h1>

      <p className={styles.subtitle}>
        Toolzaar URL Shorten is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>

      <ShortenForm
        onSubmit={onShorten}
        loading={loading}
        error={error}
        success={success}
      />
    </section>
  );
}
