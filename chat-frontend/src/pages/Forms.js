import { Link } from 'react-router-dom';
import styles from "../styles/Forms.module.css"

export default function Forms() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome</h1>
        <button className={styles.ctaButton}>Get Started</button>
      </div>
    </div>
  );
}