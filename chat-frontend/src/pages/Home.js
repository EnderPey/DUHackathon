// src/pages/Home.js
import { Link } from 'react-router-dom';
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome</h1>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
    </div>
  );
}