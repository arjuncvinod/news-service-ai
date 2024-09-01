import styles from "./index.module.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
function NewsCard1() {
  return (
    <div className={styles.newsCard1}>
    <img src="https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg" alt="news" />
    <h1>In-Depth Analysis: The Greatest Matches in Football History</h1>
    <h3>July 23, 2024</h3>
    </div>
  )
}

function NewsCard2(){
    return(
        <div className={styles.newsCard2}>
        <img src="https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg" alt="" />
        <p> <CalendarMonthIcon className={styles.calendarMonthIcon}/> July 23, 2024</p>
        <h1>The Rise of Wellness Retreats: Finding Peace in a Busy World</h1>
        <hr />
        <p className={styles.newsDesc}>As our planet faces unprecedented environmental challenges, it’s crucial for individuals to take action in preserving and protecting our natural resources. From reducing waste to</p>
        <button>Read more <ArrowRightAltIcon className={styles.arrowRightAltIcon}/></button>
        </div>
    )
}
export {NewsCard1,NewsCard2}