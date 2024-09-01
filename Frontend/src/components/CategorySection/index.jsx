import styles from "./index.module.css"
import { NewsCard2 } from "../NewsCards"
export default function CategorySection() {
  return (
    <div className={styles.categorySection}>
    <div className={styles.heading}>
    <h1>Lifestyle &amp; Sports</h1> <span></span>
    </div>
    <div className={styles.newsContainer}>
        <NewsCard2 />
        <NewsCard2 />
        <NewsCard2 />
        <NewsCard2 />
        <NewsCard2 />
        <NewsCard2 />
    </div>
    </div>
  )
}
