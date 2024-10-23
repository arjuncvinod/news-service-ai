import { useState } from 'react';
import axios from 'axios';
import styles from "./index.module.css";
import toast from "react-hot-toast";
function ManageNews() {
  const [date, setDate] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API}/news`, {
        params: {
          date: date,
          category: "all",
        }
      });

      if (response.data.data && response.data.data.length > 0) {
        setNews(response.data.data);
      } else {
        setNews([]);
        console.error(`No news found for date: ${date}`);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (title) => {
    const loadingToast = toast.loading('Deleting news...'); // Show loading toast
  
    try {
      setDeleting(true);
      
      const response = await axios.delete(`${import.meta.env.VITE_API}/news/delete`, {
        params: {
          date: date,
          title: encodeURIComponent(title),
        },
      });
  
      if (response.data.data) {
        // Update the news list after deletion
        setNews(response.data.data);
        toast.success(`Deleted successfully!`, { id: loadingToast }); // Show success toast and remove loading toast
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Error deleting news. Please try again.', { id: loadingToast }); // Show error toast and remove loading toast
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.manageNews}>
      <h1 className={styles.title}>Manage News</h1>
      <div className={styles.controls}>
        <label htmlFor="news-date" className={styles.label}>Select Date: </label>
        <input
          type="date"
          id="news-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.dateInput}
        />
        <button
          onClick={fetchNews}
          disabled={!date}
          className={styles.fetchButton}
        >
          {loading ? 'Loading...' : 'Fetch News'}
        </button>
      </div>
      {news.length > 0 ? (
        <div className={styles.newsList}>
          {news.map((article, index) => (
            <div key={index} className={styles.newsItem}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className={styles.newsImage} />
              )}
              <p><em>{new Date(article.publishedAt).toDateString()}</em></p>
              <h3 className={styles.newsItemTitle}>{article.title}</h3>
              <p className={styles.newsItemDescription}>{article.description}</p>
              {/* Delete Button */}
              <button
                onClick={() => deleteNews(article.title)}
                className={styles.deleteButton}
                disabled={deleting}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noNewsMessage}>No news found for the selected date.</p>
      )}
    </div>
  );
}

export default ManageNews;
