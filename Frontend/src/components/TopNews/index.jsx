import styles from "./index.module.css"
import { Slide } from 'react-slideshow-image';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import {NewsCard1} from "../NewsCards";
function TopNews() {
    const images = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ];
  return (
    <div id={styles.topNews}>
        <div className={styles.topNewsCol1}>
        <Slide arrows={false} infinite={true} autoplay={true} duration={2000} pauseOnHover={true} >
            <div className={styles.eachSlideEffect}>
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <div className={styles.slideContentContainer}>
                        <h3 className={styles.category}><BookmarkBorderRoundedIcon/> Category</h3>
                        <h1>The Rise of Wellness Retreats: Finding Peace in a Busy World</h1>
                        <p> <CalendarMonthIcon className={styles.calendarMonthIcon}/> July 23, 2024</p>
                        <hr className={styles.hrline} />
                        <button>Read more <ArrowForwardRoundedIcon className={styles.arrowForwardRoundedIcon}/></button>
                    </div>
                </div>
            </div>
            <div className={styles.eachSlideEffect}>
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <div className={styles.slideContentContainer}>
                        <h3 className={styles.category}><BookmarkBorderRoundedIcon/> Category</h3>
                        <h1>The Rise of Wellness Retreats: Finding Peace in a Busy World</h1>
                        <p> <CalendarMonthIcon className={styles.calendarMonthIcon}/> July 23, 2024</p>
                        <hr className={styles.hrline} />
                        <button>Read more <ArrowForwardRoundedIcon className={styles.arrowForwardRoundedIcon} /></button>
                    </div>
                </div>
            </div>
            <div className={styles.eachSlideEffect}>
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <div className={styles.slideContentContainer}>
                        <h3 className={styles.category}><BookmarkBorderRoundedIcon/> Category</h3>
                        <h1>The Rise of Wellness Retreats: Finding Peace in a Busy World</h1>
                        <p> <CalendarMonthIcon className={styles.calendarMonthIcon}/> July 23, 2024</p>
                        <hr className={styles.hrline} />
                        <button>Read more <ArrowForwardRoundedIcon className={styles.arrowForwardRoundedIcon}/></button>
                    </div>
                </div>
            </div>
        </Slide>
        </div>
        <div className={styles.topNewsCol2}>
            <NewsCard1 /> 
            <NewsCard1 /> 
            <NewsCard1 /> 
            <NewsCard1 /> 
        </div>


    </div>
  )
}

export default TopNews;