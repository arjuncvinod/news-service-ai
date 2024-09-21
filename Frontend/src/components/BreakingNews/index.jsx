/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Marquee from "react-fast-marquee";
import 'react-slideshow-image/dist/styles.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";
import { getDate } from '../../services/functions';

function Breakingcard({ title, date }) {
  return (
    <div className={styles.breakingcard}>
      <h1>{title}</h1>
      <p>
        <CalendarMonthIcon className={styles.calendarMonthIcon} />
        {` ${date}`}
      </p>
    </div>
  );
}

function BreakingNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?sortBy=publishedAt&language=en&apiKey=e51c92df1b7f4549a04cf9453900d8f1");
        
        if (response.data.articles.length > 0) {
          setArticles(response.data.articles);
        }
      } catch (error) {
        console.error('Error fetching the news articles:', error);
      }
    };

    fetchArticles();
  }, []);
  // const filteredArticles = articles.filter(article => article.source.name === 'BBC News');
  // console.log(filteredArticles);
  

  return (
    <>
    <div className={styles.breakingContainer}>
      <div className={styles.breakingHead}>
        <h1>
          <i className={styles.breakingIcon}><WifiRoundedIcon /></i> Breaking News
        </h1>
      </div>
      <Marquee className={styles.breakingcardContainer} speed={100}>

        {articles.map((article, index) => (
            <Breakingcard
              key={index}
              title={article.title.split('-')[0].trim()}
              date={getDate()}
            />
          ))}
      </Marquee>
    </div>
    <hr className={styles.hrline}/>
    </>
  );
}

export default BreakingNews;
