/* eslint-disable react/prop-types */
import styles from "./index.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function NewsCard1({ imageUrl, title, date }) {
  return (
    <a href={`/news/${encodeURIComponent(title)} `} className={styles.newsCard1}>
      <img src={imageUrl} alt="news" />
      <h1>{title}</h1>
      <h3>{date}</h3>
    </a>
  );
}

function NewsCard2({ imageUrl, title, date, description }) {
  return (
      <a href={`/news/${encodeURIComponent(title)}`} className={styles.newsCard2}>
          <img src={imageUrl} alt={title} />
          <p><CalendarMonthIcon className={styles.calendarMonthIcon} /> {date}</p>
          <h1>{title}</h1>
          <hr />
          <p className={styles.newsDesc}>{description}</p>
          <button>
              Read more <ArrowRightAltIcon className={styles.arrowRightAltIcon} />
          </button>
      </a>
  );
}

function NewsCard3 ({imageUrl, title}){
  return(
    <a href={`/news/${encodeURIComponent(title)}`} className={styles.newsCard3}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.titleContainer}>
        <p>{title}</p>
      </div>
    </a>
  )
}
export {NewsCard1,NewsCard2,NewsCard3}