// src/pages/Home.js
import { Link } from 'react-router-dom';
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome</h1>
        <p> Welcome to ResRelate, a chat and forms service designed to help students stay connected with residential life activities. With ResRelate, students can easily access important forms, participate in real-time chats, and engage with campus events, making it simpler to stay informed and involved in their residential community. This platform fosters a stronger sense of connection and support among residents, helping everyone get the most out of their on-campus experience.
        </p>
      </div>
    </div>
  );
}