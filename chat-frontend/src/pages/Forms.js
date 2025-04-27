import { Link } from 'react-router-dom';
import styles from "../styles/Forms.module.css"

export default function Forms() {
  const resources = [
    {
      name: "Housing Application Portal",
      description: "University of Denver Housing Portal for applications",
      url: "https://du.starrezhousing.com/StarRezPortalX/7"
    },
    {
      name: "Housing & Meal Plan Contract (PDF, 2025-2026)",
      description: "Official contract for housing and meal plans, 2025-2026",
      url: "https://studentaffairs.du.edu/file/105918"
    },
    {
      name: "Housing & Meal Plan Contract (PDF, 2022-2023)",
      description: "Official contract for housing and meal plans, 2022-2023",
      url: "https://studentaffairs.du.edu/file/91194"
    },
    {
      name: "Apply for Housing (Info & Steps)",
      description: "Application steps and information",
      url: "https://studentaffairs.du.edu/housing/apply2"
    },
    {
      name: "Apply for Housing (SEO Optimized Page)",
      description: "SEO-optimized application information",
      url: "https://studentaffairs.du.edu/housing/content/apply-housing-seo-optimized5"
    },
    {
      name: "Room Selection Process",
      description: "Details on the room selection process",
      url: "https://studentaffairs.du.edu/housing/room-selection6"
    },
  ];

  return (
    <div className={styles.formsContainer}>
      <h1 className={styles.formsTitle}>Housing Application Resources</h1>
      <table className={styles.formsTable}>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res, idx) => (
            <tr key={idx}>
              <td>{res.name}</td>
              <td>{res.description}</td>
              <td>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
