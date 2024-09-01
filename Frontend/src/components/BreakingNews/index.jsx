import styles from "./styles.module.css";
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Marquee from "react-fast-marquee";
import 'react-slideshow-image/dist/styles.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function Breakingcard(){
return(
    <div className={styles.breakingcard}>
        <h1>International peace talk reach historic Agreement</h1>
        <p> <CalendarMonthIcon className={styles.calendarMonthIcon}/> July 23, 2024</p>
    </div>
)
}

function BreakingNews() {
  return (
    <>
    <div className={styles.breakingContainer}>
      <div className={styles.breakingHead}>
        <h1>
          <i className={styles.breakingIcon}><WifiRoundedIcon /></i> Breaking News
        </h1>
      </div>
      <Marquee className={styles.breakingcardContainer}>
        <Breakingcard />
        <Breakingcard />
        <Breakingcard />
      </Marquee>
    </div>
    <hr className={styles.hrline}/>
    </>
  );
}

export default BreakingNews;
