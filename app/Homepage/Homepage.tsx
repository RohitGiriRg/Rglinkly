"use client";

import styles from "./Homepage.module.css";

export default function Homepage() {
    return (
        <main className={styles.wrapper}>
            {/* Navbar */}
            <header className={styles.navbar}>
                <div className={styles.logo}>
                    Rg<span>Linkly</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.ghostBtn}>Login</button>
                    <button className={styles.primaryBtn}>Register Now</button>
                </div>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Shorten Your <span>Loooong</span> Links :)
                </h1>

                <p className={styles.subtitle}>
                    RgLinkly is an efficient and easy-to-use URL shortening service that
                    streamlines your online experience.
                </p>

                <div className={styles.inputBox}>
                    <input
                        type="text"
                        placeholder="Enter the link here"
                        className={styles.input}
                    />
                    <button className={styles.primaryBtn}>Shorten Now!</button>
                </div>

                <div className={styles.hint}>
                    <span className={styles.dot} />
                    Auto Paste from Clipboard
                </div>
            </section>

            {/* Table */}
            <section className={styles.tableSection}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Short Link</th>
                            <th>Original Link</th>
                            <th>QR Code</th>
                            <th>Clicks</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rglinkly.com/Bn41aC0lNx</td>
                            <td>https://twitter.com/...</td>
                            <td>⬜</td>
                            <td>1313</td>
                            <td className={styles.active}>Active</td>
                            <td>Oct-10-2023</td>
                        </tr>
                        <tr>
                            <td>Rglinkly.com/Bn41aC0lNx</td>
                            <td>https://youtube.com/...</td>
                            <td>⬜</td>
                            <td>4313</td>
                            <td className={styles.inactive}>Inactive</td>
                            <td>Oct-08-2023</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}
