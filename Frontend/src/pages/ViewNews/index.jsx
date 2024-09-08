import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css'; // Ensure this CSS module is correctly imported
import { getDate } from '../../services/functions'; // Ensure this function is correctly defined
import Loader from '../../components/Loader/Loader';

function NewsViewPage() {
  const { newsTitle, date } = useParams(); // Destructure both title and date from params
  const navigate = useNavigate(); // Hook for navigation
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarNews, setSidebarNews] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/news/by-title`, {
          params: {
            title: newsTitle,
            date: date || getDate() // Use the passed date or fallback to the current date
          }
        });
        setNews(response.data.data); // Adjust based on your API response structure
        if (response.data.data) {
          setCategory(response.data.data.category); // Set the category from the fetched news
        }
      } catch (err) {
        console.error("Error fetching news:", err);
    //   } finally {
    //     setLoading(false);
      }
    };

    const fetchSidebarNews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/news`, {
          params: {
            date: date || getDate(),
            category: category || 'all' // Fetch news based on the category
          }
        });
        setSidebarNews(response.data.data.slice(0, 10) || []);
        setLoading(false)
      } catch (err) {
        console.error("Error fetching sidebar news:", err);
      }
    };

    fetchNews();
    if (category) {
      fetchSidebarNews();
    }
  }, [newsTitle, date, category]);

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };
if(loading){
    return <Loader />
}
  return (
    <div className={styles.newsViewPage}>
      <button onClick={handleBackClick} className={styles.backButton}>
        &larr;
      </button>
      <div className={styles.mainContent}>
          <div className={styles.newsContent}>
            <img src={news.urlToImage} alt={news.title} className={styles.newsImage} />
            <h1>{news.title}</h1>
            <p><em>{new Date(news.publishedAt).toDateString()}</em></p>
            <p>{news.content}</p>
          </div>
      </div>
      <div className={styles.sidebar}>
        <h2>Related News</h2>
        <ul>
          {sidebarNews.map((item, index) => (
            <li key={index} className={styles.sidebarItem}>
              <a href={`/news/${encodeURIComponent(item.title)}?date=${getDate()}`} className={styles.sidebarLink}>
                {item.urlToImage && <img src={item.urlToImage} alt={item.title} className={styles.sidebarImage} />}
                <span className={styles.sidebarTitle}>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsViewPage;
