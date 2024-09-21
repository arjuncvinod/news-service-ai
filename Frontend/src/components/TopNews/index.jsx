import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Slide } from "react-slideshow-image";
import axios from "axios";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { NewsCard1 } from "../NewsCards";
import Loader from "../Loader/Loader";
import { getDate,shuffleArray } from "../../services/functions";

const categories = [
  "lifestyle",
  "india",
  "business",
  "education",
  "politics",
  "kerala",
];

function TopNews() {
  const [newsData1, setNewsData1] = useState([]);
  const [newsData2, setNewsData2] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getDate = () => {
  //   const today = new Date();
  //   return today.toISOString().split('T')[0]; // returns date in yyyy-mm-dd format
  // };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `http://localhost:3000/news?date=${getDate()}&category=all`;
        const { data } = await axios.get(url);
        const newsByCategory = categories.map((category) => {
          const filteredNews = data.data?.filter((newsItem) => newsItem.category === category);
          return filteredNews?.[0]; 
        });
  
        setNewsData1(newsByCategory.filter(Boolean)); 
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/news`, {
          params: {
            date: getDate(),
            category: "all"
          }
        });
        setNewsData2(response.data.data || []); // Ensures newsData2 is an array
      } catch (err) {
        console.log(err);
      }
    };

    fetchNews();
  }, []); 

  return (
    <div id={styles.topNews}>
      {loading ? (
     <Loader />
      ) : (
        <>
          <div className={styles.topNewsCol1}>
            {newsData1.length > 0 ? (
              <Slide
                arrows={false}
                infinite={true}
                autoplay={true}
                duration={3000} // Increased duration for smoother transitions
                pauseOnHover={true}
              >
                {newsData1.map((news, index) => (
                  <div key={index} className={styles.eachSlideEffect}>
                    <div
                      className={styles.slideImage}
                      style={{ backgroundImage: `url(${news?.urlToImage})` }}
                    >
                      <div className={styles.slideContentContainer}>
                        <h3 className={styles.category}>
                          <BookmarkBorderRoundedIcon /> {news?.category}
                        </h3>
                        <h1>{news?.title}</h1>
                        <p>
                          <CalendarMonthIcon
                            className={styles.calendarMonthIcon}
                          />
                          {new Date(news?.publishedAt).toDateString()}
                        </p>
                        <hr className={styles.hrline} />
                        <a href={`/news/${encodeURIComponent(news.title)}`}>
                        <button>
                          Read more
                          <ArrowForwardRoundedIcon
                            className={styles.arrowForwardRoundedIcon}
                          />
                        </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Slide>
            ) : (
              <p>No news available for today.</p>
            )}
          </div>
          <div className={styles.topNewsCol2}>
          {newsData2.length > 0 ? (
             shuffleArray(newsData2).slice(3, 7).map((item, index) => (
                <NewsCard1 
                  key={index}
                  imageUrl={item.urlToImage} 
                  title={item.title} 
                  date={item.publishedAt} 
                />
              ))
            ) : (
              <p>No additional news available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TopNews;
