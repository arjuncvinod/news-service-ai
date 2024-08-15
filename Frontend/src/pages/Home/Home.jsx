import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getDate } from "../../services/functions";
import LogoutButton from "../../components/Logout/Logout";
import Loader from "../../components/Loader/Loader";
function App() {
  const [articles, setArticles] = useState(null);
  const [query, setQuery] = useState("all");
  const deImage =
    "https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg";
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=${query}&language=en&from=${getDate()}&sortBy=popularity&apiKey=37b720850b0e4450a50a8b543e831d94`;
      // const url = `https://newsdata.io/api/1/news?apikey=pub_506169d1fc95f40f1ea7d9b69472ceeae2f2d&q=india  `;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const sortedArticles = data.articles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setArticles(sortedArticles.slice(0, 21));
        console.log("news readr");
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  if (!articles) {
    return <Loader />;
  }
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.branding}>
            <h1>
              <span className={styles.highlight}>AI-Driven</span> News Service
            </h1>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <p
                  onClick={() => {
                    setQuery("all");
                  }}
                >
                  Global
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    setQuery("India");
                  }}
                >
                  National
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    setQuery("technology");
                  }}
                >
                  Technology
                </p>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={styles.showcase}>
        <div className={styles.container}>
          <h1>Welcome to AI-Driven News Service</h1>
          <p>Your one-stop platform for the latest and most accurate news.</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.newsCardsContainer}>
          {articles &&
            articles
              .filter((article) => article.title != "[Removed]")
              .filter((article) => article.urlToImage)
              .map((article, index) => (
                <div key={index} className={styles.card}>
                  <img
                    src={article.urlToImage || deImage}
                    alt={article.title}
                  />
                  <div className={styles.cardContent}>
                    <h3>{article.title}</h3>
                    <p>{article.description || "No description available."}</p>
                  </div>
                </div>
              ))}
        </section>
      </div>

      <footer className={styles.footer}>
        <p>AI-Driven News Service &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
