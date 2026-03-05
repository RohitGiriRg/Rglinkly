import styles from "../Homepage.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        Rg<span>Linkly</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.ghostBtn} aria-label="Log in">
          Login
        </button>
        <button className={styles.primaryBtn} aria-label="Register now">
          Register Now
        </button>
      </div>
    </header>
  );
}
